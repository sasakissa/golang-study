package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"

	"./eval"
)

func main() {
	fmt.Fprintf(os.Stdout, "please input expression\n")
	stdin := bufio.NewScanner(os.Stdin)
	stdin.Scan()
	exprStr := stdin.Text()
	expr, err := eval.Parse(exprStr)
	if err != nil {
		fmt.Fprintf(os.Stdout, "invalid expression: %q", exprStr)
	}
	env := make(map[eval.Var]float64)
	vars := expr.Vars()
	for i := 0; i < len(vars); i++ {
		fmt.Fprintf(os.Stdout, "input variable: %s\n", vars[i])
		stdin.Scan()
		varStr := stdin.Text()
		varFloat, err := strconv.ParseFloat(varStr, 64)
		if err != nil {
			fmt.Fprintf(os.Stdout, "Invalid Iuput!!\nPlease input float value\n\n\n")
			i--
			continue
		}
		env[vars[i]] = varFloat
	}

	fmt.Printf("Answer: %f\n", expr.Eval(env))
}
