package main

import (
	"image"
	"image/color"
	"image/gif"
	"io"
	"math"
	"math/rand"
	"os"
	"time"
)

func main() {
	rand.Seed(time.Now().UTC().UnixNano())
	lissajousColor(os.Stdout)
}

func lissajousColor(out io.Writer) {
	const (
		cycles  = 5
		res     = 0.001
		size    = 100
		nframes = 63
		delay   = 8
	)
	var palette = []color.Color{color.Black, color.RGBA{0x00, 0x00, 0x88, 0xff}}
	for x := 0; x < 10; x++ {
		for y := 0; y < 10; y++ {
			palette = append(palette, color.RGBA{uint8(x * 255 / 10), uint8(y * 255 / 10), 0, 0xff})
		}
	}
	freq := rand.Float64() * 3.0
	anim := gif.GIF{LoopCount: nframes}
	phase := 0.0
	cIndex := 0
	for i := 0; i < nframes; i++ {
		rect := image.Rect(0, 0, 2*size+1, 2*size+1)
		img := image.NewPaletted(rect, palette)
		for t := 0.0; t < cycles*2*math.Pi; t += res {
			x := math.Sin(t)
			y := math.Sin(t*freq + phase)
			img.SetColorIndex(size+int(x*size+0.5), size+int(y*size+0.5), uint8(cIndex))
		}
		phase += 0.1
		cIndex += 1
		anim.Delay = append(anim.Delay, delay)
		anim.Image = append(anim.Image, img)
	}
	gif.EncodeAll(out, &anim)
}
