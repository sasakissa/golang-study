package lengthconv

import (
	"fmt"
)

type Feet float64
type Meter float64

func (f Feet) String() string  { return fmt.Sprintf("%gFeet", f) }
func (m Meter) String() string { return fmt.Sprintf("%gMeter", m) }

func FToM(f Feet) Meter { return Meter(0.3048 * f) }
func MToF(m Meter) Feet { return Feet(m / 0.3948) }
