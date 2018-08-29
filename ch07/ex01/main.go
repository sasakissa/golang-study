package main

import (
	"bufio"
	"bytes"
	"fmt"
)

type WordCounter int
type LineCounter int

func (w *WordCounter) write(p []byte) (int, error) {
	scanner := bufio.NewScanner(bytes.NewReader(p))
	scanner.Split(bufio.ScanWords)
	for scanner.Scan() {
		*w += WordCounter(1)
	}

	return len(p), nil
}

func (l *LineCounter) write(p []byte) (int, error) {
	scanner := bufio.NewScanner(bytes.NewReader(p))
	scanner.Split(bufio.ScanLines)
	for scanner.Scan() {
		*l += LineCounter(1)
	}

	return len(p), nil
}
func main() {
	var w WordCounter
	w.write([]byte("hello  world"))
	fmt.Println(w)

	var l LineCounter
	l.write([]byte("hellow \n world\n "))
	fmt.Println(l)
}
