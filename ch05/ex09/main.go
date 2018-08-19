package main

import (
	"bytes"
	"fmt"
	"regexp"
	"strings"
	"unicode/utf8"
)

func main() {
	text := "hello $world"
	fmt.Println(text)
	fmt.Println(expand(text, replace))
}

func expand(s string, f func(string) string) string {
	r := regexp.MustCompile(`\$([0-9|a-z|A-Z]+)`)
	var bf bytes.Buffer
	// 単語ごとに分解し、正規表現に当てはまるものがあれはf(string)で置換する
	for _, word := range strings.Fields(s) {
		res := r.FindAllStringSubmatch(word, -1)
		if len(res) < 1 {
			bf.Write([]byte(word))
			bf.Write([]byte(" "))
			continue
		}
		bf.Write([]byte(replace(res[0][1])))
	}
	return bf.String()
}

// utf8で一つずらす
func replace(old string) string {
	var bf bytes.Buffer
	oldBytes := []byte(old)[:]
	for i := 0; i < len(oldBytes); {
		r, s := utf8.DecodeRune(oldBytes[i:])
		bf.Write([]byte{byte(r) + 1})
		i += s
	}
	return bf.String()
}
