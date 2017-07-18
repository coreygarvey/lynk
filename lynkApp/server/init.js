import '../ethereum/ethereum.js';

Meteor.startup(function () {
	// Print File with C++ process
	/*
	const { spawn } = require('child_process');
	const ls = spawn('/Users/coreygarvey/Documents/lynk/printer/printer', ['/Users/coreygarvey/Documents/lynk/printer/bigCube.stl']);
	ls.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});
	ls.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});
	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});
	*/

	var originalFile = "bigCube.stl";
	var originalOutput = getHexFileOutput(originalFile);
	var lynkFile = "bigCube.stlY";
	var lynkOutput = getHexLynkFileOutput(lynkFile);

	console.log("originalOutput: ")
	console.log(originalOutput)
	console.log("lynkOutput: ")
	console.log(lynkOutput)



	

	// Create new account 
	/*
	var addr = ethCreateAccount("password");
	console.log("New Address!");
	console.log(addr);
	
	
	// Store and print accounts
	var accounts = ethStoreAccounts();
	var fromAddr = accounts[0];
	var fromPass = "password";
	var toAddr = accounts[1];
	var balance = ethGetBalance(fromAddr);
	console.log("balance: " + balance.toString());
*/	
/*
	// Create Contract
	
	var contract = ethCreateSmartContract(fromAddr,fromPass, 
          function(_contractAddress) {
            contractAddress = _contractAddress;
            Meteor.settings.contractAddress = contractAddress;
            // Must store contract address for use in setting student amount
    });

	console.log(contract);
	
    console.log("contractAddress: " + contractAddress);



	// Owner uploads template, details, tests
	
	// Defile files
	var templateName = 'template.stl';
	var detailsName = 'details.txt';
	var testsName = 'tests.txt';
	
	// Open files and hash with web3.sha3()
	var templateOutput = getHexFileOutput(templateName);
	var templateHash = hashFile(templateOutput);
	console.log("templateHash: " + templateOutput);
	
	var detailsOutput = getFileOutput(detailsName);
	var detailsHash = hashFile(detailsOutput);
	console.log("detailsOutput: " + detailsOutput);
	console.log("detailsHash: " + detailsHash);
	
	var testsOutput = getFileOutput(testsName);
	var testsHash = hashFile(testsOutput);
	console.log("testsOutput: " + testsOutput);
	console.log("testsHash: " + testsHash);

	// Sign files
	var templateSig = ethSignFile(fromAddr, fromPass, templateHash);

	var detailsSig = ethSignFile(fromAddr, fromPass, detailsHash);

	var testsSig = ethSignFile(fromAddr, fromPass, testsHash);


	var contractAddress = "0x42ae83f7509be447d48185dcaa528f1dc8e2fbb2";
    
	var versionName = 'version1.stl';
	var versionOutput = getHexFileOutput(versionName);
	var versionHash = hashFile(versionOutput);
	var versionSig = ethSignFile(fromAddr, fromPass, versionHash);
*/

    /*
	// Setting values below

    var setTemplateTxn = ethSetProjectTemplate(contractAddress, fromAddr, fromPass, templateHash, templateSig);
    console.log("setTemplateTxn: " + setTemplateTxn);

    var setDetailsTxn = ethSetProjectDetails(contractAddress, fromAddr, fromPass, detailsHash, detailsSig);
    console.log("setDetailsTxn: " + setDetailsTxn);

    var setTestsTxn = ethSetProjectTests(contractAddress, fromAddr, fromPass, testsHash, testsSig);
    console.log("setTestsTxn: " + setTestsTxn);


	


	ethCommitVersion(contractAddress, fromAddr, versionHash, versionSig);


	*/



	// Getting values below

/*
	var templateBCHash = ethGetProjectTemplate(contractAddress, fromAddr, fromPass, templateSig);
	console.log("templateBCHash: " + templateBCHash);

	var detailsBCHash = ethGetProjectDetails(contractAddress, fromAddr, fromPass, detailsSig);
	console.log("detailsBCHash: " + detailsBCHash);

	var testsBCHash = ethGetProjectTests(contractAddress, fromAddr, fromPass, testsSig);
	console.log("testsBCHash: " + testsBCHash);

	var versionBCHash = ethGetVersionHash(contractAddress, versionSig);
	console.log("version hash: " + versionHash);
	

	var ownerAddress = ethGetOwnerAddress(contractAddress);
	console.log("ownerAddress:" + ownerAddress);
	
	
	var sigAddress = ethVerifySig(versionSig, versionHash);
	console.log("sigAddress: " + sigAddress);

*/



});