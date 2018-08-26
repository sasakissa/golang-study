package main

import (
	"fmt"
)

func main() {
	message := panicRecover()
	fmt.Println(message)
}

func panicRecover() (message string) {
	type safePanic struct{}
	defer func() {
		switch p := recover(); p {
		case nil:
		case safePanic{}:
			message = "recovery now"
		default:
			panic(p)
		}
	}()

	panic(safePanic{})
}
