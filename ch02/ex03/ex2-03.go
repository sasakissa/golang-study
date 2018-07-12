package main

import (
	"fmt"
	"reflect"
	"runtime"
	"time"

	"./popcount"
)

func main() {
	x := uint64(11111111111111)
	measurePerformance(x, popcount.PopCount)
	measurePerformance(x, popcount.PopCountByLoop)
	measurePerformance(x, popcount.PopCountByShift)
	measurePerformance(x, popcount.PopCountByClearLowestBit)
}

func measurePerformance(x uint64, fn func(uint64) int) {
	start := time.Now()
	fv := reflect.ValueOf(fn)
	print(runtime.FuncForPC(fv.Pointer()).Name())
	print("\n")
	end := time.Now()
	fmt.Printf("%.10fs elapsed \n", end.Sub(start).Seconds())
}
