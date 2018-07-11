package main

import (
	"fmt"
	"os"
	"strconv"

	"./lengthconv"
	"./tempconv"
	"./weightconv"
)

func main() {
	if len(os.Args) < 3 {
		os.Exit(1)
	}
	n, err := strconv.ParseFloat(os.Args[1], 64)
	if err != nil {
		fmt.Fprintln(os.Stdout, "float parsing error")
		os.Exit(1)
	}
	switch os.Args[2] {
	case "t":
		convTemp(n)
	case "l":
		convLength(n)
	case "w":
		convWeight(n)
	default:
		fmt.Fprintln(os.Stdout, "invalid type charater")
	}
}

func convTemp(t float64) {
	f := tempconv.Fahrengeit(t)
	c := tempconv.Celsius(t)
	fmt.Printf("%s = %s, %s = %s\n", f, tempconv.FToC(f), c, tempconv.CToF(c))
}

func convLength(l float64) {
	f := lengthconv.Feet(l)
	m := lengthconv.Meter(l)
	fmt.Printf("%s = %s, %s = %s\n", f, lengthconv.FToM(f), m, lengthconv.MToF(m))
}

func convWeight(w float64) {
	p := weightconv.Pond(w)
	k := weightconv.Kilogram(w)
	fmt.Printf("%s = %s, %s = %s\n", p, weightconv.PToK(p), k, weightconv.KToP(k))
}
