package main

import (
	"k8s.io/component-base/cli"
	kubectlutil "k8s.io/kubectl/pkg/cmd/util"
	"saectl/internal/cmd"
)

func main() {
	command := cmd.NewDefaultCommand()
	if err := cli.RunNoErrOutput(command); err != nil {
		// Pretty-print the error and exit with an error.
		kubectlutil.CheckErr(err)
	}
}
