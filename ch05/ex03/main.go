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

	for _, text := range visit(nil, doc) {
		fmt.Printf("%s\n", text)
	}
}

func visit(texts []string, n *html.Node) []string {
	// <script><style>以外のTextNodeの内容を取得
	if n.Type == html.TextNode && n.Parent.Data != "script" && n.Parent.Data != "style" {
		texts = append(texts, n.Data)
	}

	if n.FirstChild != nil {
		texts = visit(texts, n.FirstChild)
	}
	if n.NextSibling != nil {
		texts = visit(texts, n.NextSibling)
	}

	return texts
}
