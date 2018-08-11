package main

import (
	"crypto/sha256"
	"crypto/sha512"
	"flag"
)

func main() {
	mode := flag.String("mode", "sha256", "mode flag")
	if *mode == "sha256" {
		c1 := sha256.Sum256([]byte("x"))
		c2 := sha256.Sum256([]byte("X"))
		println(DiffCount256(c1, c2))
	} else if *mode == "sha384" {
		c1 := sha512.Sum384([]byte("x"))
		c2 := sha512.Sum384([]byte("X"))
		println(DiffCount512(c1, c2))
	} else if *mode == "sha512" {
		c1 := sha512.Sum512([]byte("x"))
		c2 := sha512.Sum512([]byte("X"))
		println(DiffCount512(c1, c2))
	}

}

func DiffCount256(c1, c2 [32]byte) int {
	count := 0
	for i := 0; i < len(c1); i++ {
		x := int(c1[i])
		y := int(c2[i])
		z := x ^ y
		count += PopCount(z)
	}
	return count
}

func DiffCount512(c1, c2 [64]byte) int {
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
