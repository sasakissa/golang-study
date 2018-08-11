package main

import (
	"fmt"
)

func main() {
	s := []int{0, 1, 2, 3, 4, 5}
	// ２つだけ左にsを回転させる
	rotate(s[:], 2)
	fmt.Println(s)

}

// 課題：1回のパスで操作を行うrotate
func rotate(s []int, n int) {
	_s := append(s[n:], s[:n]...)
	for i := 0; i < len(s); i++ {
		s[i] = _s[i]
	}
}
