package main

import (
	"sort"
)

func main() {

}

func IsPalindrome(s sort.Interface) bool {
	max := s.Len()
	for i := 0; i < max/2; i++ {
		if s.Less(i, max-i) || s.Less(max-i, i) {
			return false
		}
	}

	return true
}
