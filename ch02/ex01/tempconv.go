// tempconvパッケージは摂氏と華氏の温度計算を行います

package tempconv

import "fmt"

type Celsius float64
type Fahrengeit float64
type Kelvin float64

const (
	AbsolluteZeroC Celsius = -273.15
	FreezingC      Celsius = 0
	BoilingC       Celsius = 100
)

func (c Celsius) String() string    { return fmt.Sprintf("%gC", c) }
func (f Fahrengeit) String() string { return fmt.Sprintf("%gF", f) }
func (k Kelvin) String() string     { return fmt.Sprintf("%gK", k) }
