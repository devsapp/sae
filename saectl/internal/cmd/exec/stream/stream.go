package stream

import (
	"context"
	"io"
	"strings"
	"sync"

	"golang.org/x/net/websocket"
	"k8s.io/apimachinery/pkg/util/runtime"
	"k8s.io/client-go/tools/remotecommand"
)

type Option struct {
	Stdin             io.Reader
	Stdout            io.Writer
	StdErr            io.Writer
	TTY               bool
	TerminalSizeQueue remotecommand.TerminalSizeQueue
}

type Executor struct {
	Conn *websocket.Conn
	Option
}

func NewExecutor(conn *websocket.Conn, op Option) *Executor {
	return &Executor{
		Conn:   conn,
		Option: op,
	}
}

func (e *Executor) Stream() error {
	stop := make(chan struct{})
	ctx, cancel := context.WithCancel(context.Background())

	e.copyStdin(ctx, e.Stdin)
	e.copyStdout(stop, e.Stdout)

	select {
	case <-stop:
		cancel()
		return nil
	}
}

func (e *Executor) copyStdin(ctx context.Context, r io.Reader) {
	var once sync.Once
	go func() {
		defer runtime.HandleCrash()
		defer once.Do(func() { e.Conn.Close() })
		if _, err := io.Copy(e.Conn, NewGuardStdIn(ctx, r)); err != nil {
			runtime.HandleError(err)
		}
	}()
}

func (e *Executor) copyStdout(stop chan struct{}, w io.Writer) {
	go func() {
		defer runtime.HandleCrash()
		defer io.Copy(io.Discard, e.Conn)
		if _, err := io.Copy(w, NewGuardStdOut(e.Conn, stop)); err != nil {
			runtime.HandleError(err)
		}
	}()
}

type guardStdOut struct {
	io.Reader
	stop chan struct{}
}

func NewGuardStdOut(r io.Reader, stop chan struct{}) io.Reader {
	return &guardStdOut{
		Reader: r,
		stop:   stop,
	}
}

func (g *guardStdOut) Read(p []byte) (n int, err error) {
	n, err = g.Reader.Read(p)
	if strings.Contains(string(p), "{\"metadata\":{},\"status\":\"Failure\"") ||
		strings.Contains(string(p), "{\"metadata\":{},\"status\":\"Success\"") {
		g.stop <- struct{}{}
		return 0, io.EOF
	}
	return n, err
}

type guardStdIn struct {
	io.Reader
	ctx context.Context
}

func NewGuardStdIn(ctx context.Context, r io.Reader) io.Reader {
	return &guardStdIn{
		ctx:    ctx,
		Reader: r,
	}
}

func (g *guardStdIn) Read(p []byte) (n int, err error) {
	select {
	case <-g.ctx.Done():
		return 0, io.EOF
	default:
		return g.Reader.Read(p)
	}
}

type StdOutBuffer struct {
	builder strings.Builder
}

func NewStdOutBuffer() *StdOutBuffer {
	return &StdOutBuffer{
		builder: strings.Builder{},
	}
}

func (s *StdOutBuffer) Write(p []byte) (n int, err error) {
	s.builder.WriteString(string(p))
	//fmt.Printf("\n<--%s-->\n", s.builder.String())
	return len(p), nil
}

func (s *StdOutBuffer) String() string {
	return s.builder.String()
}
