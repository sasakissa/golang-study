package main

import (
	"image"
	"image/color"
	"image/png"
	"math/cmplx"
	"os"
)

type Rgb struct {
	R uint8
	G uint8
	B uint8
}

func main() {
	const (
		xmin, ymin, xmax, ymax = -2, -2, +2, +2
		width, height          = 1024, 1024
	)

	src := make([][]Rgb, width)
	for i := range src {
		src[i] = make([]Rgb, height)
	}

	img := image.NewRGBA(image.Rect(0, 0, width, height))
	for py := 0; py < height; py++ {
		y := float64(py)/height*(ymax-ymin) + ymin
		for px := 0; px < width; px++ {
			x := float64(px)/width*(xmax-xmin) + xmin
			z := complex(x, y)
			src[px][py] = mandelbrot(z)
		}
	}

	dest := conv(src)
	for py := 0; py < height/2; py++ {
		for px := 0; px < width/2; px++ {
			img.Set(px, py, dest[px][py])
		}
	}
	png.Encode(os.Stdout, img)
}

func mandelbrot(z complex128) Rgb {
	const iterations = 200
	const contrast = 15

	var v complex128
	for n := uint8(0); n < iterations; n++ {
		v = v*v + z
		if cmplx.Abs(v) > 2 {
			return Rgb{255, 255 - n*contrast, 0}
		}
		if cmplx.Abs(v) > 1 {
			return Rgb{0, 255 - n*contrast, 255}
		}
	}
	return Rgb{0, 0, 0}
}

func conv(src [][]Rgb) [][]color.Color {
	width := 1024 / 2
	height := 1024 / 2
	dest := make([][]color.Color, height)
	for i := range dest {
		dest[i] = make([]color.Color, width)
	}

	for py := 0; py < width; py++ {
		for px := 0; px < height; px++ {
			red := (src[px*2][py*2].R + src[px*2][py*2+1].R + src[px*2+1][py].R + src[px*2+1][py*2+1].R) / 4
			blue := (src[px*2][py*2].B + src[px*2][py*2+1].B + src[px*2+1][py*2].B + src[px*2+1][py*2+1].B) / 4
			green := (src[px*2][py*2].G + src[px*2][py*2+1].G + src[px*2+1][py*2].G + src[px*2+1][py*2+1].G) / 4
			dest[px][py] = color.RGBA{red, green, blue, 255}
		}
	}
	return dest
}
