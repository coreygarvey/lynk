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
	var designerPass = "password";

	var projectId = managerProjectSetup(managerAddr, managerPass);


	
	//DESIGNER DESIGNER DESIGNER DESIGNER DESIGNER 
	//============================================
	//Get Template Hash from BC using Project ID
	Meteor.setTimeout(function(){
		templatefile = designerGetTemplate(projectId, designerAddr, designerPass);
		console.log("Template file: ");
		console.log(templateFile);
	}, 8000)

	
	Meteor.setTimeout(function(){
		
		//Edit Template and Resave
		//Upload new version file
		//Store in temporary location
		//Store location in project object	

		/* TODO */
		// Get file from template and edit
		// Save as version1.stl
		// versionFile = designerVersionFromTemplate(templateFile, designerAddr, designerPass);
		//		Get Template
		//		Open, edit file, save as version1.stl
		version1 = 'version1.stl';
		uploadFile(version1, true);

		addRawVersionToProject(project1, version1);
		
	}, 8000)

	
	Meteor.setTimeout(function(){
		//Get Protocol from BC
		//Confirm Owner Signed
		//Get File
		//Confirm Hash is of File
		protocolfile = designerGetProtocol(projectId, designerAddr, designerPass);
		console.log("Protocol file: ");
		console.log(protocolFile);

	}, 9000)

	Meteor.setTimeout(function(){
		testHashes = protocolGetTestHashes(protocolFile);
		console.log("testHashes:");
		console.log(testHashes);
	}, 11000)
	
	Meteor.setTimeout(function(){
		
		testResults = testAgainstLatestVersion(projectId, testHashes);

		console.log("Test results:");
		console.log(testResults);

	}, 12000)
	
	Meteor.setTimeout(function(){
		
		//Store "protocol-test:result" as metadata on file
		versionHexWithResults = prependResultsToVersion(version1, testResults);
		/* First 2 characters signal number of hex characters for Metadata */
		console.log(versionHexWithResults);

		// Upload file with metadata
		uploadVersionFile(versionHexWithResults);

		//Hash and store file
		//Create Test Objects (Signature and Pub Key)
		versionHash = hashFile(versionHexWithResults);
		name = "version 1";
		description = "First version in Lynk";
		addVersionToProject(projectId, name, description, versionHash, designerAddr, designerPass);

		console.log(Projects.findOne({_id:projectId}))

		//Create version object in DB (sig and pub key)
		//Store signed version on contract
		setVersionTransaction = submitContractVersion(projectId, versionHash, designerAddr, designerPass);

		console.log("setVersionTransaction: ");
		console.log(setVersionTransaction);

		//Store tests passed, printable status in version object
		//Print version object details (tests passed, printable, sig, pub key)
	}, 13000)


/*
	MANGER MANGER MANGER MANGER MANGER MANGER
	=========================================
*/
	Meteor.setTimeout(function(){
		// Get latest version from Project object
		versionFile = getLatestProjectVersion(projectId);
		
		
		console.log("versionFile");
		console.log(versionFile);

		versionFileDict = breakdownVersionFile(versionFile);

		
		console.log("versionFileDict");
		console.log(versionFileDict);

	}, 15000)

