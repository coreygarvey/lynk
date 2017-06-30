/* Lynk - Printer */

/* Corey Garvey
 * Last Edited 29 June 2017
 */

#include <iostream>
#include <cstring>
#include "printer.h"
#include "errors.h"

using namespace std;

int main(int argc, char** argv){

    if (argc == 1){
        cout << "Please enter a filename." << endl;
        return NO_FILENAME;
    }
    if (argc > 2) {
        cout << "Please enter only a filename." << endl;
        return TOO_MANY_PARAMS;
    }
    
    char** input_args = argv; 
    char* filename = input_args[1];


    bool print_status = print_file(filename);
    
    cout << "The file was ";
    if(!print_status){
        cout << "not ";
    }
    cout << "printed." << endl;

    return 0;
};
