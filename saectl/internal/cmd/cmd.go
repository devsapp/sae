package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/client-go/rest"
	cliflag "k8s.io/component-base/cli/flag"
	"k8s.io/kubectl/pkg/util/i18n"
	"k8s.io/kubectl/pkg/util/templates"
	"k8s.io/kubectl/pkg/util/term"

	"saectl/internal/cmd/annotate"
	"saectl/internal/cmd/apiresources"
	"saectl/internal/cmd/apply"
	"saectl/internal/cmd/create"
	"saectl/internal/cmd/delete"
	"saectl/internal/cmd/describe"
	"saectl/internal/cmd/diff"
	"saectl/internal/cmd/edit"
	"saectl/internal/cmd/exec"
	"saectl/internal/cmd/get"
	"saectl/internal/cmd/label"
	"saectl/internal/cmd/logs"
	"saectl/internal/cmd/replace"
	"saectl/internal/cmd/scale"
	"saectl/internal/cmd/set"
	"saectl/internal/cmd/util"
	"saectl/pkg/options"
)

type CtlOption struct {
	Arguments []string
	genericclioptions.IOStreams
}

func NewDefaultCommand() *cobra.Command {
	return NewDefaultCommandWithArgs(CtlOption{
		Arguments: os.Args,
		IOStreams: genericclioptions.IOStreams{
			In:     os.Stdin,
			Out:    os.Stdout,
			ErrOut: os.Stderr,
		},
	})
}

func NewDefaultCommandWithArgs(o CtlOption) *cobra.Command {
	cmd := NewCommand(o)
	return cmd
}

func NewCommand(o CtlOption) *cobra.Command {
	warningHandler := rest.NewWarningWriter(o.IOStreams.ErrOut, rest.WarningWriterOptions{Deduplicate: true, Color: term.AllowsColorOutput(o.IOStreams.ErrOut)})
	warningsAsErrors := false
	// Parent command to which all subcommands are added.
	cmds := &cobra.Command{
		Use:   "saectl",
		Short: i18n.T("saectl controls the Serverless Application Engine manager"),
		Long: templates.LongDesc(`
      saectl controls the Serverless Application Engine manager.

      Find more information at:
            https://help.aliyun.com/product/118957.html`),
		Run: runHelp,

		PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
			rest.SetDefaultWarningHandler(warningHandler)
			// TODO: Register Automatic Completion Plugin
			return nil
		},
		PersistentPostRunE: func(*cobra.Command, []string) error {
			if warningsAsErrors {
				count := warningHandler.WarningCount()
				switch count {
				case 0:
					// no warnings
				case 1:
					return fmt.Errorf("%d warning received", count)
				default:
					return fmt.Errorf("%d warnings received", count)
				}
			}

			return nil
		},
	}
	// From this point and forward we get warnings on flags that contain "_" separators
	// when adding them with hyphen instead of the original name.
	cmds.SetGlobalNormalizationFunc(cliflag.WarnWordSepNormalizeFunc)

	flags := cmds.PersistentFlags()
	flags.BoolVar(&warningsAsErrors, "warnings-as-errors", warningsAsErrors, "Treat warnings received from the server as errors and exit with a non-zero exit code")

	saeConfigFlags := options.NewConfig().WithDiscoveryQPS(100).WithDiscoveryQPS(50)
	saeConfigFlags.AddFlags(flags)
	// TODO: add cmd header hooks to distinguish the request from sdk or ctl
	aliCloudFactory := util.NewAliCloudFactory(saeConfigFlags)
	f := aliCloudFactory.NewCmdFactory()

	// TODO: add completion for get cmd
	groups := templates.CommandGroups{
		{
			Message: "Basic Commands (Beginner):",
			Commands: []*cobra.Command{
				create.NewCmdCreate(f, o.IOStreams),
				set.NewCmdSet(f, o.IOStreams),
			},
		},
		{
			Message: "Basic Commands (Intermediate):",
			Commands: []*cobra.Command{
				get.NewCmdGet("saectl", f, o.IOStreams),
				edit.NewCmdEdit(f, o.IOStreams),
				delete.NewCmdDelete(f, o.IOStreams),
			},
		},
		{
			Message: "Deploy Commands:",
			Commands: []*cobra.Command{
				scale.NewCmdScale(f, o.IOStreams),
			},
		},
		{
			Message: "Troubleshooting and Debugging Commands:",
			Commands: []*cobra.Command{
				describe.NewCmdDescribe("saectl", f, o.IOStreams),
				exec.NewCmdExec(aliCloudFactory, o.IOStreams),
				logs.NewCmdLogs(f, o.IOStreams),
			},
		},
		{
			Message: "Advanced Commands:",
			Commands: []*cobra.Command{
				diff.NewCmdDiff(f, o.IOStreams),
				apply.NewCmdApply("saectl", f, o.IOStreams),
				//patch.NewCmdPatch(f, o.IOStreams),
				replace.NewCmdReplace(f, o.IOStreams),
			},
		},
		{
			Message: "Settings Commands:",
			Commands: []*cobra.Command{
				label.NewCmdLabel(f, o.IOStreams),
				annotate.NewCmdAnnotate("saectl", f, o.IOStreams),
			},
		},
	}
	groups.Add(cmds)

	filters := []string{"options"}

	templates.ActsAsRootCommand(cmds, filters, groups...)

	cmds.AddCommand(apiresources.NewCmdAPIResources(f, o.IOStreams))
	cmds.SetGlobalNormalizationFunc(cliflag.WordSepNormalizeFunc)
	return cmds
}

func runHelp(cmd *cobra.Command, args []string) {
	cmd.Help()
}
