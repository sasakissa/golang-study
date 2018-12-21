package main

import (
	"fmt"

	"./sexpr"
)

func main() {
	type Movie struct {
		Title, Subtitle string
		Year            int
		Actor           map[string]string
		Oscars          []string
		Sequel          *string
	}
	strangelove := Movie{
		Title:    "Dr. Strangelove",
		Subtitle: "How I Learned to Stop Worrying and Love the Bomb",
		Year:     1964,
		Actor: map[string]string{
			"Dr. Strangelove":            "Peter Sellers",
			"Grp. Capt. Lionel Mandrake": "Peter Sellers",
			"Pres. Merkin Muffley":       "Peter Sellers",
			"Gen. Buck Turgidson":        "George C. Scott",
			"Brig. Gen. Jack D. Ripper":  "Sterling Hayden",
			`Maj. T.J. "King" Kong`:      "Slim Pickens",
		},
		Oscars: []string{
			"Best Actor (Nomin.)",
			"Best Adapted Screenplay (Nomin.)",
			"Best Director (Nomin.)",
			"Best Picture (Nomin.)",
		},
	}

	data, err := sexpr.Marshal(strangelove)
	if err != nil {
		fmt.Errorf("Marshal failed: %v", err)
	}
	fmt.Println("Marshal() = ", string(data), "\n")

	var movie Movie
	if err := sexpr.Unmarshal(data, &movie); err != nil {
		fmt.Errorf("Unmarshal failed: %v", err)
	}
	fmt.Println("Unmarshal() = ", movie)
}