/*

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

printProject = function printProject(projectId){
	project = Projects.findOne({
		_id: projectId
	});
	console.log("Printing project " + project.name);
	console.log(project);
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

uploadVersionFile = function uploadVersionFile(versionHex){
	versionHash = hashFile(versionHex);
	VersionFiles.insert({
		hash: versionHash,
		fileHex: versionHex
	});
}

getFile = function getFile(hash){
	// Store Files at hash!!!
	returnFile = TestFiles.findOne({
		hash: hash,
	});
	return returnFile;
}

getVersionFile = function getVersionFile(hash){
	// Store Files at hash!!!
	returnFile = VersionFiles.findOne({
		hash: hash,
	});
	return returnFile;
}



function wait(ms){
   var start = new Date().getTime();
   var end = start;
   console.log("Starting wait");
   while(end < start + ms) {
     end = new Date().getTime();
  }
  console.log("Done with wait");
}

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
}


addTestToProject = function addTestToProject(projectId, name, description, filename, ownerAddr, ownerPass){
//Create Test Objects (Signature and Pub Key)
	var output = getFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash);
	Projects.update(projectId, { 
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


addTemplateToProject = function addTemplateToProject(projectId, name, description, filename, ownerAddr, ownerPass){
	//Create Test Objects (Signature and Pub Key)
	var output = getHexFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash);
	Projects.update(projectId, { 
		$set: { 
			template: {
				name: name,
				desc: description,
				signature: signature,
				publicKey: ownerAddr,
			}
		} 
	});
	
}



addProtocolToProject = function addProtocolToProject(projectId, name, description, filename, ownerAddr, ownerPass){
	//Create Test Objects (Signature and Pub Key)
	var output = getFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash);
	Projects.update(projectId, { 
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

addRawVersionToProject = function addRawVersionToProject(project, filename){
	//Create Test Objects (Signature and Pub Key)
	var output = getHexFileOutput(filename);
	var hash = hashFile(output);
	Projects.update(project._id, { 
		$push: { 
			rawVersions: {
				name: filename,
				hash: hash,
			}
		} 
	});	
}

addVersionToProject = function addVersionToProject(projectId, name, description, versionHash, ownerAddr, ownerPass){
	//Create Test Objects (Signature and Pub Key)
	var output = VersionFiles.findOne({hash:versionHash}).fileHex
	var hash = versionHash;
	var signature = ethSignFile(ownerAddr, ownerPass, hash);
	Projects.update(projectId, { 
		$push: { 
			versions: {
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
	    }, function(e) { 
	    	console.log(e);
	    })
	);

    //setTimeout(function(){ 
    //    console.log("Contract definitely created");
    //}, 10000); 

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
	setProtocolTransaction = ethSetProjectProtocol(contractAddress, ownerAddr, ownerPass, hash, signature);
	return setProtocolTransaction;
}
	

submitContractVersion = function submitContractVersion(projectId, versionHash, ownerAddr, ownerPass){
	var project = Projects.findOne({_id: projectId});
	var contractAddress = project.contractAddr;
	var hash = versionHash;
	var signature = ethSignFile(ownerAddr, ownerPass, hash); 
	setVersionTransaction = ethSetVersion(contractAddress, ownerAddr, hash, signature);
	return setVersionTransaction;
}
	



managerProjectSetup = function projectSetup(managerAddr, managerPass){
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
		

		addTestToProject(project1._id, testName, testDesc, testFilename, managerAddr, managerPass);
	}

	/* TEMPLATE FILE */
	// Upload Template File (Hash and Store)
	var template1 = "template1.stl";
	uploadFile(template1, true);
	
	var template1Name = "Template #1"
	var template1Desc= "First template file for project";
	
	addTemplateToProject(project1._id, template1Name, template1Desc, template1, managerAddr, managerPass);
	
	project1 = Projects.findOne({}, {
		sort: {
			createdAt: +1, 
			limit: 1
		}
	});


	/* PROTOCOL FILE */
	var protocol1 = "protocol1.txt";
	uploadFile(protocol1, false);
	var protocol1Name = "Protocol #1"	
	var protocol1Desc=  "First protocol file for project"

	addProtocolToProject(project1._id, protocol1Name, protocol1Desc, protocol1, managerAddr, managerPass);

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
    	
	}, 3000);
	return project1._id;
}



// Turn this into function, used later
	//var template1Returned = TestFiles.findOne({hash: template1Hash});
	//console.log("template1Returned: " + template1Returned.name);


designerGetTemplate = function designerGetTemplate(projectId, designerAddr, designerPass){
	project = Projects.findOne({_id: projectId});
	console.log(project);

	projectAddr = project.contractAddr;
	templateSig = project.template.signature;

	var templateHash = ethReturnProjectTemplate(projectAddr, designerAddr, designerPass, templateSig);

	// getting owner Addr from project object, will be used to test
	// 	against who signed template file on BC
	var ownerAddr = project.ownerPubKey;
	//var ownerAddr = ethGetOwnerAddress(projectAddr);
	var sigAddr = ethVerifySig(templateSig, templateHash);
	
	// Check that owner signed file
	if(ownerAddr == sigAddr){
		templateFile = getFile(templateHash);
		templateFilename = templateFile.name;
		templateFileOutput = getHexFileOutput(templateFilename);
		templateFileHash = hashFile(templateFileOutput);
		// Check that hashed file on BC is this file
		if(templateFileHash == templateHash) {
			console.log("Template tests passed");
			return templateFile;
		}
	}
	return;
}


designerGetProtocol = function designerGetProtocol(projectId, designerAddr, designerPass){
	project = Projects.findOne({_id: projectId});
	console.log(project);

	projectAddr = project.contractAddr;
	protocolSig = project.protocol.signature;

	var protocolHash = ethReturnProjectProtocol(projectAddr, designerAddr, designerPass, protocolSig);

	// getting owner Addr from project object, will be used to test
	// 	against who signed template file on BC
	var ownerAddr = project.ownerPubKey;
	//var ownerAddr = ethGetOwnerAddress(projectAddr);
	var sigAddr = ethVerifySig(protocolSig, protocolHash);
	
	// Check that owner signed file
	if(ownerAddr == sigAddr){
		protocolFile = getFile(protocolHash);
		protocolFilename = protocolFile.name;
		protocolFileOutput = getFileOutput(protocolFilename);
		protocolFileHash = hashFile(protocolFileOutput);
		// Check that hashed file on BC is this file
		if(protocolFileHash == protocolHash) {
			console.log("Protocol tests passed");
			return protocolFile;
		}
	}
	return;
}

