package config

import (
	"errors"
	"fmt"
	"github.com/aliyun/alibaba-cloud-sdk-go/sdk"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"saectl/pkg/proxy"
	"sync"
)

var (
	RegionNotFoundError           = errors.New("region not found")
	AccessKeyOrSecretIsEmptyError = errors.New("access key or access secret is empty")
)

type ApplyToClientConfigOption interface {
	ApplyTo(config *ClientConfig) error
}

const (
	DefaultSAEClusterName = "sae"
	DefaultContextName    = "sae-user"
)

type ClientConfigOption struct {
	Region           string
	CurrentContext   string
	ClusterName      string
	DefaultNamespace string
	AccessKeyId      string
	AccessKeySecret  string
	StsToken         string
	ClusterServer    string
}

var _ clientcmd.ClientConfig = &ClientConfigBuilder{}

type ClientConfigBuilder struct {
	ClientConfigOption

	config *ClientConfig

	lock sync.Mutex
}

func NewClientConfigBuilder() *ClientConfigBuilder {
	return &ClientConfigBuilder{
		ClientConfigOption: ClientConfigOption{},
		lock:               sync.Mutex{},
	}
}

func (c *ClientConfigBuilder) getConfig() error {
	c.lock.Lock()
	defer c.lock.Unlock()
	if c.config != nil {
		return nil
	}
	config, err := c.Build()
	if err != nil {
		return err
	}
	c.config = config
	return nil
}

func (c *ClientConfigBuilder) RawConfig() (clientcmdapi.Config, error) {
	if err := c.getConfig(); err != nil {
		return clientcmdapi.Config{}, err
	}
	return c.config.RawConfig()
}

func (c *ClientConfigBuilder) ClientConfig() (*rest.Config, error) {
	if err := c.getConfig(); err != nil {
		return nil, err
	}
	return c.config.ClientConfig()
}

func (c *ClientConfigBuilder) Namespace() (string, bool, error) {
	if err := c.getConfig(); err != nil {
		return "", false, err
	}
	return c.config.Namespace()
}

func (c *ClientConfigBuilder) ConfigAccess() clientcmd.ConfigAccess {
	return nil
}

func (c *ClientConfigBuilder) WithRegion(region string) *ClientConfigBuilder {
	c.Region = region
	return c
}

func (c *ClientConfigBuilder) WithNamespace(ns string) *ClientConfigBuilder {
	c.DefaultNamespace = ns
	return c
}

func (c *ClientConfigBuilder) WithAccessKeyId(key string) *ClientConfigBuilder {
	c.AccessKeyId = key
	return c
}

func (c *ClientConfigBuilder) WithAccessKeySecret(secret string) *ClientConfigBuilder {
	c.AccessKeySecret = secret
	return c
}

func (c *ClientConfigBuilder) WithStsToken(sts string) *ClientConfigBuilder {
	c.StsToken = sts
	return c
}

func (c *ClientConfigBuilder) WithClusterServer(endpoint string) *ClientConfigBuilder {
	c.ClusterServer = endpoint
	return c
}

func (c *ClientConfigBuilder) Build() (*ClientConfig, error) {
	if len(c.AccessKeyId) == 0 || len(c.AccessKeySecret) == 0 {
		return nil, AccessKeyOrSecretIsEmptyError
	}
	if len(c.Region) == 0 {
		return nil, RegionNotFoundError
	}
	if len(c.ClusterServer) == 0 {
		c.ClusterServer = genSAEClusterServerAddress(c.Region)
	}
	if len(c.CurrentContext) == 0 {
		c.CurrentContext = DefaultContextName
	}
	if len(c.ClusterName) == 0 {
		c.ClusterName = DefaultSAEClusterName
	}
	c.config = &ClientConfig{
		ClientConfigOption: ClientConfigOption{
			Region:           c.Region,
			CurrentContext:   c.CurrentContext,
			ClusterName:      c.ClusterName,
			ClusterServer:    c.ClusterServer,
			AccessKeySecret:  c.AccessKeySecret,
			AccessKeyId:      c.AccessKeyId,
			StsToken:         c.StsToken,
			DefaultNamespace: c.DefaultNamespace,
		},
	}
	return c.config, nil
}

type ClientConfig struct {
	ClientConfigOption
}

func (c *ClientConfig) RawConfig() (clientcmdapi.Config, error) {
	return clientcmdapi.Config{
		Kind:       "Config",
		APIVersion: "v1",
		Clusters: map[string]*clientcmdapi.Cluster{
			c.ClusterName: {
				Server:                c.ClusterServer,
				InsecureSkipTLSVerify: false,
			},
		},
		Contexts: map[string]*clientcmdapi.Context{
			c.CurrentContext: {
				Cluster:   c.ClusterName,
				AuthInfo:  c.CurrentContext,
				Namespace: c.Region,
			},
		},
	}, nil
}

func (c *ClientConfig) ClientConfig() (*rest.Config, error) {
	var (
		cli *sdk.Client
		err error
	)
	if len(c.StsToken) != 0 {
		cli, err = sdk.NewClientWithStsToken(c.Region, c.AccessKeyId, c.AccessKeySecret, c.StsToken)
	} else {
		cli, err = sdk.NewClientWithAccessKey(c.Region, c.AccessKeyId, c.AccessKeySecret)
	}
	if err != nil {
		return nil, err
	}
	rawConfig, err := c.RawConfig()
	if err != nil {
		return nil, err
	}
	return &rest.Config{
		Host:          rawConfig.Clusters[c.ClusterName].Server,
		WrapTransport: proxy.NewTransportWrapper(cli),
	}, nil

}

func (c *ClientConfig) Namespace() (string, bool, error) {
	if c.DefaultNamespace == "" {
		return "default", false, nil
	}
	return c.DefaultNamespace, false, nil
}

func (c *ClientConfig) ConfigAccess() clientcmd.ConfigAccess {
	return nil
}

var _ clientcmd.ClientConfig = &ClientConfig{}

func genSAEClusterServerAddress(region string) string {
	return fmt.Sprintf("sae.%s.aliyuncs.com", region)
}
