package popcount

var pc [256]byte

func init() {
	// 8bitの取りうる全ての値のpopulation countを準備している
	for i := range pc {
		pc[i] = pc[i/2] + byte(i&1)
	}
}

func PopCount(x uint64) int {
	return int(pc[byte(x>>(0*8))] +
		pc[byte(x>>(1*8))] +
		pc[byte(x>>(2*8))] +
		pc[byte(x>>(3*8))] +
		pc[byte(x>>(4*8))] +
		pc[byte(x>>(5*8))] +
		pc[byte(x>>(6*8))] +
		pc[byte(x>>(7*8))])
}

// ex2-3
func PopCountByLoop(x uint64) int {
	count := 0
	for i := 0; i < 9; i++ {
		count += int(pc[byte(x>>(uint(i*8)))])
	}
	return count
}

// ex2-4
func PopCountByShift(x uint64) int {
	count := 0
	for i := 0; i < 64; i++ {
		if x>>uint(i)&1 == 1 {
			count += 1
		}
	}
	return count
}

// ex2-5
func PopCountByClearLowestBit(x uint64) int {
	count := 0
	current := x
	for current > 0 {
		current = current & (current - 1)
		count += 1
	}
	return count
}
