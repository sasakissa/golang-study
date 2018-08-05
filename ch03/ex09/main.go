package main

import (
	"fmt"
	"image"
	"image/color"
	"image/png"
	"log"
	"math/cmplx"
	"net/http"
	"strconv"
)

func main() {
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	x, y := parseParam(r)
	writeFrac(w, x, y)
}

func parseParam(r *http.Request) (float64, float64) {
	x := 6.0
	y := 3.0
	if err := r.ParseForm(); err != nil {
		return x, y
	}

	widVal, ok := r.Form["x"]
	heiVal, hOk := r.Form["y"]
	if ok && len(widVal) > 0 && hOk && len(heiVal) > 0 {
		resWid, wErr := strconv.Atoi(widVal[0])
		resHei, hErr := strconv.Atoi(heiVal[0])
		fmt.Println(hErr)
		fmt.Println(hErr == nil)
		if wErr == nil && hErr == nil {
			return float64(resWid), float64(resHei)
		}
	}
	return x, y
}

func writeFrac(w http.ResponseWriter, x float64, y float64) {

	const (
		width, height = 1024, 1024
		zoomLevel     = 10.0
	)
	xmin := x - zoomLevel
	xmax := x + zoomLevel
	ymin := y - zoomLevel
	ymax := y + zoomLevel

	img := image.NewRGBA(image.Rect(0, 0, width, height))
	for py := 0; py < height; py++ {
		y := float64(py)/height*(ymax-ymin) + ymin
		for px := 0; px < width; px++ {
			x := float64(px)/width*(xmax-xmin) + xmin
			z := complex(x, y)
			// 画像の店(px, py) は複素数ｚを表している
			img.Set(px, py, mandelbrot(z))
		}
	}
	png.Encode(w, img)

}

func mandelbrot(z complex128) color.Color {
	const iterations = 200
	const contrast = 15

	var v complex128
	for n := uint8(0); n < iterations; n++ {
		v = v*v + z
		if cmplx.Abs(v) > 2 {
			return color.YCbCr{255 - n*contrast, 255, 0}
		}
	}
	return color.Black
}

func newton(z complex128) complex128 {
	z_1 := z - (cmplx.Pow(z, 4)-1)/(4*cmplx.Pow(z, 3))
	return z_1
}
