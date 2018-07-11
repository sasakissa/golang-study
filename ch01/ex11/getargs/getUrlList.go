package getargs

import (
	"fmt"
	"os"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func GetArgs() []string {
	url := "https://www.alexa.com/topsites"
	urls := getUrls(url)
	return urls
}

func getUrls(url string) []string {
	urls := []string{}
	doc, err := goquery.NewDocument(url)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	doc.Find("div.td.DescriptionCell > p > a").Each(func(_ int, s *goquery.Selection) {
		tmp := "http://www." + strings.ToLower(s.Text())
		urls = append(urls, tmp)
	})
	return urls
}

func validate(url string) {
	//正規表現でhttp://とwwwを補完する
}
