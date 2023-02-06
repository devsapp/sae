package options

import (
	"github.com/spf13/pflag"
	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/client-go/discovery"
	diskcached "k8s.io/client-go/discovery/cached/disk"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/restmapper"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
	utilpointer "k8s.io/utils/pointer"
	"os"
	"path/filepath"
	"regexp"
	"saectl/pkg/config"
	"strings"
	"sync"
	"time"
)

const (
	flagNamespace = "namespace"
	flagAPIServer = "server"

	AliCloudAccessKey = "ALICLOUD_ACCESS_KEY"
	AliCloudSecretKey = "ALICLOUD_SECRET_KEY"
	AliCloudStsToken  = "ALICLOUD_STS_TOKEN"
	AliCloudRegion    = "ALICLOUD_REGION"
)

type AccountKey struct {
	AccessKey    string
	AccessSecret string
	StsToken     string
	Region       string
}

type Config struct {
	CacheDir *string
	// config flags
	ClusterName     *string
	AuthInfoName    *string
	Context         *string
	Namespace       *string
	APIServer       *string
	AccessKey       *string
	AccessSecretKey *string
	StsToken        *string
	Region          *string

	// If non-nil, wrap config function can transform the Config
	// before it is returned in ToRESTConfig function.
	WrapConfigFn func(*rest.Config) *rest.Config

	rwLock sync.RWMutex

	// Allows increasing burst used for discovery, this is useful
	// in clusters with many registered resources
	discoveryBurst int
	// Allows increasing qps used for discovery, this is useful
	// in clusters with many registered resources
	discoveryQPS float32
}

var _ genericclioptions.RESTClientGetter = &Config{}

func NewConfig() *Config {
	return &Config{
		CacheDir:        utilpointer.String(getDefaultCacheDir()),
		ClusterName:     utilpointer.String(""),
		AuthInfoName:    utilpointer.String(""),
		Context:         utilpointer.String(""),
		Namespace:       utilpointer.String(""),
		APIServer:       utilpointer.String(""),
		AccessKey:       utilpointer.String(""),
		AccessSecretKey: utilpointer.String(""),
		StsToken:        utilpointer.String(""),
		Region:          utilpointer.String(""),
		discoveryBurst:  300,
		rwLock:          sync.RWMutex{},
	}
}

func (f *Config) AddFlags(flags *pflag.FlagSet) {
	if f.AccessKey != nil {
		flags.StringVar(f.AccessKey, "access-key-id", *f.AccessKey, "Alibaba Cloud Access Key Id ")
	}
	if f.AccessSecretKey != nil {
		flags.StringVar(f.AccessSecretKey, "access-key-secret", *f.AccessSecretKey, "Alibaba Cloud Access Key Secret")
	}
	if f.StsToken != nil {
		flags.StringVar(f.StsToken, "sts-token", *f.StsToken, "Alibaba Cloud STS Token")
	}
	if f.Region != nil {
		flags.StringVar(f.Region, "region", *f.Region, "region")
	}
	if f.APIServer != nil {
		flags.StringVarP(f.APIServer, flagAPIServer, "s", *f.APIServer, "The address and port of the Kubernetes API server")
	}
	if f.Namespace != nil {
		flags.StringVarP(f.Namespace, flagNamespace, "n", *f.Namespace, "If present, the namespace scope for this CLI request")
	}
}

func (f *Config) WithDiscoveryBurst(burst int) *Config {
	f.discoveryBurst = burst
	return f
}

func (f *Config) WithDiscoveryQPS(qps float32) *Config {
	f.discoveryQPS = qps
	return f
}

func (f *Config) ToRESTConfig() (*rest.Config, error) {
	clientConfig, err := f.toRawKubeConfigLoader().Build()
	if err != nil {
		return nil, err
	}
	c, err := clientConfig.ClientConfig()
	if err != nil {
		return nil, err
	}
	if f.WrapConfigFn != nil {
		return f.WrapConfigFn(c), nil
	}
	return c, nil
}

func (f *Config) ToDiscoveryClient() (discovery.CachedDiscoveryInterface, error) {
	config, err := f.ToRESTConfig()
	if err != nil {
		return nil, err
	}
	config.Burst = f.discoveryBurst
	config.QPS = f.discoveryQPS

	cacheDir := getDefaultCacheDir()

	if f.CacheDir != nil && *f.CacheDir != "" && *f.CacheDir != getDefaultCacheDir() {
		cacheDir = *f.CacheDir
	}

	httpCacheDir := filepath.Join(cacheDir, "http")
	discoveryCacheDir := computeDiscoverCacheDir(filepath.Join(cacheDir, "discovery"), config.Host)
	return diskcached.NewCachedDiscoveryClientForConfig(config, discoveryCacheDir, httpCacheDir, time.Duration(6*time.Hour))
}

func (f *Config) ToRESTMapper() (meta.RESTMapper, error) {
	discoveryClient, err := f.ToDiscoveryClient()
	if err != nil {
		return nil, err
	}

	mapper := restmapper.NewDeferredDiscoveryRESTMapper(discoveryClient)
	expander := restmapper.NewShortcutExpander(mapper, discoveryClient)
	return expander, nil
}

func (f *Config) ToRawKubeConfigLoader() clientcmd.ClientConfig {
	return f.toRawKubeConfigLoader()
}

func (f *Config) toRawKubeConfigLoader() *config.ClientConfigBuilder {
	accountKey := f.GetAccountKey()
	return config.NewClientConfigBuilder().
		WithRegion(accountKey.Region).
		WithAccessKeyId(accountKey.AccessKey).
		WithAccessKeySecret(accountKey.AccessSecret).
		WithStsToken(accountKey.StsToken).
		WithClusterServer(*f.APIServer).
		WithNamespace(*f.Namespace)
}

func (f *Config) GetAccountKey() AccountKey {
	ak, sk, sts, region := *f.AccessKey, *f.AccessSecretKey, *f.StsToken, *f.Region
	if ak == "" {
		ak = os.Getenv(AliCloudAccessKey)
	}
	if sk == "" {
		sk = os.Getenv(AliCloudSecretKey)
	}
	if sts == "" {
		sts = os.Getenv(AliCloudStsToken)
	}
	if region == "" {
		region = os.Getenv(AliCloudRegion)
	}
	return AccountKey{
		AccessKey:    ak,
		AccessSecret: sk,
		StsToken:     sts,
		Region:       region,
	}
}

func getDefaultCacheDir() string {
	if kcd := os.Getenv("SAECACHEDIR"); kcd != "" {
		return kcd
	}

	return filepath.Join(homedir.HomeDir(), ".sae", "cache")
}

// overlyCautiousIllegalFileCharacters matches characters that *might* not be supported.  Windows is really restrictive, so this is really restrictive
var overlyCautiousIllegalFileCharacters = regexp.MustCompile(`[^(\w/.)]`)

// computeDiscoverCacheDir takes the parentDir and the host and comes up with a "usually non-colliding" name.
func computeDiscoverCacheDir(parentDir, host string) string {
	schemelessHost := strings.Replace(strings.Replace(host, "https://", "", 1), "http://", "", 1)
	safeHost := overlyCautiousIllegalFileCharacters.ReplaceAllString(schemelessHost, "_")
	return filepath.Join(parentDir, safeHost)
}
