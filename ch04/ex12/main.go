package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

const APIURL = "https://xkcd.com"
const MAPPATH = "./map"

type CommicInfo struct {
	Title      string
	Transcript string
}

type StoredCommicInfo struct {
	Title      string
	Transcript string
	Url        string
	Number     int
}

func main() {

	titleCommicMap, err := readTitleMap(MAPPATH)

	if err != nil {
		titleCommicMap = map[string]StoredCommicInfo{}
		// 並列化したい
		for i := 0; i < 2500; i++ {
			commicInfo, err := getCommicInfo(string(i))
			if err != nil {
				continue
			}
			storedCommitInfo := convertStoredCommicInfo(*commicInfo, i)
			titleCommicMap[commicInfo.Title] = storedCommitInfo
		}
		writeTitleMap(MAPPATH, &titleCommicMap)
	}

	query := os.Args[1]
	if len(query) == 0 {
		fmt.Println("input query word")
		return
	}

	if commic, ok := titleCommicMap[query]; ok {
		fmt.Printf("Transcript\n%s\nurl: %s", commic.Transcript, commic.Url)
		return
	}
	fmt.Println("There is no commic of such a title")
}

func getCommicInfo(number string) (*CommicInfo, error) {
	url := strings.Join([]string{APIURL, number, "info.0.json"}, "/")
	response, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	if response.StatusCode != http.StatusOK {
		response.Body.Close()
		return nil, fmt.Errorf("can't get %s : %s", url, response.Status)
	}

	defer response.Body.Close()

	var commicInfo CommicInfo
	if err := json.NewDecoder(response.Body).Decode(&commicInfo); err != nil {
		return nil, err
	}

	return &commicInfo, nil
}

func convertStoredCommicInfo(commicInfo CommicInfo, number int) StoredCommicInfo {
	var storedCommitInfo StoredCommicInfo
	storedCommitInfo.Title = commicInfo.Title
	storedCommitInfo.Transcript = commicInfo.Transcript
	storedCommitInfo.Number = number
	storedCommitInfo.Url = strings.Join([]string{APIURL, string(number)}, "/")
	return storedCommitInfo
}

func writeTitleMap(path string, titleMap *map[string]StoredCommicInfo) error {
	bytes, _ := json.Marshal(*titleMap)
	return ioutil.WriteFile(path, bytes, os.FileMode(0600))
}

func readTitleMap(path string) (map[string]StoredCommicInfo, error) {
	file, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var titleMap map[string]StoredCommicInfo
	err = json.Unmarshal(file, &titleMap)
	return titleMap, err
}
