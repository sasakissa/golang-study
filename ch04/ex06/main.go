package main

import (
	"fmt"
	"unicode"
)

// utf8でエンコードされたスライス内で隣接するUnicodeスペースをもとのスライス内でASCIIスペースに圧縮する
func main() {
	s := "HELLO  WORLD"
	fmt.Println(s)
	b := []byte(s)
	fmt.Println(string(filterSpace(b)))
}

func filterSpace(bytes []byte) []byte {
	for i := 0; i < len(bytes)-1; i++ {
		if unicode.IsSpace(rune(bytes[i])) && unicode.IsSpace(rune(bytes[i+1])) {
			copy(bytes[i:], bytes[i+1:])
			bytes = bytes[:len(bytes)-1]
		}
	}
	return bytes
}
