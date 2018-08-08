package main

import (
	"image"
	"image/color"
	"image/png"
	"math/cmplx"
	"os"
)

func main() {
	const (
		xmin, ymin, xmax, ymax = -2, -2, +2, +2
		width, height          = 1024, 1024
	)
	img := image.NewRGBA(image.Rect(0, 0, width, height))
	for py := 0; py < height; py++ {
		y := float64(py)/height*(ymax-ymin) + ymin
		for px := 0; px < width; px++ {
			x := float64(px)/width*(xmax-xmin) + xmin
			z := complex(x, y)
			// 画像の店(px, py) は複素数ｚを表している
			img.Set(px, py, z2color(z))
		}
	}
	png.Encode(os.Stdout, img)
}

func z2color(z complex128) color.Color {
	const iterations = 255
	const thres float64 = 0.00000000000000000000000005

	v := z
	for n := 0; n < iterations; n++ {
		v = newton(v)
		if cmplx.Abs(v-complex(1, 0)) < thres {
			return color.RGBA{uint8(255 - n), 0, 0, 255}
		}
		if cmplx.Abs(v-complex(-1, 0)) < thres {
			return color.RGBA{0, uint8(255 - n), 0, 255}
		}
		if cmplx.Abs(v-complex(0, 1)) < thres {
			return color.RGBA{0, 0, uint8(255 - n), 255}
		}
		if cmplx.Abs(v-complex(0, -1)) < thres {
			return color.RGBA{uint8(255 - n), uint8(255 - n/100), 122, 255}
		}

	}
	return color.Black
}
func newton(z complex128) complex128 {
	z_1 := z - (cmplx.Pow(z, 4)-1)/(4*cmplx.Pow(z, 3))
	return z_1
}
