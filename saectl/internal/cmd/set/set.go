package set

import (
	"github.com/spf13/cobra"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/kubectl/pkg/cmd/set"
	cmdutil "k8s.io/kubectl/pkg/cmd/util"
	"k8s.io/kubectl/pkg/util/i18n"
	"k8s.io/kubectl/pkg/util/templates"
)

var (
	setLong = templates.LongDesc(i18n.T(`
		Configure application resources.

		These commands help you make changes to existing application resources.`))
)

// NewCmdSet returns an initialized Command instance for 'set' sub command
func NewCmdSet(f cmdutil.Factory, streams genericclioptions.IOStreams) *cobra.Command {
	cmd := &cobra.Command{
		Use:                   "set SUBCOMMAND",
		DisableFlagsInUseLine: true,
		Short:                 i18n.T("Set specific features on objects"),
		Long:                  setLong,
		Run:                   cmdutil.DefaultSubCommandRun(streams.ErrOut),
	}

	// add subcommands
	cmd.AddCommand(set.NewCmdImage(f, streams))
	cmd.AddCommand(set.NewCmdResources(f, streams))
	cmd.AddCommand(set.NewCmdEnv(f, streams))

	return cmd
}
