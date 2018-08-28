package intset

import (
	"bytes"
	"fmt"
)

// 課題6.5 uintを使うようにプログラムを修正する
type IntSet struct {
	words []uint
}

const CPU_BIT = 32 << (^uint(0) >> 63)

func (s *IntSet) Has(x int) bool {
	word, CPU_BIT := x/CPU_BIT, uint(x%CPU_BIT)
	return word < len(s.words) && s.words[word]&(1<<CPU_BIT) != 0
}

func (s *IntSet) Add(x int) {
	word, CPU_BIT := x/CPU_BIT, uint(x%CPU_BIT)
	for word >= len(s.words) {
		s.words = append(s.words, 0)
	}
	s.words[word] |= 1 << CPU_BIT
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
		for j := 0; j < CPU_BIT; j++ {
			if word&(1<<uint(j)) != 0 {
				if buf.Len() > len("{") {
					buf.WriteByte(' ')
				}
				fmt.Fprintf(&buf, "%d", CPU_BIT*i+j)
			}
		}
	}
	buf.WriteByte('}')
	return buf.String()
}

func (s *IntSet) Len() int {
	var popCount func(p uint) int
	popCount = func(p uint) int {
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

func (s *IntSet) Remove(x int) {
	word, CPU_BIT := x/CPU_BIT, uint(x%CPU_BIT)
	if !s.Has(x) {
		fmt.Printf("There is no %s", x)
		return
	}

	s.words[word] ^= (1 << CPU_BIT)
}

func (s *IntSet) Clear() {
	s.words = []uint{}
}

func (s *IntSet) Copy() *IntSet {
	copiedS := IntSet{}
	copy(s.words, copiedS.words)
	return &copiedS
}

func (s *IntSet) AddAll(nums ...int) {
	for _, num := range nums {
		s.Add(num)
	}
}

func (s *IntSet) IntersectWith(t *IntSet) {
	for i, word := range t.words {
		if i < len(s.words) {
			s.words[i] &= word
		}
	}
}

func (s *IntSet) DifferenceWith(t *IntSet) {
	for i, word := range t.words {
		if i < len(s.words) {
			s.words[i] &= ^word
		}
	}
}

func (s *IntSet) SymmetricDifference(t *IntSet) {
	for i, word := range t.words {
		if i < len(s.words) {
			s.words[i] ^= word
		} else {
			s.words = append(s.words, word)
		}
	}
}

func (s *IntSet) Elems() []int {
	var elems []int
	for i, word := range s.words {
		if word == 0 {
			continue
		}
		for j := 0; j < CPU_BIT; j++ {
			if word&(1<<uint(j)) != 0 {
				elems = append(elems, CPU_BIT*i+j)

			}
		}
	}
	return elems
}
