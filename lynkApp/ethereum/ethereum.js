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

// Verify signature
ethVerifySig = function ethVerifySig(signature, hashedFile){
	//var r = "0x" + signature.slice(0, 64); 
	//var s = "0x" + signature.slice(64, 128); 
	//var v = "28;
	
	var res = ethUtil.fromRpcSig(signature);
	
	// Sign file hash
	var prefix = new Buffer("\x19Ethereum Signed Message:\n");
	var msg = new Buffer(hashedFile);
	var prefixedMsg = ethUtil.sha3(
	  Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
	);
	var pubKey  = ethUtil.ecrecover(prefixedMsg, res.v, res.r, res.s);
	var addrBuf = ethUtil.pubToAddress(pubKey);
	var resultingAddr = ethUtil.bufferToHex(addrBuf);
	//console.log("hashed file: ");
	//console.log(web3.eth.accounts[0],  resultingAddr);

	// Sign file output
	/*
	var msg2 = new Buffer(file_output);
	var prefixedMsg2 = ethUtil.sha3(
	  Buffer.concat([prefix, new Buffer(String(msg2.length)), msg2])
	);
	var pubKey2  = ethUtil.ecrecover(prefixedMsg2, res.v, res.r, res.s);
	var addrBuf2 = ethUtil.pubToAddress(pubKey2);
	var resultingAddr2 = ethUtil.bufferToHex(addrBuf2);
	*/
	//console.log("file_output: ");
	//console.log(web3.eth.accounts[0],  resultingAddr2);


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






var projectContractAbi = web3.eth.contract([{"constant":true,"inputs":[{"name":"signature","type":"string"}],"name":"getDetails","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"versions","outputs":[{"name":"hash","type":"bytes32"},{"name":"signature","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"},{"name":"signature","type":"string"}],"name":"commitVersion","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"signature","type":"string"}],"name":"getTemplate","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"signature","type":"string"}],"name":"getTests","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"signature","type":"string"}],"name":"returnHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"projectFiles","outputs":[{"name":"hash","type":"bytes32"},{"name":"signature","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"},{"name":"templateSig","type":"string"}],"name":"setTemplate","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"},{"name":"detailsSig","type":"string"}],"name":"setDetails","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"},{"name":"testsSig","type":"string"}],"name":"setTests","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]);

