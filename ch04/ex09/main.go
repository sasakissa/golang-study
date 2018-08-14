package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"
)

// 入力テキストファイル内のそれぞれの単語の出現頻度を報告する
func main() {
	filepath := flag.String("input_file", "./sample.txt", "input txt file path")
	file, err := os.Open(*filepath)
	if err != nil {
		fmt.Printf("no such file or direcotry %x\n", filepath)
		return
	}
	defer file.Close()

	wordCounts := make(map[string]int)

	sc := bufio.NewScanner(file)
	sc.Split(bufio.ScanWords)
	for sc.Scan() {
		word := sc.Text()
		wordCounts[word]++
	}

	fmt.Printf("word\tcount\n")
	for w, n := range wordCounts {
		fmt.Printf("%q  %d\n", w, n)
	}

}
