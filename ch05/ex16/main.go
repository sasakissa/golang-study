package main

import (
	"bytes"
	"fmt"
)

func main() {
	fmt.Printf("%s\n", variableNumJoin(", ", "a", "b", "c"))
}

func variableNumJoin(splitStr string, strs ...string) string {
	var byteBuffer bytes.Buffer
	for _, str := range strs {
		byteBuffer.Write([]byte(str))
		byteBuffer.Write([]byte(splitStr))
	}
	return byteBuffer.String()
}
