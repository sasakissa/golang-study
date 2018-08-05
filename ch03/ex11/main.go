package main

import (
	"bytes"
	"strings"
)

func main() {
	println(comma("-123456.789"))
	println(comma("+123456.789"))
	println(comma("123456789"))
}

// 符号記号をもつ浮動小数点を扱う
func comma(s string) string {
	var dec string
	var sign string
	var buf bytes.Buffer
	// 小数部を分割
	if dot := strings.LastIndex(s, "."); dot >= 0 {
		dec = s[dot+1:]
		s = s[:dot]
	}
	// 符号を分割
	if signIdx := strings.LastIndex(s, "+"); signIdx >= 0 {
		sign = "+"
		s = s[signIdx+1:]
	}
	if signIdx := strings.LastIndex(s, "-"); signIdx >= 0 {
		sign = "-"
		s = s[signIdx+1:]
	}

	buf.WriteString(sign)
	for i := 0; i < len(s); i++ {
		buf.WriteString(string(s[i]))
		if (i+1)%3 == 0 && i < len(s)-1 {
			buf.WriteString(", ")
		}
	}
	if len(dec) > 0 {
		buf.WriteString(".")
		buf.WriteString(dec)
	}
	return buf.String()
}
