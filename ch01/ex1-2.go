package main

import (
	"fmt"
	"os"
	"strconv"
)

func main2() {
	for i := 0; i < len(os.Args); i++ {
		var s string
		s += strconv.Itoa(i)
		s += " "
		s += os.Args[i]
		fmt.Println(s)
	}
}
