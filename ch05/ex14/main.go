package main

import (
	"fmt"
	"sort"
)

var prereqs = map[string][]string{
	"algorithms": {"data structures"},
	"calculus":   {"linear algebra"},

	"compilers": {
		"data structures",
		"formal languages",
		"computer organization",
	},

	"data structures":       {"discrete math"},
	"databases":             {"data structures"},
	"discrete math":         {"intro to programming"},
	"formal languages":      {"discrete math"},
	"networks":              {"operating systems"},
	"operating systems":     {"data structures", "computer organization"},
	"programming languages": {"data structures", "computer organization"},
}

func breadthFirst(f func(item string) []string, worklist []string) {
	seen := make(map[string]bool)
	for len(worklist) > 0 {
		items := worklist
		worklist = nil
		for _, item := range items {
			if !seen[item] {
				seen[item] = true
				worklist = append(worklist, f(item)...)
			}
		}
	}
}

var order []string

func toposort(item string) []string {
	order = append(order, item)
	return prereqs[item]
}

func main() {
	var keys []string
	for k, _ := range prereqs {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	breadthFirst(toposort, keys)

	i := 0
	for len(order) > 0 {
		cource, newOrder := pop(order)
		order = newOrder
		fmt.Printf("%d:\t%s\n", i+1, cource)
		i++
	}
}

func pop(slice []string) (string, []string) {
	item := slice[len(slice)-1]
	popedSlice := slice[:len(slice)-1]
	return item, popedSlice
}
