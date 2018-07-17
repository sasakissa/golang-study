package main

import (
	"fmt"
	"math"
)

const (
	width, height = 600, 320
	cells         = 100
	xyrange       = 30.0
	xyscale       = width / 2 / xyrange
	zscale        = height * 0.4
	angle         = math.Pi / 6
)

var sin30, cos30 = math.Sin(angle), math.Cos(angle)

func main() {
	fmt.Printf("<svg xmlns='http://www.w3.org/2000/svg' "+
		"style='stroke: grey; fill: white; stroke-width: 0.7' "+
		"width='%d' height='%d' >", width, height)
	for i := 0; i < cells; i++ {
		for j := 0; j < cells; j++ {
			ax, ay, aOk := corner(i+1, j)
			bx, by, bOk := corner(i, j)
			cx, cy, cOk := corner(i, j+1)
			dx, dy, dOk := corner(i+1, j+1)

			if aOk && bOk && cOk && dOk {
				fmt.Printf("<polygon points='%g, %g %g, %g %g,%g %g, %g' /> \n", ax, ay, bx, by, cx, cy, dx, dy)
				continue
			}
		}
	}
	fmt.Printf("</svg>")
}

func corner(i, j int) (float64, float64, bool) {
	x := xyrange * (float64(i)/cells - 0.5)
	y := xyrange * (float64(j)/cells - 0.5)

	z := f(x, y)
	// 課題3.1 不正なfloatの値が入っていた場合スキップする
	if math.IsInf(z, 0) || math.IsNaN(z) {
		return 0, 0, false
	}

	sx := width/2 + (x-y)*cos30*xyscale
	sy := height/2 + (x+y)*sin30*xyscale - z*zscale
	return sx, sy, true
}

func f(x, y float64) float64 {
	r := math.Hypot(x, y) // (0.0)からの距離
	return math.Sin(r) / r
}
