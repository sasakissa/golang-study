package main

import (
	"encoding/xml"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	dec := xml.NewDecoder(os.Stdin)
	var stack []string // stack of element names
	var attrStack []string // stack of attribute names
	for {
		tok, err := dec.Token()
		if err == io.EOF {
			break
		} else if err != nil {
			fmt.Fprintf(os.Stderr, "xmlselect: %v\n", err)
			os.Exit(1)
		}
		switch tok := tok.(type) {
		case xml.StartElement:
			stack = append(stack, tok.Name.Local)
			// push attrs
			for _, attr := range tok.Attr {
				if attr.Name.Local == "id" || attr.Name.Local == "class" {
					attrStack = append(attrStack, attr.Value)	
				}
			 }
		case xml.EndElement:
			stack = stack[:len(stack)-1]
			// pop attrs
			attrStack = []string{}
		case xml.CharData:
			if containsAll(stack, os.Args[1:]) {
				fmt.Printf("%s: %s\n", strings.Join(stack, " "), tok)
			}
		}
	}
}

func containsAll(x, y []string) bool {
	for len(y) <= len(x) {
		if len(y) == 0 {
			return true
		}
		if x[0] == y[0] {
			y = y[1:]
		}
		x = x[1:]
	}
	return false
}

// 課題7.17 idやクラスで選択できるようにする
func containsName(x, y []string) bool {
	ymap  := map[string]bool
	for _, yname := range y {
		ymap[yname] = true
	}

	for _, xname := range x {
		_, ok := ymap[xname]
		if ok {
			return ok
		}
	}
	return false
}