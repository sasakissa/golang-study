package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"golang.org/x/net/html"
)

func main() {
	// url := flag.String("url", "https://golang.org", "url flag")
	// flag.Parse()
	words, images, err := CountWordsAndImages("https://golang.org")
	if err != nil {
		fmt.Fprintf(os.Stderr, "error happned: %v\n", err)
		os.Exit(1)
	}
	fmt.Printf("words: %d\nimages %d\n", words, images)
}

func CountWordsAndImages(url string) (words, images int, err error) {
	resp, err := http.Get(url)
	if err != nil {
		return 0, 0, err
	}

	doc, err := html.Parse(resp.Body)
	resp.Body.Close()
	if err != nil {
		err = fmt.Errorf("parsing HTML: %s", err)
		return 0, 0, err
	}
	words, images = countWordsAndImages(doc)
	return words, images, nil
}

func countWordsAndImages(n *html.Node) (words, images int) {
	return visit(0, 0, n)
}

func visit(words, images int, n *html.Node) (int, int) {
	// script、styleタグ以外のTextNodeに含まれる単語数を計算してwordsに加える
	if n.Type == html.TextNode && n.Parent.Data != "script" && n.Parent.Data != "style" && len(n.Data) > 0 {
		words += len(strings.Fields(n.Data))
	}

	// imgタグがあれば、wordsをインクリメントする
	if n.Type == html.ElementNode && n.Data == "img" {
		fmt.Println(n.Data)
		images++
	}

	if n.FirstChild != nil {
		words, images = visit(words, images, n.FirstChild)
	}
	if n.NextSibling != nil {
		words, images = visit(words, images, n.NextSibling)
	}

	return words, images
}
