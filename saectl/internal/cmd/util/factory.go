package util

import (
	cmdutil "k8s.io/kubectl/pkg/cmd/util"
	"saectl/pkg/options"
)

type AliCloudFactory interface {
	NewCmdFactory() cmdutil.Factory
	GetAccountKey() options.AccountKey
}

type Factory struct {
	config *options.Config
}

func NewAliCloudFactory(config *options.Config) AliCloudFactory {
	return &Factory{
		config,
	}
}

func (f *Factory) NewCmdFactory() cmdutil.Factory {
	return cmdutil.NewFactory(f.config)
}

func (f *Factory) GetAccountKey() options.AccountKey {
	return f.config.GetAccountKey()
}
