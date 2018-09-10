package eval

import (
	"fmt"
	"math"
	"strconv"
)

type Expr interface {
	Eval(env Env) float64
	Check(vars map[Var]bool) error
	String(env Env) string
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

func (v Var) String(env Env) string {
	return strconv.FormatFloat(env[v], 'f', -1, 64)
}
func (l literal) String(env Env) string {
	return strconv.FormatFloat(float64(l), 'f', -1, 64)
}

func (u unary) String(env Env) string {
	switch u.op {
	case '+':
		return "+" + u.x.String(env)
	case '-':
		return "-" + u.x.String(env)
	}
	panic(fmt.Sprintf("unsupported unary operator: %q", u.op))
}

func (b binary) String(env Env) string {
	switch b.op {
	case '+':
		return b.x.String(env) + "+" + b.y.String(env)
	case '-':
		return b.x.String(env) + "-" + b.y.String(env)
	case '*':
		return b.x.String(env) + "*" + b.y.String(env)
	case '/':
		return b.x.String(env) + "/" + b.y.String(env)
	}
	panic(fmt.Sprintf("unsupported binary operator: %q", b.op))
}

func (c call) String(env Env) string {
	switch c.fn {
	case "pow":
		return c.fn + "(" + c.args[0].String(env) + ", " + c.args[1].String(env) + ")"
	case "sin":
		return c.fn + "(" + c.args[0].String(env) + ", " + c.args[1].String(env) + ")"
	case "sqrt":
		return c.fn + "(" + c.args[0].String(env) + ")"
	}
	panic(fmt.Sprintf("unsupported function call: %s", c.fn))
}
