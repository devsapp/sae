package exec

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/url"

	"github.com/aliyun/alibaba-cloud-sdk-go/sdk"
	"github.com/aliyun/alibaba-cloud-sdk-go/sdk/requests"
	dockerterm "github.com/moby/term"
	"github.com/spf13/cobra"
	"golang.org/x/net/websocket"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	coreclient "k8s.io/client-go/kubernetes/typed/core/v1"
	cmdutil "k8s.io/kubectl/pkg/cmd/util"
	"k8s.io/kubectl/pkg/util/i18n"
	"k8s.io/kubectl/pkg/util/interrupt"
	"k8s.io/kubectl/pkg/util/templates"
	"k8s.io/kubectl/pkg/util/term"

	"saectl/internal/cmd/exec/stream"
	"saectl/internal/cmd/util"
	"saectl/pkg/options"
	"saectl/pkg/proxy"
)

var (
	execExample = templates.Examples(i18n.T(`
		# Switch to raw terminal mode; sends stdin to 'bash' in pod1 and sends stdout from 'bash' back to the client
		saectl exec -it mypod -n myns -- /bin/bash
`))
)

func NewCmdExec(f util.AliCloudFactory, ioStreams genericclioptions.IOStreams) *cobra.Command {
	execOption := new(Options)
	cmd := &cobra.Command{
		Use:     "exec -it POD -n NAMESPACE -- CMD",
		Example: execExample,
		Short:   i18n.T("Execute a command in a container"),
		Long:    i18n.T("Execute a command in a container."),
		Run: func(cmd *cobra.Command, args []string) {
			cmdutil.CheckErr(execOption.Complete(f, args, ioStreams))
			cmdutil.CheckErr(execOption.Validate())
			cmdutil.CheckErr(execOption.Run())
		},
	}
	cmd.Flags().BoolVarP(&execOption.Stdin, "stdin", "i", execOption.Stdin, "Pass stdin to the container")
	cmd.Flags().BoolVarP(&execOption.TTY, "tty", "t", execOption.TTY, "Stdin is a TTY")
	return cmd
}

type Options struct {
	tty term.TTY

	options.AccountKey
	StreamOptions

	sdkClient *sdk.Client
	executor  *stream.Executor

	podName   string
	namespace string
	podClient coreclient.PodsGetter

	cmd []string
}

func (o *Options) Complete(f util.AliCloudFactory, argsIn []string, ioStreams genericclioptions.IOStreams) error {
	if len(argsIn) == 0 {
		return errors.New("podName shouldn't be empty")
	}
	o.podName = argsIn[0]
	o.AccountKey = f.GetAccountKey()
	var err error
	if len(o.StsToken) != 0 {
		o.sdkClient, err = sdk.NewClientWithStsToken(o.Region, o.AccessKey, o.AccessSecret, o.StsToken)
	} else {
		o.sdkClient, err = sdk.NewClientWithAccessKey(o.Region, o.AccessKey, o.AccessSecret)
	}
	if err != nil {
		return err
	}
	cmdFactory := f.NewCmdFactory()
	clientSet, err := cmdFactory.KubernetesClientSet()
	if err != nil {
		return err
	}
	o.podClient = clientSet.CoreV1()
	o.namespace, _, _ = cmdFactory.ToRawKubeConfigLoader().Namespace()
	o.StreamOptions = StreamOptions{
		IOStreams: ioStreams,
		Stdin:     o.Stdin,
		TTY:       o.TTY,
	}
	o.tty = o.StreamOptions.SetupTTY()
	return nil
}

func (o *Options) Validate() error {
	if len(o.podName) == 0 && len(o.namespace) == 0 {
		return fmt.Errorf("pod, namespace must be specified")
	}
	if !o.TTY || !o.Stdin {
		return fmt.Errorf("sorry, currently the exec command only supports start a new tty, please add \"-it\" for your command")
	}
	return nil
}

func (o *Options) Run() error {
	pod, err := o.podClient.Pods(o.namespace).Get(context.TODO(), o.podName, metav1.GetOptions{})
	if err != nil {
		return err
	}
	if len(pod.OwnerReferences) == 0 {
		return fmt.Errorf("pod's owner shouldn't be empty")
	}
	appId := string(pod.OwnerReferences[0].UID)
	tokenId, err := o.GetWebShellToken(appId, o.podName)
	if err != nil {
		return err
	}
	fn := func() error {
		e, err := o.NewExecutor(tokenId)
		if err != nil {
			return err
		}
		return e.Stream()
	}
	return o.tty.Safe(fn)
}

