printFile = function printFile(filename){
	console.log("filename");
	console.log(filename)
	var reader = new FileReader();
	reader.onload = function(e) {
	    var contents = e.target.result;
	    displayContents(contents);
	};
	reader.readAsText(file);
}

displayContents = function displayContents(content){
	console.log(content);
}

printFile("./bigCube.stl");


/*

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

hashFile = function hashFile(file_output) {
	// Hash file output
	var hashedFile = web3.sha3(file_output);

	return hashedFile;
}

// Sign file using account[0]
ethSignFile = function ethSignFile(address, password, hashedFile) {
	var address = address;
	var password = password;
	// Unlock account
	//web3.personal.unlockAccount(address, password);

	// Sign file hash
	var msg = new Buffer(hashedFile);
	console.log("signing: " + msg.toString('hex'));
	var signedData = web3.eth.sign(address, '0x' + msg.toString('hex'));

	// Sign file output
	//var msg2 = new Buffer(file_output);
	//var signedData2 = web3.eth.sign(address, '0x' + msg2.toString('hex'));

	return signedData;	
}
*/