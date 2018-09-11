package main

import (
	"fmt"
	"log"
	"math"

	"./eval"
)

func main() {
	tests := []struct {
		expr string
		env  eval.Env
	}{
		{"min[sqrt(A / pi), A]", eval.Env{"A": 3, "pi": math.Pi}},
	}

	for _, test := range tests {
		expr, err := eval.Parse(test.expr)
		if err != nil {
			log.Fatal(err)
			continue
		}
		fmt.Println(expr.Eval(test.env))
	}
}
