var sjcl = require('../node_modules/sjcl/sjcl.js')

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
		result = web3.eth.sendTransaction(transactionObject);
		console.log(result);

	}
	return result;
}