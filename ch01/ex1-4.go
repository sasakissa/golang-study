package main

import (
	"bufio"
	"fmt"
	"os"
)

func main4() {
	counts := make(map[string]int)
	parents := make(map[string][]string)
	files := os.Args[1:]
	if len(files) == 0 {

	} else {
		for _, arg := range files {
			f, err := os.Open(arg)
			if err != nil {
				fmt.Fprintf(os.Stderr, "dup2: %v\n", err)
				continue
			}
			countLines(f, arg, counts, parents)
			f.Close()
		}
	}
	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}

func countLines(f *os.File, arg string, counts map[string]int, parents map[string][]string) {
	input := bufio.NewScanner(f)
	for input.Scan() {
		s := input.Text()
		counts[s]++
		parents[s] = append(parents[s], arg)
	}
}
