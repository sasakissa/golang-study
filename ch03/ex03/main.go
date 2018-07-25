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
			ax, ay, az, aOk := corner(i+1, j)
			bx, by, bz, bOk := corner(i, j)
			cx, cy, cz, cOk := corner(i, j+1)
			dx, dy, dz, dOk := corner(i+1, j+1)

			color_str := colorFromZ((az+bz+cz+dz)/4, 1.0, 0.5)
			// 課題3.3 高さに応じて赤→青に色を変える
			if aOk && bOk && cOk && dOk {
				fmt.Printf("<polygon points='%g, %g %g, %g %g,%g %g, %g' fill='%s' /> \n", ax, ay, bx, by, cx, cy, dx, dy, color_str)
				continue
			}
		}
	}
	fmt.Printf("</svg>")
}

func corner(i, j int) (float64, float64, float64, bool) {
	x := xyrange * (float64(i)/cells - 0.5)
	y := xyrange * (float64(j)/cells - 0.5)

	z := f(x, y)
	if math.IsInf(z, 0) || math.IsNaN(z) {
		return 0, 0, 0, false
	}

	sx := width/2 + (x-y)*cos30*xyscale
	sy := height/2 + (x+y)*sin30*xyscale - z*zscale
	return sx, sy, z, true
}

func f(x, y float64) float64 {
	r := math.Hypot(x, y) // (0.0)からの距離
	return math.Sin(r) / r
}

func colorFromZ(z, max, min float64) string {
	half := (max - min) / 2
	v := int(math.Abs(z-half) * 255)
	if z >= half {
		// 赤色
		return fmt.Sprintf("#%02x0000", v)
	} else {
		// 青色
		return fmt.Sprintf("#0000%02x", v)
	}
}
