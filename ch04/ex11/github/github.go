package github

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

const IssuesURL = "https://api.github.com/search/issues"
const endpointURL = "https://api.github.com/"

type IssuesSearchResult struct {
	TotalCount int `json:"total_count"`
	Items      []*Issue
}

type Issue struct {
	Number    int
	HTMLURL   string `json:"html_url"`
	Title     string
	State     string
	User      *User
	CreatedAt time.Time `json:"created_at"`
	Body      string    // in Markdown format
}

type User struct {
	Login   string
	HTMLURL string `json:"html_url"`
}

// SearchIssues queries the GitHub issue tracker.
func SearchIssues(terms []string) (*IssuesSearchResult, error) {
	q := url.QueryEscape(strings.Join(terms, " "))
	resp, err := http.Get(IssuesURL + "?q=" + q)
	if err != nil {
		return nil, err
	}
	//!-
	// For long-term stability, instead of http.Get, use the
	// variant below which adds an HTTP request header indicating
	// that only version 3 of the GitHub API is acceptable.
	//
	//   req, err := http.NewRequest("GET", IssuesURL+"?q="+q, nil)
	//   if err != nil {
	//       return nil, err
	//   }
	//   req.Header.Set(
	//       "Accept", "application/vnd.github.v3.text-match+json")
	//   resp, err := http.DefaultClient.Do(req)
	//!+

	// We must close resp.Body on all execution paths.
	// (Chapter 5 presents 'defer', which makes this simpler.)
	if resp.StatusCode != http.StatusOK {
		resp.Body.Close()
		return nil, fmt.Errorf("search query failed: %s", resp.Status)
	}

	var result IssuesSearchResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		resp.Body.Close()
		return nil, err
	}
	resp.Body.Close()
	return &result, nil
}

func get(url string) (*http.Response, error) {
	response, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	if response.StatusCode != http.StatusOK {
		response.Body.Close()
		return nil, fmt.Errorf("can't get %s : %s", url, response.Status)
	}
	return response, nil
}

func GetIssue(owner string, repo string, issueNum string) (*Issue, error) {
	url := strings.Join([]string{endpointURL, "repos", owner, repo, "issues", issueNum}, "/")
	response, err := get(url)
	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	var issue Issue
	if err := json.NewDecoder(response.Body).Decode(&issue); err != nil {
		return nil, err
	}
	return &issue, nil
}

func GetIssues(owner string, repo string) ([]Issue, error) {
	url := strings.Join([]string{endpointURL, "repos", owner, repo, "issues"}, "/")
	response, err := get(url)
	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	var issue []Issue
	if err := json.NewDecoder(response.Body).Decode(&issue); err != nil {
		return nil, err
	}
	return issue, nil
}

func EditIssue(owner, repo, issueNum string, fields map[string]string) (*Issue, error) {
	buf := &bytes.Buffer{}
	encoder := json.NewEncoder(buf)
	err := encoder.Encode(fields)
	if err != nil {
		return nil, err
	}

	client := &http.Client{}
	url := strings.Join([]string{endpointURL, "repos", owner, repo, "issue", issueNum}, "/")
	request, err := http.NewRequest("PATCH", url, buf)
	request.SetBasicAuth(os.Getenv("GITHUB_USER"), os.Getenv("GITHUB_PATH"))
	if err != nil {
		return nil, err
	}
	response, err := client.Do(request)

	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to edit issue: %s", response.Status)
	}

	var issue Issue
	if err = json.NewDecoder(response.Body).Decode(&issue); err != nil {
		return nil, err
	}
	return &issue, nil
}
