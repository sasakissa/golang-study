package main

import (
	"../intset"
)

func main() {}

// 課題6.2 可変個引数対応
func (s *intset.IntSet) AddAll(nums ...int) {
	for _, num := range nums {
		s.Add(num)
	}
}

// 課題6.3 積集合
func (s *intset.IntSet) IntersectWith(t *IntSet) {
	for i, word := range t.words {
		if i < len(s.words) {
			s.words[i] &= word
		}
	}
}

// 課題6.4 差集合
func (s *intset.IntSet) DifferenceWith(t *IntSet) {
	for i, word := range t.words {
		if i < len(s.words) {
			s.words[i] &= !word
		}
	}
}

// 課題6.3 対象差集合
func (s *intset.IntSet) SymmetricDifference(t *IntSet) {
	for i, word := range t.words {
		if i < len(s.words) {
			s.words[i] ^= word
		} else {
			s.words = append(s.words, word)
		}
	}
}
