package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"golang.org/x/net/html"
)

func breadthFirst(f func(item string) []string, worklist []string) {
	seen := make(map[string]bool)
	for len(worklist) > 0 {
		items := worklist
		worklist = nil
		for _, item := range items {
			if !seen[item] {
				seen[item] = true
				worklist = append(worklist, f(item)...)
			}
		}
	}
}

// crawlを改良し、見つけたページの複製をローカルに作成する
// 異なるドメインのページは複製しない
// todo:
// ドメイン判定入れる
// 画像データとかも保管できるようにする

func crawl(url string) []string {
	fmt.Println(url)

	resp, err := http.Get(url)
	if err != nil {
		log.Print(err)
		return nil
	}
	if resp.StatusCode != http.StatusOK {
		resp.Body.Close()
		log.Print(err)
		return nil
	}

	doc, err := html.Parse(resp.Body)
	if err != nil {
		return nil
	}

	// リンクをたどる
	list, err := Extract(resp, doc)
	if err != nil {
		log.Print(err)
	}

	// 複製する
	err = copyPage(resp, doc)
	if err != nil {
		log.Print(err)
	}

	defer resp.Body.Close()

	return list
}

func copyPage(resp *http.Response, doc *html.Node) error {

	dirname := "./" + resp.Request.URL.Host + resp.Request.URL.Path
	if len(resp.Request.URL.Path) == 0 {
		dirname += "/"
	}

	if err := os.MkdirAll(dirname, 0777); err != nil {
		log.Fatal(err)
	}
	file, err := os.Create(dirname + "index.html")
	if err != nil {
		return err
	}
	defer file.Close()

	texts, err := outline(doc)
	for _, text := range texts {
		file.WriteString(text)
	}

	return nil
}

// html→[]sting
func outline(n *html.Node) ([]string, error) {

	var depth int
	var texts []string
	var startElement func(n *html.Node)
	var endElement func(n *html.Node)

	startElement = func(n *html.Node) {
		// テキストノード
		if n.Type == html.TextNode && len(strings.Fields(n.Data)) > 0 { // 空白のみのテキストは無視
			text := strings.Repeat(" ", depth*2) + strings.Replace(n.Data, "\n", "\n"+strings.Repeat(" ", depth*2), -1)
			texts = append(texts, text+"\n")
		}

		// エレメントノード
		if n.Type == html.ElementNode {
			// 属性を書く
			texts = append(texts, strings.Repeat(" ", depth*2)+"<"+n.Data)
			for _, attr := range n.Attr {
				text := " " + attr.Key + "='" + attr.Val + "' "
				texts = append(texts, text)
			}
			texts = append(texts, ">\n")
			depth++
		}
	}

	endElement = func(n *html.Node) {
		if n.Type == html.ElementNode {
			depth--
			texts = append(texts, strings.Repeat(" ", depth*2)+"</"+n.Data+">"+"\n")
		}
	}

	forEachNode(n, startElement, endElement)

	return texts, nil
}

func Extract(resp *http.Response, doc *html.Node) ([]string, error) {

	var links []string
	visitNode := func(n *html.Node) {
		if n.Type == html.ElementNode && n.Data == "a" {
			for _, a := range n.Attr {
				if a.Key != "href" {
					continue
				}
				link, err := resp.Request.URL.Parse(a.Val)
				if err != nil {
					continue // ignore bad URLs
				}
				// domain外かどうかの判断
				domain := resp.Request.URL.Host
				linkDomain := link.Host
				fmt.Println(linkDomain)
				if domain != linkDomain {
					continue
				}
				links = append(links, link.String())
			}
		}
	}

	forEachNode(doc, visitNode, nil)
	return links, nil
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

func main() {
	breadthFirst(crawl, os.Args[1:])
}
