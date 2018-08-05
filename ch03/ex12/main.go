package main

import (
	"strings"
)

func main() {
	println(isAnagram("abd", "abc"))
	println(isAnagram("abc", "cba"))
	println(isAnagram("bba", "aab"))
}

func isAnagram(s1, s2 string) bool {
	if len(s1) != len(s2) {
		return false
	}

	for i := range s1 {
		idx := strings.LastIndex(s2, string(s1[i]))
		if idx < 0 {
			return false
		}
		s2 = s2[:idx] + s2[idx+1:]
	}
	return true
}
