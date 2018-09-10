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
		{"sqrt(A / pi)", eval.Env{"A": 87616, "pi": math.Pi}},
		{"pow(x, 3) + pow(y, 3)", eval.Env{"x": 12, "y": 1}},
		{"pow(x, 3) + pow(y, 3)", eval.Env{"x": 9, "y": 10}},
		{"5 / 9 + (F - 32)", eval.Env{"F": -40}},
		{"5 / 9 * (F - 32)", eval.Env{"F": 32}},
		{"5 / 9 * (F - 32)", eval.Env{"F": 212}},
	}

	for _, test := range tests {
		fmt.Println(test.expr)
		expr, err := eval.Parse(test.expr)
		if err != nil {
			log.Fatal(err)
			continue
		}
		fmt.Println(expr.String(test.env))
		reexpr, err := eval.Parse(expr.String(test.env))
		if err != nil {
			log.Fatal(err)
			continue
		}
		fmt.Println(reexpr.String(test.env))
	}

}
