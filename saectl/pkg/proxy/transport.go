package proxy

import (
	"net/http"

	"github.com/aliyun/alibaba-cloud-sdk-go/sdk"
	"github.com/aliyun/alibaba-cloud-sdk-go/sdk/requests"
	knet "k8s.io/apimachinery/pkg/util/net"
	"k8s.io/client-go/transport"
)

type Transport struct {
	proxy    *sdk.Client
	delegate http.RoundTripper
}

var _ http.RoundTripper = &Transport{}
var _ knet.RoundTripperWrapper = &Transport{}

func NewTransportWrapper(cli *sdk.Client) transport.WrapperFunc {
	return func(rt http.RoundTripper) http.RoundTripper {
		return NewTransport(rt, cli)
	}
}

func NewTransport(rt http.RoundTripper, cli *sdk.Client) http.RoundTripper {
	return &Transport{
		proxy:    cli,
		delegate: rt,
	}
}

func (t *Transport) RoundTrip(req *http.Request) (*http.Response, error) {
	requestInjector := HttpRequestInjector{Request: req}
	popReq := requests.NewCommonRequest()
	if err := warpRequest(popReq,
		MetaRequestInjector{},
		requestInjector); err != nil {
		return nil, err
	}
	CommonResponse, err := t.proxy.ProcessCommonRequest(popReq)
	if err != nil {
		return nil, err
	}
	response := new(http.Response)
	if err = wrapResponse(response,
		requestInjector,
		HttpResponseInjector{CommonResponse}); err != nil {
		return nil, err
	}
	return response, nil
}

func (t *Transport) WrappedRoundTripper() http.RoundTripper {
	return t.delegate
}
