#!/bin/sh
arg="a "
for i in `seq 1 10`
do
    arg=${arg}${arg}
done

go run ex1-3.go ${arg}