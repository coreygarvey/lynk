import '../ethereum/ethereum.js';
import '../files/files.js';

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
	

	var originalFile = "bigCube.stl";
	var originalOutput = getHexFileOutput(originalFile);
	var lynkFile = "bigCube.stlY";
	var lynkOutput = getHexLynkFileOutput(lynkFile);

	console.log("originalOutput: ")
	console.log(originalOutput)
	console.log("lynkOutput: ")
	console.log(lynkOutput)
	*/

	/* START START START START START START START START START START */
	/* 

	MANGER MANGER MANGER MANGER MANGER MANGER
	=========================================
	*/

	/**** PREPARE ACCOUNTS ****/
	// Store all accounts in variable
	var accounts = ethStoreAccounts();
	var managerAddr = accounts[0];
	var managerPass = "password";
	var designerAddr = accounts[1];

	/**** CREATE PROJECT ****/
	// Remove all projects
	Projects.remove({});
	// Create Project Object (Owner Pub Key)
	var projectName = "Project 1";
	var description = "Designing a new piece for the widget";
	var managerId = 1;

	Projects.insert({
		name: project1,
		desc: description,
		creator: managerId,
		ownerPubKey: managerAddr
	});
	// So this line will return something
	var project1 = Projects.findOne({}, {
		sort: {
			createdAt: +1, 
			limit: 1
		}
	});
	console.log("Project creation: ");
	console.log(project1);


	/**** ADD ALL FILES TO PROJECT ****/
	// Upload Test Files (Hash and Store)
	var test1 = "tests1.txt";
	var test2 = "tests2.txt";
	var test1Output = getFileOutput(test1);
	var test1Hash = hashFile(test1Output);
	var test2Output = getFileOutput(test2);
	var test2Hash = hashFile(test2Output);
	//console.log("test1Hash: " + test1Hash);
	//console.log("test2Hash: " + test2Hash);

	// Store Files at hash!!!

	TestFiles.remove({});

	TestFiles.insert({
		hash: test1Hash,
		name: test1
	});
	TestFiles.insert({
		hash: test2Hash,
		name: test2
	});
	// Turn this into function, used later
	/*
	var test1Returned = TestFiles.findOne({hash: test1Hash});
	var test2Returned = TestFiles.findOne({hash: test2Hash});
	console.log("test1Returned: " + test1Returned.name);
	console.log("test2Returned: " + test2Returned.name);
	*/

	//Create Test Objects (Signature and Pub Key)
	var testHashes = [test1Hash, test2Hash];
	// Sign and store tests in project
	for(i=0; i<testHashes.length; i++) {
		var testName = "Test #" + (i+1);
		var testHash = testHashes[i];
		var testSig = ethSignFile(managerAddr, managerPass, testHash);
		Projects.update(project1._id, { 
			$push: { 
				tests: {
					name: testName,
					desc: "Just another test doc",
					signature: testSig,
					publicKey: managerAddr,
				}
			} 
		});
	}
	
	
	console.log("Project updated with tests: ");
	project1 = Projects.findOne({}, {
		sort: {
			createdAt: +1, 
			limit: 1
		}
	});
	console.log(project1);
	//Update Project with Test Objects
	

	/*
	Upload Template File (Hash and Store)
	Create Template Object (Signature and Pub Key)
	Update Project with Template Object

	Create Protocol File (Details, tests, results, printable)
	Upload Protocol File (Hash and Store)
	Create Protocol Object (Signature and Pub Key)
	Update Project with Protocol Object

	Create Contract on BC
	Update Test Files, Template, Protocol with proper details

	
	DESIGNER DESIGNER DESIGNER DESIGNER DESIGNER 
	============================================
	Get Template Hash from BC using Project ID
	Confirm Owner Signed
	Get File
	Confirm Hash is of File

	Edit Template and Resave
	Upload new version file
	Store in temporary location
	Store location in project object

	
	Get Protocol from BC
	Confirm Owner Signed
	Get File
	Confirm Hash is of File
	Indicate protocol tests to test
	
	Get necessary test files from DB
	Test new version against test files

	Store "protocol-test:result" as metadata on file
	Hash and store file

	Create version object in DB (sig and pub key)

	Store tests passed, printable status in version object

	Store signed version on contract


	Print version object details (tests passed, printable, sig, pub key)

	MANGER MANGER MANGER MANGER MANGER MANGER
	=========================================
	Get latest version from Project object

	Retrieve version hash from BC
	Confirm Owner Signed
	Get File
	Confirm Hash is of File

	Get version file
	If printable in metadata: print file
	
	*/ 
	/* END END END END END END END END END END END END END END END END END END END */



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