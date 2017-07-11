var sjcl = require('../node_modules/sjcl/sjcl.js')
var ethUtil = require('../node_modules/ethereumjs-util')



// define the web3 object
var Web3 = require('web3');
if(typeof web3 === 'undefined'){
	web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}



// create account and return address
ethCreateAccount = function ethCreateAccount(password) {
  // password 'password' by default
  password = password || "password";
  var myAdrr = web3.personal.newAccount(password);
  return myAdrr;
}

// get balance for account
ethGetBalance = function ethGetBalance(address) {
	var myBalance = web3.fromWei(web3.eth.getBalance(address), "ether")
	return myBalance;	
}

getFileOutput = function getFileOutput(filename){
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
ethSignFile = function ethSignFile(address, password, hashedFile, file_output) {
	var address = address;
	var password = password;
	// Unlock account
	//web3.personal.unlockAccount(address, password);
	
	// Sign file hash
	var msg = new Buffer(hashedFile);
	var signedData = web3.eth.sign(address, '0x' + msg.toString('hex'));

	// Sign file output
	var msg2 = new Buffer(file_output);
	var signedData2 = web3.eth.sign(address, '0x' + msg2.toString('hex'));

	return signedData2;	
}

// Verify signature
ethVerifySig = function ethVerifySig(signature, hashedFile, file_output){
	//var r = "0x" + signature.slice(0, 64); 
	//var s = "0x" + signature.slice(64, 128); 
	//var v = "28;
	var signatureHex = "0x" + signature;
	var res = ethUtil.fromRpcSig(signatureHex);
	
	// Sign file hash
	var prefix = new Buffer("\x19Ethereum Signed Message:\n");
	var msg = new Buffer(hashedFile);
	var prefixedMsg = ethUtil.sha3(
	  Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
	);
	var pubKey  = ethUtil.ecrecover(prefixedMsg, res.v, res.r, res.s);
	var addrBuf = ethUtil.pubToAddress(pubKey);
	var resultingAddr = ethUtil.bufferToHex(addrBuf);
	console.log("hashed file: ");
	console.log(web3.eth.accounts[0],  resultingAddr);

	// Sign file output
	var msg2 = new Buffer(file_output);
	var prefixedMsg2 = ethUtil.sha3(
	  Buffer.concat([prefix, new Buffer(String(msg2.length)), msg2])
	);
	var pubKey2  = ethUtil.ecrecover(prefixedMsg2, res.v, res.r, res.s);
	var addrBuf2 = ethUtil.pubToAddress(pubKey2);
	var resultingAddr2 = ethUtil.bufferToHex(addrBuf2);
	console.log("file_output: ");
	console.log(web3.eth.accounts[0],  resultingAddr2);


	return resultingAddr;
}



// Store accounts into new array
ethStoreAccounts = function ethStoreAccounts() {
	var accounts = web3.eth.accounts;
	console.log("here are the account numbers: ");
	for(i=0; i<accounts.length; i++){
		console.log(accounts[i])
	}
	return accounts;
}


// Send transaction from account 1 to account 2
ethSendTransaction = function ethSendTransaction(fromAddr, fromPass, toAddr, filename){
	var fromAddress = fromAddr;
	var fromPassword = fromPass;	
	var toAddress = toAddr;	
	web3.personal.unlockAccount(fromAddress, fromPassword);

	if(web3.fromWei(web3.eth.getBalance(fromAddress), "ether")<0.03) {
		console.log('BalanceError');
		return false;
	} else {
		// Create signature
		const data = Assets.getText(filename);
		var hex_output = '';
		for (var i = 0, l = data.length; i < l; i++){
			hex_output += data[i].charCodeAt(0).toString(16) + ' ';
	  	}
	  	console.log(hex_output);

	  	// Hash the file
		var hash_bit_array = sjcl.hash.sha256.hash(hex_output);
		var hash_hex = sjcl.codec.hex.fromBits(hash_bit_array);  
		console.log("File hash: ");
		console.log(hash_hex);

		// Encrypt and Decrypt the hash with a password
		var cryptoPassword = "cryptoPassword";
		var encrypted = sjcl.encrypt(cryptoPassword, hash_hex);
		// var decrypted = sjcl.decrypt(encrypted);

		console.log("Encrypted hash: ");
	  	var parsedMessage = JSON.parse(encrypted);
	  	var ciphertext = parsedMessage["ct"];
	  	var cipher_hex = '0x';
	  	var hex_digit;
	  	for (var i = 0, l = ciphertext.length; i < l; i++){
			hex_digit = ciphertext.charCodeAt(i).toString(16);
			cipher_hex += hex_digit;
	  	}
	  	console.log("cipher_hex");
  		console.log(cipher_hex);

  		// Create and send transaction with data
  		var transactionObject = {
			from: fromAddress,
			to: toAddress,
			data: cipher_hex,
		};	
		var result;
		//result = web3.eth.sendTransaction(transactionObject);
		console.log(result);

	}
	return result;
}