func (o *Options) NewExecutor(tokenId string) (*stream.Executor, error) {
	wsUrl := &url.URL{
		Scheme: "wss",
		Host:   "sae-webshell.console.aliyun.com",
		Path:   "websocket/eamWebshell",
		RawQuery: url.Values{
			"tokenId": []string{tokenId},
			"region":  []string{o.Region},
		}.Encode(),
	}
	c, err := websocket.Dial(wsUrl.String(), "", "https://sae.console.aliyun.com")
	if err != nil {
		return nil, err
	}
	return stream.NewExecutor(c, stream.Option{
		Stdin:  o.In,
		Stdout: o.Out,
		StdErr: nil,
		TTY:    o.tty.Raw,
	}), nil
}

func (o *Options) GetWebShellToken(appId string, podName string) (string, error) {
	popReq := requests.NewCommonRequest()
	popReq.Scheme = proxy.OpenAPIScheme
	popReq.Version = proxy.SAEYamlPopAPIVersion
	popReq.Product = proxy.SAEProductName
	popReq.ServiceCode = proxy.SAEPopServiceCode
	popReq.EndpointType = "openAPI"
	popReq.PathPattern = "/pop/v1/sam/instance/webshellToken"
	termSize := o.tty.GetSize()
	popReq.QueryParams = map[string]string{
		"RegionId": o.Region,
		"AppId":    appId,
		"PodName":  podName,
		"Lines":    fmt.Sprintf("%d", termSize.Height),
		"Columns":  fmt.Sprintf("%d", termSize.Width),
	}
	res, err := o.sdkClient.ProcessCommonRequest(popReq)
	if err != nil {
		return "", err
	}
	tokenResp := new(WebShellTokenResponse)
	if err = json.Unmarshal(res.GetHttpContentBytes(), tokenResp); err != nil {
		return "", err
	}
	if !tokenResp.Success {
		return "", fmt.Errorf("fail to get webshell token: %s, requestId: %s", tokenResp.Message, tokenResp.RequestId)
	}
	return tokenResp.Data.Token, nil
}

type StreamOptions struct {
	Stdin bool
	TTY   bool
	// minimize unnecessary output
	Quiet bool
	// InterruptParent, if set, is used to handle interrupts while attached
	InterruptParent *interrupt.Handler

	genericclioptions.IOStreams

	// for testing
	overrideStreams func() (io.ReadCloser, io.Writer, io.Writer)
	isTerminalIn    func(t term.TTY) bool
}

func (o *StreamOptions) SetupTTY() term.TTY {
	t := term.TTY{
		Parent: o.InterruptParent,
		Out:    o.Out,
	}

	if !o.Stdin {
		// need to nil out o.In to make sure we don't create a stream for stdin
		o.In = nil
		o.TTY = false
		return t
	}

	t.In = o.In
	if !o.TTY {
		return t
	}

	if o.isTerminalIn == nil {
		o.isTerminalIn = func(tty term.TTY) bool {
			return tty.IsTerminalIn()
		}
	}
	if !o.isTerminalIn(t) {
		o.TTY = false

		if !o.Quiet && o.ErrOut != nil {
			fmt.Fprintln(o.ErrOut, "Unable to use a TTY - input is not a terminal or the right kind of file")
		}

		return t
	}

	// if we get to here, the user wants to attach stdin, wants a TTY, and o.In is a terminal, so we
	// can safely set t.Raw to true
	t.Raw = true

	if o.overrideStreams == nil {
		// use dockerterm.StdStreams() to get the right I/O handles on Windows
		o.overrideStreams = dockerterm.StdStreams
	}
	stdin, stdout, _ := o.overrideStreams()
	o.In = stdin
	t.In = stdin
	if o.Out != nil {
		o.Out = stdout
		t.Out = stdout
	}
	return t
}

type WebShellTokenResponse struct {
	RequestId string        `json:"RequestId"`
	Message   string        `json:"Message"`
	TraceId   string        `json:"TraceId"`
	Data      WebShellToken `json:"Data"`
	Code      int           `json:"Code"`
	Success   bool          `json:"Success"`
}

type WebShellToken struct {
	Token string `json:"Token"`
}
