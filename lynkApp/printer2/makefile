printer: main.o printer.o
	g++ -Wall main.o printer.o -o printer

main.o: main.cpp printer.h
	g++ -c main.cpp -o main.o

printer.o: printer.cpp printer.h
	g++ -c printer.cpp -o printer.o
