package main

import (
	"crypto/sha256"
)

func main() {
	c1 := sha256.Sum256([]byte("x"))
	c2 := sha256.Sum256([]byte("X"))
	println(DiffCount(c1, c2))
}

func DiffCount(c1, c2 [32]byte) int {
	count := 0
	for i := 0; i < len(c1); i++ {
		x := int(c1[i])
		y := int(c2[i])
		z := x ^ y
		count += PopCount(z)
	}
	return count
}

func PopCount(z int) int {
	count := 0
	for z != 0 {
		z &= z - 1
		count += 1
	}
	return count
}
