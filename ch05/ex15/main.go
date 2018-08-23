package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println(maxIn(0, 1, 1, 2, 3, 5, 8, 13))
	fmt.Println(minIn(0, 1, 1, 2, 3, 5, 8, 13))
}

func max(vals ...int) int {
	if len(vals) == 0 {
		fmt.Printf("Invalid Argument: pass at least one int")
		return 0
	}
	max := math.MinInt64
	for _, val := range vals {
		if max < val {
			max = val
		}
	}
	return max
}

func min(vals ...int) int {
	min := math.MaxInt64
	for _, val := range vals {
		if min > val {
			min = val
		}
	}
	return min
}

func maxIn(val int, vals ...int) int {
	max := val
	for _, otherVal := range vals {
		if max < otherVal {
			max = otherVal
		}
	}
	return max
}

func minIn(val int, vals ...int) int {
	min := val
	for _, otherVal := range vals {
		if min > otherVal {
			min = otherVal
		}
	}
	return min
}
