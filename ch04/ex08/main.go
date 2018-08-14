package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"unicode"
	"unicode/utf8"
)

// 文字や数字などを数えるように修正する
func main() {
	letterCounts := make(map[rune]int) // counts of Unicode characters
	digitCounts := make(map[rune]int)  // counts of Unicode number
	var utflen [utf8.UTFMax + 1]int    // count of lengths of UTF-8 encodings
	invalid := 0                       // count of invalid UTF-8 characters

	in := bufio.NewReader(os.Stdin)
	for {
		r, n, err := in.ReadRune() // returns rune, nbytes, error
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Fprintf(os.Stderr, "charcount: %v\n", err)
			os.Exit(1)
		}
		if r == unicode.ReplacementChar && n == 1 {
			invalid++
			continue
		}

		if unicode.IsDigit(r) {
			digitCounts[r]++
		}
		if unicode.IsLetter(r) {
			letterCounts[r]++
		}
		utflen[n]++
	}
	fmt.Printf("letter\tcount\n")
	for c, n := range letterCounts {
		fmt.Printf("%q\t%d\n", c, n)
	}
	fmt.Printf("digit\tcount\n")
	for c, n := range digitCounts {
		fmt.Printf("%q\t%d\n", c, n)
	}
	fmt.Print("\nlen\tcount\n")
	for i, n := range utflen {
		if i > 0 {
			fmt.Printf("%d\t%d\n", i, n)
		}
	}
	if invalid > 0 {
		fmt.Printf("\n%d invalid UTF-8 characters\n", invalid)
	}
}
