package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	s := "Hello 世界!!"
	bytes := []byte(s)
	bytes = reverseUTF8(bytes)
	fmt.Println(string(bytes))
}

func reverseUTF8(b []byte) []byte {
	for i := 0; i < len(b); {
		_, size := utf8.DecodeRune(b[i:])
		reverse(b[i : i+size])
		i += size
	}
	reverse(b)
	return b
}

func reverse(b []byte) {
	size := len(b)
	for i := 0; i < len(b)/2; i++ {
		b[i], b[size-1-i] = b[size-1-i], b[i]
	}
}
