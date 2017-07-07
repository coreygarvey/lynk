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

	

	// Create new account 
	/*
	var addr = ethCreateAccount("password");
	console.log("New Address!");
	console.log(addr);
	*/

	// Store and print accounts
	var accounts = ethStoreAccounts();
	var fromAddr = accounts[0];
	var fromPass = "password";
	var toAddr = accounts[1];



	var balance = ethGetBalance(fromAddr);
	console.log("balance: " + balance.toString());

	var filename = 'bigCube.stl';
	//ethSendTransaction(fromAddr, fromPass, toAddr, filename);

});