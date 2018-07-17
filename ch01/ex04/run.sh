> test01.txt
> test02.txt
animals=("dog" "cat" "lion" "tiger" "bunny" "python" "hourse")
for i in `seq 0 5`
do 
    echo "I like" ${animals[$i]} >> test01.txt
    if [ $(($i % 2)) = 0 ]; then
       echo "I like" ${animals[$i]} >> test02.txt 
    fi
done
go run ex1-4.go test01.txt test02.txt