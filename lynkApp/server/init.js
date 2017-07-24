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
	var projectDescription = "Designing a new piece for the widget";
	var managerId = 1;
	createProject(projectName, projectDescription, managerId, managerAddr);

	/**** ADD ALL FILES TO PROJECT ****/
	
	/* TEST FILES */
	// Upload Test Files (Hash and Store)
	var test1 = "tests1.txt";
	var test2 = "tests2.txt";
	// Remove all files
	TestFiles.remove({});
	uploadFile(test1, false);
	uploadFile(test2, false);
	//Update Project with Test Objects
	//Create Test Objects (Signature and Pub Key)
	var testFilenames = [test1, test2];
	// Sign and store tests in project
	for(i=0; i<testFilenames.length; i++) {
		var testName = "Test #" + (i+1);
		var testDesc = "Here we go, test #" + (i+1);
		var testFilename = testFilenames[i];
		

		addTestToProject(project1, testName, testDesc, testFilename, managerAddr, managerPass);
	}

	/* TEMPLATE FILE */
	// Upload Template File (Hash and Store)
	var template1 = "template1.stl";
	uploadFile(template1, true);
	
	var template1Name = "Template #1"
	var template1Desc= "First template file for project";
	
	addTemplateToProject(project1, template1Name, template1Desc, template1, managerAddr, managerPass);
	

	console.log("Project updated with template: ");
	project1 = Projects.findOne({}, {
		sort: {
			createdAt: +1, 
			limit: 1
		}
	});
	console.log(project1);


	/* PROTOCOL FILE */
	var protocol1 = "protocol1.txt";
	uploadFile(protocol1, false);
	var protocol1Name = "Protocol #1"	
	var protocol1Desc=  "First protocol file for project"

	addProtocolToProject(project1, protocol1Name, protocol1Desc, protocol1, managerAddr, managerPass);

	/* BLOCKCHAIN BLOCKCHAIN BLOCKCHAIN BLOCKCHAIN */
	//Create Contract on BC
	createContract(project1, managerAddr, managerPass);

	//Update Contract with details from Test Files, Template, Protocol
	templateSet = Meteor.setTimeout(function() {
    	templateTxn = setContractTemplate(project1, template1, managerAddr, managerPass)
    	test1Txn = setContractTest(project1, test1, managerAddr, managerPass)
    	test2Txn = setContractTest(project1, test2, managerAddr, managerPass)
    	protoTxn = setContractProtocol(project1, protocol1, managerAddr, managerPass)

    	console.log("Transaction hashes:");
    	console.log(templateTxn);
    	console.log(test1Txn);
    	console.log(test2Txn);
    	console.log(protoTxn);
    	
	}, 5000);



/*
	
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

createProject = function createProject(name, description, ownerId, ownerAddr){
	Projects.insert({
		name: name,
		desc: description,
		creator: ownerId,
		ownerPubKey: ownerAddr
	});
	// So this line will return something
	project1 = Projects.findOne({}, {
		sort: {
			createdAt: +1, 
			limit: 1
		}
	});
	console.log("Project creation: ");
	console.log(project1);
}

uploadFile = function uploadFile(filename, hex){
	if(hex==false){
		var fileOutput = getFileOutput(filename);	
	}
	else{
		var fileOutput = getHexFileOutput(filename);	
	}
	var fileHash = hashFile(fileOutput);
	// Store Files at hash!!!
	
	TestFiles.insert({
		hash: fileHash,
		name: filename
	});
}

addTestToProject = function addTestToProject(project, name, description, filename, ownerAddr, ownerPass){
//Create Test Objects (Signature and Pub Key)
	var output = getFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash);
	Projects.update(project._id, { 
		$push: { 
			tests: {
				name: name,
				desc: description,
				signature: signature,
				publicKey: ownerAddr,
			}
		} 
	});
}


addTemplateToProject = function addTestToProject(project, name, description, filename, ownerAddr, ownerPass){
	//Create Test Objects (Signature and Pub Key)
	var output = getHexFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash);
	Projects.update(project._id, { 
		$push: { 
			templates: {
				name: name,
				desc: description,
				signature: signature,
				publicKey: ownerAddr,
			}
		} 
	});
	
}

addProtocolToProject = function addTestToProject(project, name, description, filename, ownerAddr, ownerPass){
	//Create Test Objects (Signature and Pub Key)
	var output = getFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash);
	Projects.update(project._id, { 
		$set: { 
			protocol: {
				name: name,
				desc: description,
				signature: signature,
				publicKey: ownerAddr,
			}
		} 
	});
	
}

createContract = function createContract(project, ownerAddress, ownerPass){
	var contract = ethCreateSmartContract(ownerAddress,ownerPass, 
    	Meteor.bindEnvironment(function(_contractAddress) {
            contractAddress = _contractAddress;
            Meteor.settings.contractAddress = contractAddress;
            console.log("Contract Address: " + contractAddress);
            //setProjectContract(project1, contractAddress);
            Projects.update(project._id, { 
				$set: { 
					contractAddr: contractAddress
				} 
			});
			project1 = Projects.findOne({}, {
				sort: {
					createdAt: +1, 
					limit: 1
				}
			});
            console.log("Project with contract address: ");
            console.log(project1);
	    }, function(e) { 
	    	console.log(e);
	    })
	);

    setTimeout(function(){ 
        console.log("Contract definitely created");
    }, 10000); 

}

printProject = function printProject(comment){
	console.log(comment);
	project = Projects.findOne({}, {
		sort: {
			createdAt: +1, 
			limit: 1
		}
	});
	
}

setContractTemplate = function setContractTemplate(project, filename, ownerAddr, ownerPass){
	var contractAddress = project.contractAddr;
	var output = getHexFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash); 
	setTemplateTransaction = ethSetProjectTemplate(contractAddress, ownerAddr, ownerPass, hash, signature);
	return setTemplateTransaction;
}

setContractTest = function setContractTest(project, filename, ownerAddr, ownerPass){
	var contractAddress = project.contractAddr;
	var output = getFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash); 
	setTestTransaction = ethSetProjectTest(contractAddress, ownerAddr, ownerPass, hash, signature);
	return setTestTransaction;
}

setContractProtocol = function setContractProtocol(project, filename, ownerAddr, ownerPass){
	var contractAddress = project.contractAddr;
	var output = getFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash); 
	setProtocolTransaction = ethSetProjectDetails(contractAddress, ownerAddr, ownerPass, hash, signature);
	return setProtocolTransaction;
}
	


// Turn this into function, used later
	//var template1Returned = TestFiles.findOne({hash: template1Hash});
	//console.log("template1Returned: " + template1Returned.name);