// Create smart contract
ethCreateSmartContract = function ethCreateSmartContract(ownerAddress, ownerPassword, _callback){

  //web3.personal.unlockAccount(ownerAddress, ownerPassword);

  var project_contract = projectContractAbi.new(
     {
       from: web3.eth.accounts[0],
       data: '6060604052341561000f57600080fd5b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6111ea806100616000396000f300606060405236156100ad576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631328fd8f146100b257806349f59f301461012b578063799575d1146102125780637d67cd6f1461027c5780638da5cb5b146102f557806399c28bf81461034a578063cc26f99f146103c3578063cffb6ac41461043c578063d60a206f1461050d578063e45a96f214610577578063f80e66e2146105e1575b600080fd5b34156100bd57600080fd5b61010d600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061064b565b60405180826000191660001916815260200191505060405180910390f35b341561013657600080fd5b61016b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506107bb565b604051808360001916600019168152602001806020018281038252838181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102025780601f106101d757610100808354040283529160200191610202565b820191906000526020600020905b8154815290600101906020018083116101e557829003601f168201915b5050935050505060405180910390f35b341561021d57600080fd5b61027a60048080356000191690602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506107fb565b005b341561028757600080fd5b6102d7600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506108b0565b60405180826000191660001916815260200191505060405180910390f35b341561030057600080fd5b610308610a1e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561035557600080fd5b6103a5600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610a43565b60405180826000191660001916815260200191505060405180910390f35b34156103ce57600080fd5b61041e600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610bb1565b60405180826000191660001916815260200191505060405180910390f35b341561044757600080fd5b6104666004808035906020019091908035906020019091905050610d77565b604051808360001916600019168152602001806020018281038252838181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156104fd5780601f106104d2576101008083540402835291602001916104fd565b820191906000526020600020905b8154815290600101906020018083116104e057829003601f168201915b5050935050505060405180910390f35b341561051857600080fd5b61057560048080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610db7565b005b341561058257600080fd5b6105df60048080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610e9c565b005b34156105ec57600080fd5b61064960048080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610f82565b005b60008060008060006001600060018152602001908152602001600020805490509350600092505b838310156107aa5760016000600181526020019081526020016000208381548110151561069b57fe5b906000526020600020906002020160005b509150856040518082805190602001908083835b6020831015156106e657805182525b6020820191506020810190506020830392506106c0565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040518091039020600019168260010160405180828054600181600116156101000203166002900480156107765780601f10610754576101008083540402835291820191610776565b820191906000526020600020905b815481529060010190602001808311610762575b5050915050604051809103902060001916141561079c57816000015490508094506107b2565b5b8280600101935050610672565b600060010294505b50505050919050565b6002602052816000526040600020818154811015156107d657fe5b906000526020600020906002020160005b915091505080600001549080600101905082565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480600101828161084c9190611068565b916000526020600020906002020160005b6040805190810160405280866000191681526020018581525090919091506000820151816000019060001916905560208201518160010190805190602001906108a792919061109a565b505050505b5050565b600080600080600060016000808152602001908152602001600020805490509350600092505b83831015610a0d5760016000808152602001908152602001600020838154811015156108fe57fe5b906000526020600020906002020160005b509150856040518082805190602001908083835b60208310151561094957805182525b602082019150602081019050602083039250610923565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040518091039020600019168260010160405180828054600181600116156101000203166002900480156109d95780601f106109b75761010080835404028352918201916109d9565b820191906000526020600020905b8154815290600101906020018083116109c5575b505091505060405180910390206000191614156109ff5781600001549050809450610a15565b5b82806001019350506108d6565b600060010294505b50505050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600080600060016000808152602001908152602001600020805490509350600092505b83831015610ba0576001600080815260200190815260200160002083815481101515610a9157fe5b906000526020600020906002020160005b509150856040518082805190602001908083835b602083101515610adc57805182525b602082019150602081019050602083039250610ab6565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902060001916826001016040518082805460018160011615610100020316600290048015610b6c5780601f10610b4a576101008083540402835291820191610b6c565b820191906000526020600020905b815481529060010190602001808311610b58575b50509150506040518091039020600019161415610b925781600001549050809450610ba8565b5b8280600101935050610a69565b600060010294505b50505050919050565b6000806000806000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490509350600092505b83831015610d6657600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002083815481101515610c5757fe5b906000526020600020906002020160005b509150856040518082805190602001908083835b602083101515610ca257805182525b602082019150602081019050602083039250610c7c565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902060001916826001016040518082805460018160011615610100020316600290048015610d325780601f10610d10576101008083540402835291820191610d32565b820191906000526020600020905b815481529060010190602001808311610d1e575b50509150506040518091039020600019161415610d585781600001549050809450610d6e565b5b8280600101935050610c03565b600060010294505b50505050919050565b600160205281600052604060002081815481101515610d9257fe5b906000526020600020906002020160005b915091505080600001549080600101905082565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e1257600080fd5b600160008081526020019081526020016000208054806001018281610e379190611068565b916000526020600020906002020160005b604080519081016040528086600019168152602001858152509091909150600082015181600001906000191690556020820151816001019080519060200190610e9292919061109a565b505050505b5b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ef757600080fd5b60016000600181526020019081526020016000208054806001018281610f1d9190611068565b916000526020600020906002020160005b604080519081016040528086600019168152602001858152509091909150600082015181600001906000191690556020820151816001019080519060200190610f7892919061109a565b505050505b5b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610fdd57600080fd5b600160006002815260200190815260200160002080548060010182816110039190611068565b916000526020600020906002020160005b60408051908101604052808660001916815260200185815250909190915060008201518160000190600019169055602082015181600101908051906020019061105e92919061109a565b505050505b5b5050565b81548183558181151161109557600202816002028360005260206000209182019101611094919061111a565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106110db57805160ff1916838001178555611109565b82800160010185558215611109579182015b828111156111085782518255916020019190600101906110ed565b5b5090506111169190611151565b5090565b61114e91905b8082111561114a576000808201600090556001820160006111419190611176565b50600201611120565b5090565b90565b61117391905b8082111561116f576000816000905550600101611157565b5090565b90565b50805460018160011615610100020316600290046000825580601f1061119c57506111bb565b601f0160209004906000526020600020908101906111ba9190611151565b5b505600a165627a7a72305820a795708e491600e475bed113c017204a2a3fc32b89e7ca75ac7aef9ce1e066720029',
       gas: '4700000'
     }, function (e, contract){
      console.log(e, contract);
      if (typeof contract.address !== 'undefined') {
          console.log('project contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        console.log(contract.address);
        _callback(contract.address);
      }
   });

}


// Set project template/details/tests
ethSetProjectTemplate = function ethSetProjectTemplate(contractAddress, ownerAddress, ownerPassword, templateHash, templateSig){
  web3.eth.defaultAccount=ownerAddress;
  var targetContract = projectContractAbi.at(contractAddress);
  //web3.personal.unlockAccount(ownerAddress, ownerPassword);

  var transactionHash = targetContract.setTemplate(templateHash, templateSig, {gas: 250000})
  
  return transactionHash;
}


ethGetProjectTemplate = function ethGetProjectTemplate(contractAddress, fromAddress, fromPassword, templateSig){
  var targetContract = projectContractAbi.at(contractAddress);
  //web3.personal.unlockAccount(fromAddress, fromPassword);

  var templateHash = targetContract.getTemplate(templateSig)
  
  return templateHash;
}

// Set project template/details/tests
ethSetProjectDetails = function ethSetProjectDetails(contractAddress, ownerAddress, ownerPassword, detailsHash, detailsSig){
  web3.eth.defaultAccount=ownerAddress;
  var targetContract = projectContractAbi.at(contractAddress);
  //web3.personal.unlockAccount(ownerAddress, ownerPassword);

  var transactionHash = targetContract.setDetails(detailsHash, detailsSig, {gas: 250000})
  
  return transactionHash;
}


ethGetProjectDetails = function ethGetProjectDetails(contractAddress, fromAddress, fromPassword, detailsSig){
  var targetContract = projectContractAbi.at(contractAddress);
  //web3.personal.unlockAccount(fromAddress, fromPassword);

  var detailsHash = targetContract.getDetails(detailsSig)
  
  return detailsHash;
}

// Set project template/details/tests
ethSetProjectTests = function ethSetProjectTests(contractAddress, ownerAddress, ownerPassword, testsHash, testsSig){
  web3.eth.defaultAccount=ownerAddress;
  var targetContract = projectContractAbi.at(contractAddress);
  //web3.personal.unlockAccount(ownerAddress, ownerPassword);

  var transactionHash = targetContract.setTests(testsHash, testsSig, {gas: 250000})
  
  return transactionHash;
}


ethGetProjectTests = function ethGetProjectTemplate(contractAddress, fromAddress, fromPassword, testsSig){
  var targetContract = projectContractAbi.at(contractAddress);
  //web3.personal.unlockAccount(fromAddress, fromPassword);

  var testsHash = targetContract.getTests(testsSig)
  
  return testsHash;
}


ethCommitVersion = function ethCommitVersion(contractAddress, fromAddress, templateHash, templateSig){
  web3.eth.defaultAccount=fromAddress;
  var targetContract = projectContractAbi.at(contractAddress);
  //web3.personal.unlockAccount(ownerAddress, ownerPassword);

  targetContract.commitVersion(templateHash, templateSig, {gas: 250000});

  return;
}


ethGetVersionHash = function ethGetVersionHash(contractAddress, versionSig){
  web3.eth.defaultAccount="0x5013c0feb14eb8ae13a4e24c85f3c07c9a118984";
  var targetContract = projectContractAbi.at(contractAddress);
  //web3.personal.unlockAccount(ownerAddress, ownerPassword);

  var versionHash = targetContract.returnHash(versionSig);

  return versionHash;
}


ethGetOwnerAddress = function ethGetOwnerAddress(contractAddress){
  var targetContract = projectContractAbi.at(contractAddress);
  //web3.personal.unlockAccount(ownerAddress, ownerPassword);

  return targetContract.owner();
}

