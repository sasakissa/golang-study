package main

import (
	"testing"

	"./popcount"
)

func BenchmarkPop(b *testing.B) {
	n := 114514
	for i := 0; i < b.N; i++ {
		popcount.PopCount(uint64(n))
	}
}
func BenchmarkPopLoop(b *testing.B) {
	n := 114514
	for i := 0; i < b.N; i++ {
		popcount.PopCountByLoop(uint64(n))
	}
}
func BenchmarkPopShift(b *testing.B) {
	n := 114514
	for i := 0; i < b.N; i++ {
		popcount.PopCountByShift(uint64(n))
	}
}

func BenchmarkPopByLowerBit(b *testing.B) {
	n := 114514
	for i := 0; i < b.N; i++ {
		popcount.PopCountByClearLowestBit(uint64(n))
	}
}
