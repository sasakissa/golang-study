package eval

import (
	"fmt"
	"math"
)

type Expr interface {
	Eval(env Env) float64
	Check(vars map[Var]bool) error
	Vars() []Var
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

func (c call) Vars() []Var {
	vars := []Var{}
	for _, arg := range c.args {
		vars = append(vars, arg.Vars()...)
	}
	return vars
}

func (b binary) Vars() []Var {
	vars := []Var{}
	vars = append(vars, b.x.Vars()...)
	vars = append(vars, b.y.Vars()...)
	return vars
}

func (u unary) Vars() []Var {
	return u.x.Vars()
}

func (l literal) Vars() []Var {
	return []Var{}
}

func (v Var) Vars() []Var {
	return []Var{v}
}
