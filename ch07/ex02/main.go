package main

import (
	"bytes"
	"fmt"
	"io"
)

type CountWriter struct {
	w     io.Writer
	Count int64
}

func (c *CountWriter) Write(p []byte) (n int, err error) {
	n, err = c.w.Write(p)
	c.Count += int64(n)
	return
}
func CountingWriter(w io.Writer) (io.Writer, *int64) {
	c := &CountWriter{w, 0}
	return c, &c.Count
}

func main() {
	c, n := CountingWriter(&bytes.Buffer{})
	data := []byte("hello world")
	c.Write(data)
	fmt.Println(*n)
}
