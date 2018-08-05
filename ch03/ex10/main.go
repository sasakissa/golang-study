package main

import (
	"bytes"
)

func main() {
	println(comma("123456789"))
}

func comma(s string) string {
	var buf bytes.Buffer
	for i := 0; i < len(s); i++ {
		buf.WriteString(string(s[i]))
		if (i+1)%3 == 0 && i < len(s)-1 {
			buf.WriteString(", ")
		}
	}

	return buf.String()
}
