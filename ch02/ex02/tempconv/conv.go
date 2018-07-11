package tempconv

func CToF(c Celsius) Fahrengeit { return Fahrengeit(c*9/5 + 32) }
func FToC(f Fahrengeit) Celsius { return Celsius((f - 32) * 5 / 9) }
func CToK(c Celsius) Kelvin     { return Kelvin(c + 273.15) }
func KToC(k Kelvin) Celsius     { return Celsius(k - 273.15) }
func FToK(f Fahrengeit) Kelvin  { return CToK(FToC(f)) }
func KToF(k Kelvin) Fahrengeit  { return CToF(KToC(k)) }
