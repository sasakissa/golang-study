package column

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
	T        []*Track
	comps    []comparisonByColmun
	maxCount int
}

func NewByColumns(tracks []*Track) *multipleStage {
	return &multipleStage{tracks, []comparisonByColmun{}, 5}
}

func (m *multipleStage) Len() int      { return len(m.T) }
func (m *multipleStage) Swap(i, j int) { m.T[i], m.T[j] = m.T[j], m.T[i] }
func (m *multipleStage) Less(i, j int) bool {
	for _, f := range m.comps {
		cmp := f(m.T[i], m.T[j])
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

func (m *multipleStage) LessByTitle(a, b *Track) cmpRes {
	switch {
	case a.Title == b.Title:
		return eq
	case a.Title < b.Title:
		return lt
	default:
		return rt
	}
}

func (m *multipleStage) LessByArtist(a, b *Track) cmpRes {
	switch {
	case a.Artist == b.Artist:
		return eq
	case a.Artist < b.Artist:
		return lt
	default:
		return rt
	}
}

func (m *multipleStage) LessByAlbum(a, b *Track) cmpRes {
	switch {
	case a.Album == b.Album:
		return eq
	case a.Album < b.Album:
		return lt
	default:
		return rt
	}
}

func (m *multipleStage) LessByYear(a, b *Track) cmpRes {
	switch {
	case a.Year == b.Year:
		return eq
	case a.Year < b.Year:
		return lt
	default:
		return rt
	}
}

func (m *multipleStage) LessByLength(a, b *Track) cmpRes {
	switch {
	case a.Length == b.Length:
		return eq
	case a.Length < b.Length:
		return lt
	default:
		return rt
	}
}

func (m *multipleStage) Select(comparison comparisonByColmun) {
	m.comps = append(m.comps, comparison)
	if len(m.comps) > m.maxCount {
		m.comps = m.comps[:m.maxCount]
	}
}
