package eval

import (
	"fmt"
	"math"
	"sort"
)

type Expr interface {
	Eval(env Env) float64
	Check(vars map[Var]bool) error
}

type Var string

type literal float64

type unary struct {
	op rune // one of '+', '-'
	x  Expr
}

type binary struct {
	op   rune // one of '+', '-', '*', '/'
	x, y Expr
}

type call struct {
	fn   string // one of "pow", "sin", "sqrt"
	args []Expr
}

// 課題7.16
type list struct {
	fn   string // one of "min" "max"
	args []Expr
}
type Env map[Var]float64

func (v Var) Eval(env Env) float64 {
	return env[v]
}

func (l literal) Eval(_ Env) float64 {
	return float64(l)
}

func (u unary) Eval(env Env) float64 {
	switch u.op {
	case '+':
		return +u.x.Eval(env)
	case '-':
		return -u.x.Eval(env)
	}
	panic(fmt.Sprintf("unsupported unary operator: %q", u.op))
}

func (b binary) Eval(env Env) float64 {
	switch b.op {
	case '+':
		return b.x.Eval(env) + b.y.Eval(env)
	case '-':
		return b.x.Eval(env) - b.y.Eval(env)
	case '*':
		return b.x.Eval(env) * b.y.Eval(env)
	case '/':
		return b.x.Eval(env) / b.y.Eval(env)
	}
	panic(fmt.Sprintf("unsupported binary operator: %q", b.op))
}

func (c call) Eval(env Env) float64 {
	switch c.fn {
	case "pow":
		return math.Pow(c.args[0].Eval(env), c.args[1].Eval(env))
	case "sin":
		return math.Sin(c.args[0].Eval(env))
	case "sqrt":
		return math.Sqrt(c.args[0].Eval(env))
	}
	panic(fmt.Sprintf("unsupported function call: %s", c.fn))
}

func (l list) Eval(env Env) float64 {
	switch l.fn {
	case "min":
		nums := []float64{}
		for _, arg := range l.args {
			nums = append(nums, arg.Eval(env))
		}
		sort.Float64s(nums)
		return nums[0]
	case "max":
		nums := []float64{}
		for _, arg := range l.args {
			nums = append(nums, arg.Eval(env))
		}
		sort.Float64s(nums)
		return nums[len(nums)-1]
	}
	panic(fmt.Sprintf("unsupported funcion call: %s", l.fn))
}
