package main

import (
	"time"
)

type Track struct {
	Title  string
	Artist string
	Album  string
	Year   int
	Length time.Duration
}

var tracks = []*Track{
	{"Go", "Delilah", "From the Roots Up", 2012, length("3m38s")},
	{"Go", "Moby", "Moby", 1992, length("3m37s")},
	{"Go Ahead", "Alicia Keys", "As I Am", 2007, length("4m36s")},
	{"Ready 2 Go", "Martin Solveig", "Smash", 2011, length("4m24s")},
}

func length(s string) time.Duration {
	d, err := time.ParseDuration(s)
	if err != nil {
		panic(s)
	}
	return d
}

type comparisonByColmun func(a, b *Track) cmpRes

type multipleStage struct {
	t     []*Track
	comps []comparisonByColmun
}

func (m *multipleStage) Len() int      { return len(m.t) }
func (m *multipleStage) Swap(i, j int) { m.t[i], m.t[j] = m.t[j], m.t[i] }
func (m *multipleStage) Less(i, j int) bool {
	for _, f := range m.comps {
		cmp := f(m.t[i], m.t[j])
		switch cmp {
		case eq:
			continue
		case lt:
			return true
		case rt:
			return false
		}
	}
	return false
}

type cmpRes int

const (
	lt cmpRes = iota
	rt
	eq
)

func (m *multipleStage) lessByTitle(a, b *Track) cmpRes {
	switch {
	case a.Title == b.Title:
		return eq
	case a.Title < b.Title:
		return lt
	default:
		return rt
	}
}

func (m *multipleStage) lessByArtist(a, b *Track) cmpRes {
	switch {
	case a.Artist == b.Artist:
		return eq
	case a.Artist < b.Artist:
		return lt
	default:
		return rt
	}
}

func (m *multipleStage) lessByAlbum(a, b *Track) cmpRes {
	switch {
	case a.Album == b.Album:
		return eq
	case a.Album < b.Album:
		return lt
	default:
		return rt
	}
}

func (m *multipleStage) lessByYear(a, b *Track) cmpRes {
	switch {
	case a.Year == b.Year:
		return eq
	case a.Year < b.Year:
		return lt
	default:
		return rt
	}
}

func (m *multipleStage) lessByLength(a, b *Track) cmpRes {
	switch {
	case a.Length == b.Length:
		return eq
	case a.Length < b.Length:
		return lt
	default:
		return rt
	}
}

func main() {

}
