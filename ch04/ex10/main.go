package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"./github"
)

func main() {
	result, err := github.SearchIssues(os.Args[1:])
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%d issues:\n", result.TotalCount)
	lessThanMonthBox := []github.Issue{}
	lessThanYearBox := []github.Issue{}
	MoreThanYearBox := []github.Issue{}

	monthAgo := time.Now().AddDate(0, -1, 0)
	yearAgo := time.Now().AddDate(-1, 0, 0)
	for _, item := range result.Items {

		if monthAgo.Before(item.CreatedAt) {
			lessThanMonthBox = append(lessThanMonthBox, *item)
		} else if yearAgo.Before(item.CreatedAt) {
			lessThanYearBox = append(lessThanYearBox, *item)
		} else {
			MoreThanYearBox = append(MoreThanYearBox, *item)
		}
	}

	fmt.Println("Created at less than 1 month ago")

	for _, item := range lessThanMonthBox {
		fmt.Printf("#%-5d %9.9s %s %.55s\n",
			item.Number, item.User.Login, item.CreatedAt, item.Title)
	}

	fmt.Println("Created at less than 1 year ago")

	for _, item := range lessThanYearBox {
		fmt.Printf("#%-5d %9.9s %s %.55s\n",
			item.Number, item.User.Login, item.CreatedAt, item.Title)
	}

	fmt.Println("Created at over 1 year ago")

	for _, item := range MoreThanYearBox {
		fmt.Printf("#%-5d %9.9s %s %.55s\n",
			item.Number, item.User.Login, item.CreatedAt, item.Title)
	}

}
