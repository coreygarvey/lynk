/* Lynk printer */

/* Corey Garvey
 * Last Updated June 29 2017
 */

#include <iostream>
#include <fstream>
#include <cstring>
#include "printer.h"
using namespace std;

/* Function to print file from filename */
bool print_file(const char* filename){
    cout << "Printing from file '" << filename << "'" << endl;
    
    ifstream in_stream;

    /* Open input file, convert to hex, output */
    in_stream.open(filename);
    
    char character;
    int digit;
   
    in_stream >> character;
    //int count = 0;
    while(!in_stream.eof()){
        //count = count + 1;
        //cout << " The count is: " << dec << count << endl;
        cout << hex << int(character) << " ";
        in_stream >> character;
    }
    
    cout << endl;
    in_stream.close();
    //cout << "The count is: " << dec << count << endl;
    return true;
}
