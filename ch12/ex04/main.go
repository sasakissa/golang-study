package main

import (
	"bytes"
	"fmt"
	"reflect"
	"strings"
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

	// Encode it
	data, _ := Marshal(strangelove)
	fmt.Println(string(data))
}

type printer struct {
	buf    bytes.Buffer
	indent int
	stack  []int
}

func (p *printer) Push(indent int) {
	p.stack = append(p.stack, indent)
	p.indent += indent
}

func (p *printer) Pop() {
	last := p.stack[len(p.stack)-1]
	p.stack = p.stack[:len(p.stack)-1]
	p.indent -= last
}

func (p *printer) PrintIndent() {
	p.buf.WriteString(strings.Repeat(" ", p.indent))
}

func (p *printer) Print(s string) {
	p.buf.WriteString(s)
}

//!+Marshal
// Marshal encodes a Go value in S-expression form.
func Marshal(v interface{}) ([]byte, error) {
	var buf bytes.Buffer
	p := printer{buf, 0, []int{}}
	if err := encodeIndent(&p, reflect.ValueOf(v)); err != nil {
		return nil, err
	}
	return p.buf.Bytes(), nil
}

//!-Marshal

// encode writes to buf an S-expression representation of v.
//!+encode
func encodeIndent(p *printer, v reflect.Value) error {
	switch v.Kind() {
	case reflect.Invalid:
		p.Print("nil")

	case reflect.Int, reflect.Int8, reflect.Int16,
		reflect.Int32, reflect.Int64:
		p.Print(fmt.Sprintf("%d", v.Int()))

	case reflect.Uint, reflect.Uint8, reflect.Uint16,
		reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		p.Print(fmt.Sprintf("%d", v.Uint()))

	case reflect.String:
		p.Print(fmt.Sprintf("%q", v.String()))

	case reflect.Ptr:
		// return encode(buf, v.Elem())

	case reflect.Array, reflect.Slice: // (value ...)
		p.Print("(")
		p.Push(1)
		for i := 0; i < v.Len(); i++ {
			if i > 0 {
				p.Print("\n")
				p.PrintIndent()
			}
			if err := encodeIndent(p, v.Index(i)); err != nil {
				return err
			}
		}
		p.Print(")")
		p.Pop()
	case reflect.Struct: // ((name value) ...)
		p.Print("(")
		p.Push(1)
		for i := 0; i < v.NumField(); i++ {
			if i > 0 {
				p.Print("\n")
				p.PrintIndent()
			}
			p.Push(len(fmt.Sprintf("(%s ", v.Type().Field(i).Name)))
			p.Print(fmt.Sprintf("(%s ", v.Type().Field(i).Name))
			if err := encodeIndent(p, v.Field(i)); err != nil {
				return err
			}
			p.Print(")")
			p.Pop()
		}
		p.Print(")")
		p.Pop()

	case reflect.Map: // ((key value) ...)
		p.Print("(")
		p.Push(1)
		for i, key := range v.MapKeys() {
			if i > 0 {
				p.Print("\n")
				p.PrintIndent()
			}
			p.Print("(")
			if err := encodeIndent(p, key); err != nil {
				return err
			}
			if err := encodeIndent(p, v.MapIndex(key)); err != nil {
				return err
			}
			p.Print(")")
		}
		p.Print(")")
		p.Pop()

	case reflect.Bool:
		if v.Bool() {
			p.Print("t")
		} else {
			p.Print("nil")
		}
	case reflect.Float32, reflect.Float64:
		p.Print(fmt.Sprintf("%g", v.Float()))

	case reflect.Complex64, reflect.Complex128:
		c := v.Complex()
		p.Print(fmt.Sprintf("#C(%g, %g)", real(c), imag(c)))

	case reflect.Interface:
		str := fmt.Sprintf("(%q", reflect.Indirect(v).Type())
		p.Print(str)
		p.Push(len(str))
		encodeIndent(p, reflect.Indirect(v).Elem())
		p.Pop()
		p.Print(")")

	default: // float, complex, bool, chan, func, interface
		return fmt.Errorf("unsupported type: %s", v.Type())
	}
	return nil
}
