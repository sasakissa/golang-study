package main

import "math"

type BUnit int

func main() {
	const (
		_ BUnit = iota
		KB
		MB
		GB
		TB
		PB
		EB
		YB
	)
	println(KB.RawValue())
}

func (b BUnit) RawValue() float64 {
	return math.Pow(1000, float64(b))
}
