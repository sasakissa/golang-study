package main

import (
	"html/template"
	"log"
	"net/http"
	"sort"
	"time"

	"./column"
)

var tracks = []*column.Track{
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

var html = template.Must(template.New("track").Parse(`
<html>
<body>
<table>
	<tr>
		<th><a href="?sort=title">title</a></th>
		<th><a href="?sort=artist">artist</a></th>
		<th><a href="?sort=album">album</a></th>
		<th><a href="?sort=year">year</a></th>
		<th><a href="?sort=length">length</a></th>
	</tr>
{{range .}}
	<tr>
		<td>{{.Title}}</td>
		<td>{{.Artist}}</td>
		<td>{{.Album}}</td>
		<td>{{.Year}}</td>
		<td>{{.Length}}</td>
	</td>
{{end}}
</body>
</html>
`))

func main() {
	c := column.NewByColumns(tracks)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		switch r.FormValue("sort") {
		case "title":
			c.Select(c.LessByTitle)
		case "artist":
			c.Select(c.LessByArtist)
		case "album":
			c.Select(c.LessByAlbum)
		case "year":
			c.Select(c.LessByYear)
		case "length":
			c.Select(c.LessByYear)
		}
		sort.Sort(c)
		err := html.Execute(w, c.T)
		if err != nil {
			log.Printf("template error: %s", err)
		}
	})
	log.Fatal(http.ListenAndServe(":8080", nil))
}
