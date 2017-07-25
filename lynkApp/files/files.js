getFileOutput = function getFileOutput(filename){
	// Output file from filename
	var filename = filename;
	const data = Assets.getText(filename);
	var file_output;
	for (var i = 0, l = data.length; i < l; i++){
		file_output += data[i];
	}
	return file_output;
}

getHexFileOutput = function getFileOutput(filename){
	// Output file from filename
	var filename = filename;
	const data = Assets.getText(filename);
	var file_output = '0x';
	for (var i = 0, l = data.length; i < l; i++){
		file_output += data[i].charCodeAt(0).toString(16);
	}
	return file_output;
}
/*
prependTestResults = function getFileOutput(filename, testResults){
	// Output file from filename
	var filename = filename;
	const data = Assets.getText(filename);
	var file_output = '0x';
	for (var i = 0, l = data.length; i < l; i++){
		file_output += data[i].charCodeAt(0).toString(16);
	}
	return file_output;
}
*/

/* Testing metadata within STL file */
getHexLynkFileOutput = function getFileOutput(filename){
	// Output file from filename
	var filename = filename;
	var filenameLength = filename.length;
	if(filename[filenameLength - 1] == 'Y'){
		console.log("Lynk file!");
	}
	const data = Assets.getText(filename);
	var file_hash = '0x';
	for (var i = 0, l = 16; i < l; i++){
		file_hash += data[i].charCodeAt(0).toString(16);
	}
	console.log("file_hash: ")
	console.log(file_hash)
	var file_output = '0x';
	for (var i = 16, l = data.length; i < l; i++){
		file_output += data[i].charCodeAt(0).toString(16);
	}
	return file_output;
}

hashFile = function hashFile(file_output) {
	// Hash file output
	var hashedFile = web3.sha3(file_output);

	return hashedFile;
}