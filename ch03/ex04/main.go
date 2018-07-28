package main

import (
	"fmt"
	"log"
	"math"
	"net/http"
	"strconv"
)

func main() {
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	width, height := parseParam(r)
	w.Header().Set("Content-Type", "image/svg+xml")
	writeSvg(w, width, height)
}

func parseParam(r *http.Request) (float64, float64) {
	width := 600.0
	height := 320.0
	if err := r.ParseForm(); err != nil {
		return width, height
	}

	widVal, ok := r.Form["width"]
	heiVal, hOk := r.Form["height"]
	if ok && len(widVal) > 0 && hOk && len(heiVal) > 0 {
		resWid, wErr := strconv.Atoi(widVal[0])
		resHei, hErr := strconv.Atoi(heiVal[0])
		fmt.Println(hErr)
		fmt.Println(hErr == nil)
		if wErr == nil && hErr == nil {
			return float64(resWid), float64(resHei)
		}
	}
	return width, height
}

func writeSvg(w http.ResponseWriter, width float64, height float64) {

	cells := 100
	xyrange := 30.0
	xyscale := width / 2 / xyrange
	zscale := height * 0.4
	angle := math.Pi / 6
	var sin30, cos30 = math.Sin(angle), math.Cos(angle)

	fmt.Fprintf(w, "<svg xmlns='http://www.w3.org/2000/svg' "+
		"style='stroke: grey; fill: white; stroke-width: 0.7' "+
		"width='%d' height='%d' >", width, height)
	for i := 0; i < cells; i++ {
		for j := 0; j < cells; j++ {
			ax, ay, az, aOk := corner(i+1, j, cells, width, height, xyrange, xyscale, zscale, sin30, cos30)
			bx, by, bz, bOk := corner(i, j, cells, width, height, xyrange, xyscale, zscale, sin30, cos30)
			cx, cy, cz, cOk := corner(i, j+1, cells, width, height, xyrange, xyscale, zscale, sin30, cos30)
			dx, dy, dz, dOk := corner(i+1, j+1, cells, width, height, xyrange, xyscale, zscale, sin30, cos30)

			color_str := colorFromZ((az+bz+cz+dz)/4, 1.0, 0.5)
			if aOk && bOk && cOk && dOk {
				fmt.Fprintf(w, "<polygon points='%g, %g %g, %g %g,%g %g, %g' fill='%s' /> \n", ax, ay, bx, by, cx, cy, dx, dy, color_str)
				continue
			}
		}
	}
	fmt.Fprintf(w, "</svg>")

}
func corner(i, j, cells int, width, height, xyrange, xyscale, zscale, sin30, cos30 float64) (float64, float64, float64, bool) {
	x := xyrange * (float64(i)/float64(cells) - 0.5)
	y := xyrange * (float64(j)/float64(cells) - 0.5)

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
