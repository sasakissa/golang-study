package main

import (
	"fmt"
	"log"
	"sort"
)

var prereqs = map[string][]string{
	"algorithms":     {"data structures"},
	"calculus":       {"linear algebra"},
	"linear algebra": {"calculus"},

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

// 循環を検知する
func main() {
	order, err := topoSort(prereqs)
	if err != nil {
		log.Fatal(err)
		return
	}
	for i, course := range order {
		fmt.Printf("%d:\t%s\n", i+1, course)
	}
}

func topoSort(m map[string][]string) ([]string, error) {
	var order []string
	// 根からの経路をmapに保持する
	route := make(map[string]bool)
	seen := make(map[string]bool)
	var visitAll func(items []string)
	var checkCycle func(items []string) error

	visitAll = func(items []string) {
		for _, item := range items {

			if !seen[item] {
				seen[item] = true
				visitAll(m[item])
				order = append(order, item)
			}
		}
	}

	checkCycle = func(items []string) error {
		for _, item := range items {
			if route[item] {
				// 根からたどってきた経路に含まれるノードに達したら循環している
				return fmt.Errorf("Cyclic Graph Error")
			}

			route[item] = true
			err := checkCycle(m[item])
			if err != nil {
				return err
			}
			delete(route, item)
		}
		return nil
	}

	var keys []string
	for key := range m {
		keys = append(keys, key)
	}

	sort.Strings(keys)
	// 循環の確認(分けずにやりたい)
	err := checkCycle(keys)
	if err != nil {
		return nil, err
	}
	visitAll(keys)

	return order, nil
}