protocolGetTestHashes = function protocolGetTestHashes(protocol){
	/* TODO */
	//Indicate protocol tests (hashes) to test
	// Read protocol file
	// Read test hashes (or sigs?)
	test1 = "tests1.txt";
	test1Output = getFileOutput(test1);
	test1Hash = hashFile(test1Output);
	test2 = "tests2.txt";
	test2Output = getFileOutput(test2);
	test2Hash = hashFile(test2Output)
	// What will be stored in protocol file (or sigs?)
	testHashes = [test1Hash, test2Hash];
	return testHashes;
}


testAgainstLatestVersion = function testAgainstLatestVersion(projectId, testHashes){
	testFiles = [];
	// Get Test files from DB
	for(i=0; i<testHashes.length; i++){
		testFileHash = testHashes[i];
		testFile = getFile(testFileHash);
		testFiles.push(testFile);
	}

	// Get temporary version stored in project
	rawVersions = Projects.findOne({_id: projectId}).rawVersions;
	rawVersionsSorted = _.sortBy(rawVersions, function(rawVersion){ return rawVersion.createdAt; });
	latestVersion = rawVersionsSorted[0];

	// Test latest version agains test files
	testResults = {};
	for(i=0; i<testFiles.length; i++){
		// Get testFile
		// Test latestVersion vs testFile
		// Record result
		testFile = testFiles[i];
		resultMsg = "Pass";
		testResults[testFile.name] = resultMsg;
	}

	return testResults;
}


prependResultsToVersion = function addResultsToVersion(versionFilename, resultsDict){
	
	// NEED TO SIGNAL HOW MANY BYTES FOR METADATA
	versionHexOutput = getHexFileOutput(versionFilename);

	testResultsString = JSON.stringify(resultsDict);

	resultsHex = '';
	for(i=0; i<testResultsString.length; i++){
		resultsHex += testResultsString[i].charCodeAt(0).toString(16);
	}

	resultsLen = resultsHex.length.toString(16);



    versionHexWithResults = resultsLen + resultsHex + versionHexOutput;

    return versionHexWithResults;
}


getLatestProjectVersion = function getLatestProjectVersion(projectId){
	project = Projects.findOne({_id: projectId});
	contractAddr = project.contractAddr;
	versions = project.versions;
	versionsSorted = _.sortBy(versions, function(version){ return version.createdAt; });
	latestVersion = versionsSorted[0];


	versionSig = latestVersion.signature;
	versionOwnerAddr = latestVersion.publicKey

	// Retrieve version hash from BC
	versionHash = ethReturnVersionHash(contractAddr, versionOwnerAddr, versionSig);
	//Confirm Owner Signed
	//Get File
		//Confirm Hash is of File

		// Get address that signed, compare to version owner
	var sigAddr = ethVerifySig(versionSig, versionHash);
	
	// Check that owner signed file
	if(versionOwnerAddr == sigAddr){
		versionFile = getVersionFile(versionHash);
		versionFileOutput = versionFile.fileHex
		versionFileHash = hashFile(versionFileOutput);
		// Check that hashed file on BC is this file
		if(versionFileHash == versionHash) {
			console.log("Version tests passed");
			return versionFile;
		}
	}

	return;
}


breakdownVersionFile = function breakdownVersionFile(versionFile){
	var versionFileDict = {};

	versionFileOutput = versionFile.fileHex;

	var metaHexChars = 0;
	// Get metadata
	for(i=0; i<2; i++){
		metaHexChars += versionFileOutput[i]*(Math.pow(16, (1-i)));
	}

	var metaHex ='';
	for(i=2; i<2+metaHexChars; i++){
		metaHex += versionFileOutput[i];
		versionFileDict["metaHex"] = metaHex;
	}
	var meta = '';
	for (var i = 2; i < 2+metaHexChars; i += 2){
    	meta += String.fromCharCode(parseInt(versionFileOutput.substr(i, 2), 16));
    	versionFileDict["meta"] = meta;
    }

	var versionFile = '';
	for(i=2+metaHexChars; i<versionFileOutput.length; i++){
		versionFile += versionFileOutput[i];
		versionFileDict["versionFile"] = versionFile;
	}

	return versionFileDict;
}