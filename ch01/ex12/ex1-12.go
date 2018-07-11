package main

import (
	"fmt"
	"image"
	"image/color"
	"image/gif"
	"io"
	"log"
	"math"
	"math/rand"
	"net/http"
	"strconv"
	"sync"
)

var mu sync.Mutex
var count int
var palette = []color.Color{color.Black, color.RGBA{0x00, 0x78, 0x00, 0xff}}

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/count", counter)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	cycleParam := parseParam(r)
	lissajousWith(w, cycleParam)
}

func counter(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	fmt.Fprintf(w, "Count %d\n", count)
	mu.Unlock()
}

func parseParam(r *http.Request) float64 {
	def := 5.0
	if err := r.ParseForm(); err != nil {
		return def
	}
	if val, ok := r.Form["cycles"]; ok && len(val) > 0 {
		res, err := strconv.Atoi(val[0])
		if err != nil {
			return float64(res)
		}
	}
	return def
}

func lissajousWith(out io.Writer, cycleParam float64) {
	const (
		res     = 0.001
		size    = 100
		nframes = 63
		delay   = 8
	)
	cycles := cycleParam
	freq := rand.Float64() * 3.0
	anim := gif.GIF{LoopCount: nframes}
	phase := 0.0
	for i := 0; i < nframes; i++ {
		rect := image.Rect(0, 0, 2*size+1, 2*size+1)
		img := image.NewPaletted(rect, palette)
		fmt.Println(img)
		for t := 0.0; t < cycles*2*math.Pi; t += res {
			x := math.Sin(t)
			y := math.Sin(t*freq + phase)
			img.SetColorIndex(size+int(x*size+0.5), size+int(y*size+0.5), 1)
		}
		phase += 0.1
		anim.Delay = append(anim.Delay, delay)
		anim.Image = append(anim.Image, img)
	}
	gif.EncodeAll(out, &anim)
}
