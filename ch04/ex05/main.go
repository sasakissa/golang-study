package main

import (
	"fmt"
)

func main() {
	s := []string{"a", "a", "b", "b", "c", "c"}
	fmt.Println(filterDuplicate(s))
}

// 課題；スライス内で隣接している重複を除去する
func filterDuplicate(s []string) []string {
	for i := 0; i < len(s)-1; i++ {
		if s[i] == s[i+1] {
			copy(s[i:], s[i+1:])
			s[len(s)-1] = ""
			s = s[:len(s)-1]
		}
	}
	return s
}
