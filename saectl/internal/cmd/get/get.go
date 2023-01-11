package get

import (
	"fmt"
	"github.com/spf13/cobra"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	kubectlget "k8s.io/kubectl/pkg/cmd/get"
	cmdutil "k8s.io/kubectl/pkg/cmd/util"
	"k8s.io/kubectl/pkg/util/i18n"
	"k8s.io/kubectl/pkg/util/templates"
	"strings"
)

const (
	useOpenAPIPrintColumnFlagLabel = "use-openapi-print-columns"
	useServerPrintColumns          = "server-print"
)

var supportedSubresources = []string{"status", "scale"}

var (
	getLong = templates.LongDesc(`
		Display one or many resources.

		Prints a table of the most important information about the specified resources.
		You can filter the list using a label selector and the --selector flag. If the
		desired resource type is namespaced you will only see results in your current
		namespace unless you pass --all-namespaces.

		By specifying the output as 'template' and providing a Go template as the value
		of the --template flag, you can filter the attributes of the fetched resources.`)

	getExample = templates.Examples(`
		# List all pods in ps output format
		saectl get pods

		# List all pods in ps output format with more information (such as node name)
		saectl get pods -o wide

		# List deployments in JSON output format, in the "v1" version of the "apps" API group
		saectl get deployments.v1.apps -o json

		# List a pod identified by type and name specified in "pod.yaml" in JSON output format
		saectl get -f pod.yaml -o json

		# List resources from a directory with kustomization.yaml - e.g. dir/kustomization.yaml
		saectl get -k dir/

		# Return only the phase value of the specified pod
		saectl get -o template pod/web-pod-13je7 --template={{.status.phase}}

		# List resource information in custom columns
		saectl get pod test-pod -o custom-columns=CONTAINER:.spec.containers[0].name,IMAGE:.spec.containers[0].image`)
)

func NewCmdGet(parent string, f cmdutil.Factory, streams genericclioptions.IOStreams) *cobra.Command {
	o := kubectlget.NewGetOptions(parent, streams)

	cmd := &cobra.Command{
		Use:                   fmt.Sprintf("get [(-o|--output=)%s] (TYPE[.VERSION][.GROUP] [NAME | -l label] | TYPE[.VERSION][.GROUP]/NAME ...) [flags]", strings.Join(o.PrintFlags.AllowedFormats(), "|")),
		DisableFlagsInUseLine: true,
		Short:                 i18n.T("Display one or many resources"),
		Long:                  getLong + "\n\n" + cmdutil.SuggestAPIResources(parent),
		Example:               getExample,
		// ValidArgsFunction is set when this function is called so that we have access to the util package
		Run: func(cmd *cobra.Command, args []string) {
			cmdutil.CheckErr(o.Complete(f, cmd, args))
			cmdutil.CheckErr(o.Validate())
			cmdutil.CheckErr(o.Run(f, cmd, args))
		},
		SuggestFor: []string{"list", "ps"},
	}

	o.PrintFlags.AddFlags(cmd)

	//cmd.Flags().StringVar(&o.Raw, "raw", o.Raw, "Raw URI to request from the server.  Uses the transport specified by the kubeconfig file.")
	//cmd.Flags().BoolVarP(&o.Watch, "watch", "w", o.Watch, "After listing/getting the requested object, watch for changes.")
	//cmd.Flags().BoolVar(&o.WatchOnly, "watch-only", o.WatchOnly, "Watch for changes to the requested object(s), without listing/getting first.")
	//cmd.Flags().BoolVar(&o.OutputWatchEvents, "output-watch-events", o.OutputWatchEvents, "Output watch event objects when --watch or --watch-only is used. Existing objects are output as initial ADDED events.")
	cmd.Flags().BoolVar(&o.IgnoreNotFound, "ignore-not-found", o.IgnoreNotFound, "If the requested object does not exist the command will return exit code 0.")
	cmd.Flags().StringVar(&o.FieldSelector, "field-selector", o.FieldSelector, "Selector (field query) to filter on, supports '=', '==', and '!='.(e.g. --field-selector key1=value1,key2=value2). The server only supports a limited number of field queries per type.")
	cmd.Flags().BoolVarP(&o.AllNamespaces, "all-namespaces", "A", o.AllNamespaces, "If present, list the requested object(s) across all namespaces. Namespace in current context is ignored even if specified with --namespace.")
	addOpenAPIPrintColumnFlags(cmd, o)
	addServerPrintColumnFlags(cmd, o)
	cmdutil.AddFilenameOptionFlags(cmd, &o.FilenameOptions, "identifying the resource to get from a server.")
	cmdutil.AddChunkSizeFlag(cmd, &o.ChunkSize)
	cmdutil.AddLabelSelectorFlagVar(cmd, &o.LabelSelector)
	cmdutil.AddSubresourceFlags(cmd, &o.Subresource, "If specified, gets the subresource of the requested object.", supportedSubresources...)
	return cmd
}

func addOpenAPIPrintColumnFlags(cmd *cobra.Command, opt *kubectlget.GetOptions) {
	cmd.Flags().BoolVar(&opt.PrintWithOpenAPICols, useOpenAPIPrintColumnFlagLabel, opt.PrintWithOpenAPICols, "If true, use x-kubernetes-print-column metadata (if present) from the OpenAPI schema for displaying a resource.")
	cmd.Flags().MarkDeprecated(useOpenAPIPrintColumnFlagLabel, "deprecated in favor of server-side printing")
}

func addServerPrintColumnFlags(cmd *cobra.Command, opt *kubectlget.GetOptions) {
	cmd.Flags().BoolVar(&opt.ServerPrint, useServerPrintColumns, opt.ServerPrint, "If true, have the server return the appropriate table output. Supports extension APIs and CRDs.")
}
