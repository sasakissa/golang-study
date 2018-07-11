package main

import (
	"fmt"
	"os"
	"strings"
	"time"
)

func main() {
	start := time.Now()
	var s string
	for i := 0; i < len(os.Args); i++ {
		s += os.Args[i]
	}
	fmt.Println(s)
	end := time.Now()
	fmt.Println(end.Sub(start).Nanoseconds(), "ns")

	start = time.Now()
	fmt.Println(strings.Join(os.Args[0:], " "))
	end = time.Now()
	fmt.Println(end.Sub(start).Nanoseconds(), "ns")

}
