package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"regexp"
)

func main() {
	flag.Parse()
	args := flag.Args()
	m := map[string]string{}
	for _, arg := range args {
		m = handleArg(m, arg)
	}

	for city, host := range m {
		go handleDial(city, host)
	}

}

func handleArg(m map[string]string, arg string) map[string]string {
	r := regexp.MustCompile("(.*)=(.*)")
	res := r.FindAllStringSubmatch(arg, -1)
	if len(res) < 1 && len(res[0]) < 3 {
		return m
	}
	m[res[0][1]] = res[0][2]
	return m
}

func handleDial(city string, host string) {
	conn, err := net.Dial("tcp", host)
	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close()
	fmt.Printf("%s\t", city)
	mustCopy(os.Stdout, conn)
	fmt.Println()
}

func mustCopy(dst io.Writer, src io.Reader) {
	if _, err := io.Copy(dst, src); err != nil {
		log.Fatal(err)
	}
}
