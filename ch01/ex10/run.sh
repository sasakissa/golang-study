if [ ! -e ex1-10.txt ]; then
rm ex1-10.txt
fi
touch ex1-10.txt

if [ ! -e fist-content.txt ]; then
rm first-content.txt
fi
touch first-content.txt

if [ ! -e second-content.txt ]; then
rm second-content.txt
fi
touch second-content.txt

echo first time
go run ex1-10.go http://abehiroshi.la.coocan.jp/ first-content.txt

echo second time
go run ex1-10.go http://abehiroshi.la.coocan.jp/ second-content.txt
