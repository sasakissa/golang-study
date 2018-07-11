package weightconv

import "fmt"

type Pond float64
type Kilogram float64

func (p Pond) String() string     { return fmt.Sprintf("%gPond", p) }
func (k Kilogram) String() string { return fmt.Sprintf("%gkg", k) }

func KToP(k Kilogram) Pond { return Pond(k * 2.20462) }
func PToK(p Pond) Kilogram { return Kilogram(p / 2.2046) }
