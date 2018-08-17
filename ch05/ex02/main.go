package main

import (
	"fmt"
	"os"

	"golang.org/x/net/html"
)

func main() {
	doc, err := html.Parse(os.Stdin)
	if err != nil {
		fmt.Fprintf(os.Stderr, "findlinks1: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("element : count\n\n")
	for k, v := range visit(map[string]int{}, doc) {
		fmt.Printf("%s : %d\n", k, v)
	}
}

func visit(nodeDataCountMap map[string]int, n *html.Node) map[string]int {
	if n.Type == html.ElementNode {
		nodeDataCountMap[n.Data]++
	}

	if n.FirstChild != nil {
		nodeDataCountMap = visit(nodeDataCountMap, n.FirstChild)
	}
	if n.NextSibling != nil {
		nodeDataCountMap = visit(nodeDataCountMap, n.NextSibling)
	}

	return nodeDataCountMap
}
