package main

import (
	"bytes"
	"fmt"
	"strconv"
)

//!+
type tree struct {
	value       int
	left, right *tree
}

func main() {
	t := tree{0, nil, nil}

	for i := 1; i < 10; i++ {
		add(&t, i)
	}

	fmt.Println(t.String())
}

// 課題7.3 String()メソッドを実装する
func (t *tree) String() string {
	var vals []int
	var dfs func(*tree)

	dfs = func(t *tree) {
		vals = append(vals, t.value)

		if t.left != nil {
			dfs(t.left)
		}

		if t.right != nil {
			dfs(t.right)
		}
	}

	dfs(t)
	var b bytes.Buffer
	for _, val := range vals {
		b.WriteString(strconv.Itoa(val))
		b.Write([]byte(", "))
	}
	return b.String()
}

func Sort(values []int) {
	var root *tree
	for _, v := range values {
		root = add(root, v)
	}
	appendValues(values[:0], root)
}

func appendValues(values []int, t *tree) []int {
	if t != nil {
		values = appendValues(values, t.left)
		values = append(values, t.value)
		values = appendValues(values, t.right)
	}
	return values
}

func add(t *tree, value int) *tree {
	if t == nil {
		t = new(tree)
		t.value = value
		return t
	}
	if value < t.value {
		t.left = add(t.left, value)
	} else {
		t.right = add(t.right, value)
	}
	return t
}
