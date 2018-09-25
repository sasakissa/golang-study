package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"net"
	"regexp"
)

func main() {
	flag.Parse()
	args := flag.Args()
	m := map[string]string{}
	for _, arg := range args {
		m = handleArg(m, arg)
	}

	i := 0
	for city, host := range m {
		go handleDial(city, host, i)
		i++
	}
	for {

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

func handleDial(city string, host string, index int) {
	conn, err := net.Dial("tcp", host)
	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close()
	fmt.Printf("%s:%s\n", city, host)
	s := bufio.NewScanner(conn)
	for s.Scan() {
		fmt.Printf("%s\t%s\n", city, s.Text())
	}

}

// func mustCopy(dst io.Writer, src io.Reader) {
// 	if _, err := io.Copy(dest, src); err != nil {
// 		log.Fatal(err)
// 	}
// }
