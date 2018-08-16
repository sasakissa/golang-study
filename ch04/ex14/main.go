package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"html/template"

	"./github"
)

//!+template

var issueListTemplete = template.Must(template.New("issuelist").Parse(`
<h1>{{.Issues | len}} issues</h1>
<table>
<tr style='text-align: left'>
<th>#</th>
<th>State</th>
<th>User</th>
<th>Title</th>
</tr>
{{range .Issues}}
<tr>
	<td><a href='{{.CacheURL}}'>{{.Number}}</td>
	<td>{{.State}}</td>
	<td><a href='{{.User.HTMLURL}}'>{{.User.Login}}</a></td>
	<td><a href='{{.CacheURL}}'>{{.Title}}</a></td>
</tr>
{{end}}
</table>
`))

var issueTemplete = template.Must(template.New("issue").Parse(`
<h1>{{.Title}}</h1>
<dl>
	<dt>user</dt>
	<dd><a href='{{.User.HTMLURL}}'>{{.User.Login}}</a></dd>
	<dt>state</dt>
	<dd>{{.State}}</dd>
</dl>
<p>{{.Bpdy}}</p>
`))

//!-template

type IssueCache struct {
	Issues         []github.Issue
	IssuesByNumber map[int]github.Issue
}

func NewIssueCache(owner, repo string) (ic IssueCache, err error) {
	issues, err := github.GetIssues(owner, repo)
	if err != nil {
		return
	}
	ic.Issues = issues
	ic.IssuesByNumber = make(map[int]github.Issue, len(issues))
	for _, issue := range issues {
		ic.IssuesByNumber[issue.Number] = issue
	}
	return
}

func (ic IssueCache) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	pathParts := strings.SplitN(r.URL.Path, "/", -1)
	if len(pathParts) < 3 || pathParts[2] == "" {
		log.Print(issueListTemplete.Execute(w, ic))
		return
	}

	numStr := pathParts[2]
	num, err := strconv.Atoi(numStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		_, err := w.Write([]byte(fmt.Sprintf("Issue number isn't a number: '%s'", numStr)))
		if err != nil {
			log.Printf("Erro writing response for %s : %s", r, err)
		}
		return
	}
	issue, ok := ic.IssuesByNumber[num]
	if !ok {
		w.WriteHeader(http.StatusNotFound)
		_, err := w.Write([]byte(fmt.Sprintf("No issue %d", num)))
		if err != nil {
			log.Printf("Error writing rsponse for %s : %s", r, err)
		}
		return
	}
	log.Print(issueTemplete.Execute(w, issue))
}

func main() {
	if len(os.Args) != 3 {
		fmt.Fprintln(os.Stderr, "usage: githubserver OWNER REPO")
		os.Exit(1)
	}
	owner := os.Args[1]
	repo := os.Args[2]

	issueCache, err := NewIssueCache(owner, repo)
	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/", issueCache)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
