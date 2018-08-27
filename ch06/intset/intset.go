package intset

import (
	"bytes"
	"fmt"
)

type IntSet struct {
	words []uint64
}

func (s *IntSet) Has(x int) bool {
	word, bit := x/64, uint(x%64)
	return word < len(s.words) && s.words[word]&(1<<bit) != 0
}

func (s *IntSet) Add(x int) {
	word, bit := x/64, uint(x%64)
	for word >= len(s.words) {
		s.words = append(s.words, 0)
	}
	s.words[word] |= 1 << bit
}

func (s *IntSet) UnionWith(t *IntSet) {
	for i, tword := range t.words {
		if i < len(s.words) {
			s.words[i] |= tword
		} else {
			s.words = append(s.words, tword)
		}
	}
}

func (s *IntSet) String() string {
	var buf bytes.Buffer
	buf.WriteByte('{')
	for i, word := range s.words {
		if word == 0 {
			continue
		}
		for j := 0; j < 64; j++ {
			if word&(1<<uint(j)) != 0 {
				if buf.Len() > len("{") {
					buf.WriteByte(' ')
				}
				fmt.Fprintf(&buf, "%d", 64*i+j)
			}
		}
	}
	buf.WriteByte('}')
	return buf.String()
}

// 課題6.1
func (s *IntSet) Len() int {
	var popCount func(p uint64) int
	popCount = func(p uint64) int {
		cnt := 0
		for p > 0 {
			p = p & (p - 1)
			cnt++
		}
		return cnt
	}
	cnt := 0
	for _, word := range s.words {
		cnt += popCount(word)
	}
	return cnt
}

//　課題6.1
func (s *IntSet) Remove(x int) {
	word, bit := x/64, uint64(x%64)
	if !s.Has(x) {
		fmt.Printf("There is no %s", x)
		return
	}

	s.words[word] ^= (1 << bit)
}

// 課題6.1
func (s *IntSet) Clear() {
	s.words = []uint64{}
}

// 課題6.1
func (s *IntSet) Copy() *IntSet {
	copiedS := IntSet{}
	copy(s.words, copiedS.words)
	return &copiedS
}

// 課題6.2 可変個引数対応
func (s *IntSet) AddAll(nums ...int) {
	for _, num := range nums {
		s.Add(num)
	}
}

// 課題6.3 積集合
func (s *IntSet) IntersectWith(t *IntSet) {
	for i, word := range t.words {
		if i < len(s.words) {
			s.words[i] &= word
		}
	}
}

// 課題6.3 差集合
func (s *IntSet) DifferenceWith(t *IntSet) {
	for i, word := range t.words {
		if i < len(s.words) {
			s.words[i] &= ^word
		}
	}
}

// 課題6.3 対象差集合
func (s *IntSet) SymmetricDifference(t *IntSet) {
	for i, word := range t.words {
		if i < len(s.words) {
			s.words[i] ^= word
		} else {
			s.words = append(s.words, word)
		}
	}
}
