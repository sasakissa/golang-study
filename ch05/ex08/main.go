package main

import (
	"fmt"
	"net/http"
	"os"

	"golang.org/x/net/html"
)

func main() {
	url := os.Args[1]
	id := os.Args[2]
	outline(url, id)
}

func outline(url, id string) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	doc, err := html.Parse(resp.Body)
	if err != nil {
		return err
	}

	n := findElementByID(doc, id)

	if n != nil {
		fmt.Printf("<%s", n.Data)
		for _, attr := range n.Attr {
			fmt.Printf(" %s='%s'", attr.Key, attr.Val)
		}
		fmt.Printf("/>\n")
	}
	return nil
}

func forEachNode(n *html.Node, id string, pre, post func(n *html.Node, id string) bool) {

	if pre != nil {
		finish := pre(n, id)
		if finish {
			return
		}
	}

	for c := n.FirstChild; c != nil; c = c.NextSibling {
		forEachNode(c, id, pre, post)
	}

	if post != nil {
		finish := post(n, id)
		if finish {
			return
		}
	}
}

func findElementByID(doc *html.Node, id string) *html.Node {
	forEachNode(doc, id, startElement, endElement)
	return foundNode
}

var foundNode *html.Node

func startElement(n *html.Node, id string) bool {

	if n.Type == html.ElementNode {
		for _, attr := range n.Attr {
			if attr.Key == "id" && attr.Val == id {
				foundNode = n
				return true
			}
		}
	}

	return false
}

func endElement(n *html.Node, id string) bool {
	// do nothing
	return false
}
