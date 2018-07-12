package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

// todo: ちゃんと課題をやる
// diffの確認とキャッシュの有無
func main() {
	start := time.Now()
	ch := make(chan string)
	bodyFileName := os.Args[2]
	file, _ := os.OpenFile("./ex1-10.txt", os.O_WRONLY|os.O_APPEND, 0666)

	go fetch(os.Args[1], ch, bodyFileName)
	fmt.Fprintln(file, <-ch)

	fmt.Printf("%.2fs elapsed \n", time.Since(start).Seconds())
}

func fetch(url string, ch chan<- string, bodyFileName string) {
	start := time.Now()
	resp, err := http.Get(url)
	if err != nil {
		ch <- fmt.Sprint(err)
	}
	bodyFile, _ := os.OpenFile(bodyFileName, os.O_WRONLY|os.O_APPEND, 0666)
	nbytes, err := io.Copy(bodyFile, resp.Body)
	defer resp.Body.Close()
	if err != nil {
		ch <- fmt.Sprintf("while reading %s: %v", url, err)
		return
	}
	secs := time.Since(start).Seconds()
	ch <- fmt.Sprintf("%.2fs %7d %s", secs, nbytes, url)
}
