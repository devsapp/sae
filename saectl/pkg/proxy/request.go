package proxy

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"io"
	"net/http"

	"github.com/aliyun/alibaba-cloud-sdk-go/sdk/requests"
	"github.com/aliyun/alibaba-cloud-sdk-go/sdk/responses"
)

const (
	OpenAPIScheme        = "https"
	SAEYamlPathPattern   = "/pop/v1/apiserver/proxy"
	SAEYamlPopAPIVersion = "2019-05-06"
	SAEYamlPopAPINAME    = "VirtualServerProxy"
	SAEPopServiceCode    = "serverless"
	SAEProductName       = "sae"
	SAEYamlDefaultMethod = "POST"
)

type MetaRequestInjector struct{}

func (r MetaRequestInjector) ApplyToRequest(request *requests.CommonRequest) error {
	request.Scheme = OpenAPIScheme
	request.PathPattern = SAEYamlPathPattern
	request.Version = SAEYamlPopAPIVersion
	request.ApiName = SAEYamlPopAPINAME
	request.Product = SAEProductName
	request.ServiceCode = SAEPopServiceCode
	request.EndpointType = "openAPI"
	request.Method = SAEYamlDefaultMethod
	request.SetContentType("application/json")
	return nil
}

func warpRequest(req *requests.CommonRequest, injectors ...RequestInjector) error {
	for _, injector := range injectors {
		if err := injector.ApplyToRequest(req); err != nil {
			return err
		}
	}
	return nil
}

func wrapResponse(response *http.Response, injectors ...ResponseInjector) error {
	for _, injector := range injectors {
		if err := injector.ApplyToResponse(response); err != nil {
			return err
		}
	}
	return nil
}

type RequestInjector interface {
	ApplyToRequest(request *requests.CommonRequest) error
}

type ResponseInjector interface {
	ApplyToResponse(response *http.Response) error
}

type HttpRequestInjector struct {
	*http.Request
}

func (r HttpRequestInjector) ApplyToRequest(request *requests.CommonRequest) error {
	reqPath := r.URL.Path
	if query := r.URL.Query(); len(query) > 0 {
		reqPath += "?" + query.Encode()
	}
	request.Domain = r.URL.Host
	body := &input{
		Path:        reqPath,
		Method:      r.Method,
		ContentType: "application/json",
		Header:      r.Header,
	}
	if r.Body != nil {
		data, _ := io.ReadAll(r.Body)
		body.Content = string(data)
	}
	content, err := body.json()
	if err != nil {
		return err
	}
	request.SetContent(content)
	return nil
}

func (r HttpRequestInjector) ApplyToResponse(response *http.Response) error {
	response.ProtoMinor = r.ProtoMinor
	response.Proto = r.Proto
	response.ProtoMajor = r.ProtoMajor
	response.Request = r.Request
	return nil
}

type HttpResponseInjector struct {
	*responses.CommonResponse
}

func (r HttpResponseInjector) ApplyToResponse(response *http.Response) error {
	out := new(output)
	if err := out.unmarshal(r.GetHttpContentBytes()); err != nil {
		return err
	}
	response.Header = out.Header
	response.StatusCode = out.Code
	data, err := base64.StdEncoding.DecodeString(out.Body)
	if err != nil {
		return err
	}
	response.Body = io.NopCloser(bytes.NewReader(data))
	response.ContentLength = int64(len(data))
	return nil
}

type input struct {
	Path        string              `json:"path"`
	Method      string              `json:"method"`
	ContentType string              `json:"contentType"`
	Content     string              `json:"content"`
	Header      map[string][]string `json:"header,omitempty"`
}

func (in *input) json() ([]byte, error) {
	bt, err := json.Marshal(in)
	if err != nil {
		return nil, err
	}
	return bt, nil
}

type output struct {
	RequestId string              `json:"requestId"`
	Code      int                 `json:"code"`
	Error     string              `json:"error,omitempty"`
	Body      string              `json:"body,omitempty"`
	Header    map[string][]string `json:"header,omitempty"`
}

func (out *output) unmarshal(data []byte) error {
	if err := json.Unmarshal(data, out); err != nil {
		return err
	}
	return nil
}
