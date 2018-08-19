package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"golang.org/x/net/html"
)

func main() {
	for _, url := range os.Args[1:] {
		outline(url)
	}
}

func outline(url string) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	doc, err := html.Parse(resp.Body)
	if err != nil {
		return err
	}

	forEachNode(doc, startElement, endElement)

	return nil
}

func forEachNode(n *html.Node, pre, post func(n *html.Node)) {
	if pre != nil {
		pre(n)
	}

	for c := n.FirstChild; c != nil; c = c.NextSibling {
		forEachNode(c, pre, post)
	}

	if post != nil {
		post(n)
	}
}

var depth int

func startElement(n *html.Node) {

	// テキストノード
	if n.Type == html.TextNode && len(strings.Fields(n.Data)) > 0 { // 空白のみのテキストは無視
		fmt.Printf("%*s%s\n", depth*2, "", strings.Replace(n.Data, "\n", "\n"+strings.Repeat(" ", depth*2), -1))
	}

	// エレメントノード
	if n.Type == html.ElementNode {
		fmt.Printf("%*s<%s", depth*2, "", n.Data)
		// 属性を書く
		for _, attr := range n.Attr {
			fmt.Printf(" %s='%s'", attr.Key, attr.Val)
		}
		if n.FirstChild != nil {
			fmt.Printf(">\n")
		} else {
			fmt.Printf("/>\n")
		}
		depth++
	}
}

func endElement(n *html.Node) {
	if n.Type == html.ElementNode {
		depth--
		if n.FirstChild != nil {
			fmt.Printf("%*s</%s>\n", depth*2, "", n.Data)
		}
	}
}
