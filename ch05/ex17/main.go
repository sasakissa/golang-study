package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"golang.org/x/net/html"
)

func main() {
	url := os.Args[1]
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	doc, err := html.Parse(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	scripts := ElementsByTagName(doc, "script")
	headings := ElementsByTagName(doc, "h1", "h2", "h3", "h4")
	fmt.Println(scripts)
	fmt.Println(headings)
}

func ElementsByTagName(doc *html.Node, name ...string) []*html.Node {
	nodes := forEacnNode(doc, name)
	return nodes
}

func forEacnNode(n *html.Node, name []string) []*html.Node {
	var checkNode func(*html.Node, []string)
	var nodes []*html.Node

	checkNode = func(n *html.Node, name []string) {
		if n.Type == html.ElementNode {
			for _, tag := range name {
				if n.Data == tag {
					nodes = append(nodes, n)
				}
			}

		}

		for c := n.FirstChild; c != nil; c = c.NextSibling {
			nodes = append(nodes, forEacnNode(c, name)...)
		}
	}

	checkNode(n, name)
	return nodes
}
