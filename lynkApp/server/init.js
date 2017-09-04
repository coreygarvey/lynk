import '../ethereum/ethereum.js';
import '../files/files.js';

Meteor.startup(function () {

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
		//Get Template
		//Edit into new version
		console.log("Filenames:");
		versionList = [];
		versionCount = 3;
		for(i=0; i<versionCount; i++){
			versionNumber = i+1;
			fileName = 'versions/version' + versionNumber + '.stl';
			versionList.push(fileName);
			console.log(fileName);
		}

		//Upload new version file into ProjectFiles
		uploadFile(versionList[0], true);
		//Store location in project object
		addRawVersionToProject(project1, versionList[0]);
	}, 8000)

	
	Meteor.setTimeout(function(){
		//Get Protocol from BC
		//Confirm Owner Signed
		//Get File
		//Confirm hash from BC is hash of file
		protocolfile = designerGetProtocol(projectId, designerAddr, designerPass);
		console.log("Protocol file: ");
		console.log(protocolFile);
	}, 9000)

	Meteor.setTimeout(function(){
		// Get location of test files from protocol file 
		//     (actually just hashing test files at the moment)
		testHashes = protocolGetTestHashes(protocolFile);
		console.log("testHashes:");
		console.log(testHashes);
	}, 11000)
	
	Meteor.setTimeout(function(){
		// Run test files against latest raw version in project
		testResults = testAgainstLatestVersion(projectId, testHashes);
		console.log("Test results:");
		console.log(testResults);

	}, 12000)
	
	Meteor.setTimeout(function(){
		// Store test results with file as version and put on BC


		versionsLength = versionList.length;
		
		for(counter=0; counter<versionsLength; counter++){
			//Store "protocol-test:result" as metadata on file
			versionHexWithResults = prependResultsToVersion(versionList[counter], testResults);
			/* First 2 characters signal number of hex characters for Metadata */
			console.log(versionHexWithResults);

			// Upload file with metadata to DB
			uploadVersionFile(versionHexWithResults);

			//Hash and store file
			//Create Test Objects (Signature and Pub Key)
			versionHash = hashFile(versionHexWithResults);
			versionNumber = counter+1;
			name = "version " + versionNumber;
			description = "Version " + versionNumber +" in Lynk";
			console.log(description)
			addVersionToProject(projectId, name, description, versionHash, designerAddr, designerPass);
			//console.log(Projects.findOne({_id:projectId}))

			//Create version object in DB (sig and pub key)
			//Store signed version on smart contract
			setVersionTransaction = submitContractVersion(projectId, versionHash, designerAddr, designerPass);
		}

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


		//Retrieve version hash from BC
		//Confirm Owner Signed
		//Get File
		//Confirm Hash is of File

		//Get version file

		versionFileDict = breakdownVersionFile(versionFile);
		
		console.log("versionFileDict");
		console.log(versionFileDict);

		//If printable in metadata: print file

	}, 15000)

	/* END END END END END END END END END END END END END END END END END END END */


	// TESTNET FUNCTIONS

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
	var balance = ethReturnBalance(fromAddr);
	console.log("balance: " + balance.toString());
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
	
	ProjectFiles.insert({
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
	returnFile = ProjectFiles.findOne({
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

	project1 = Projects.findOne({}, {
		sort: {
			createdAt: +1, 
			limit: 1
		}
	});
	return project1;
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
				hash: hash,
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
				hash: hash,
				publicKey: ownerAddr,
			}
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
				hash: hash,
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
	// Find version file with metadata, hash, sign, and put into project
	var output = VersionFiles.findOne({hash:versionHash}).fileHex
	var hash = versionHash;
	var signature = ethSignFile(ownerAddr, ownerPass, hash);
	Projects.update(projectId, { 
		$push: { 
			versions: {
				name: name,
				desc: description,
				hash: hash,
				publicKey: ownerAddr,
			}
		} 
	});
}

createContract = function createContract(project, ownerAddress, ownerPass){
	var contract = ethCreateProjectContract(ownerAddress,ownerPass, 
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
}


setContractProtocol = function setContractProtocol(project, filename, ownerAddr, ownerPass){
	var contractAddress = project.contractAddr;
	var output = getFileOutput(filename);
	var hash = hashFile(output);
	var signature = ethSignFile(ownerAddr, ownerPass, hash); 
	setProtocolTransaction = ethSetProjectProtocol(contractAddress, ownerAddr, ownerPass, hash, signature);
	return setProtocolTransaction;
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
	project1 = createProject(projectName, projectDescription, managerId, managerAddr);

	/**** ADD ALL FILES TO PROJECT ****/
	
	/* TEST FILES */
	// Upload Test Files (Hash and Store)
	var test1 = "tests1.txt";
	var test2 = "tests2.txt";
	// Remove all files
	ProjectFiles.remove({});
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
	//var template1Returned = ProjectFiles.findOne({hash: template1Hash});
	//console.log("template1Returned: " + template1Returned.name);


designerGetProtocol = function designerGetProtocol(projectId, designerAddr, designerPass){
	project = Projects.findOne({_id: projectId});

	projectAddr = project.contractAddr;

	protocolHash = project.protocol.hash;
	// get protocol signature from blockchain
	var protocolSig = ethReturnProjectProtocol(projectAddr, designerAddr, designerPass, protocolHash);


	// getting owner Addr from project object, will be used to test
	// 	against who signed template file on BC
	var ownerAddr = project.ownerPubKey;
	//var ownerAddr = ethReturnOwnerAddress(projectAddr);
	var sigAddr = ethVerifySig(protocolSig, protocolHash);
	
	// Check that owner signed file
	if(ownerAddr == sigAddr){
		protocolFile = getFile(protocolHash);
		protocolFilename = protocolFile.name;
		protocolFileOutput = getFileOutput(protocolFilename);
		// get protocol hash from file
		protocolFileHash = hashFile(protocolFileOutput);
		// Check that hashed file on BC is this file
		if(protocolFileHash == protocolHash) {
			return protocolFile;
		}
	}
	return;
}


designerGetTemplate = function designerGetTemplate(projectId, designerAddr, designerPass){
	
	// Step 1: Get Project, contract address,
	//		   and Template signature from local storage
	project = Projects.findOne({_id: projectId});
	projectAddr = project.contractAddr;
	templateHash = project.template.hash;

	// Step 2: Acquire Template hash from blockchain
	var templateSig = ethReturnProjectTemplate(projectAddr, designerAddr, designerPass, templateHash);

	// Step 3: Determine address of signer
	var sigAddr = ethVerifySig(templateSig, templateHash);

	// Step 4: Check that project owner signed file
	var ownerAddr = project.ownerPubKey;
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


protocolGetTestHashes = function protocolGetTestHashes(protocol){
	//Indicate protocol tests (location from hashes) to test
	// Read protocol file
	// Read test hashes
	test1 = "tests1.txt";
	test1Output = getFileOutput(test1);
	test1Hash = hashFile(test1Output);
	test2 = "tests2.txt";
	test2Output = getFileOutput(test2);
	test2Hash = hashFile(test2Output)
	
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

	versionSig = latestVersion.hash;
	versionOwnerAddr = latestVersion.publicKey

	// Retrieve version hash from BC
	versionSig = ethReturnVersionSig(contractAddr, versionOwnerAddr, versionHash);
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

	// Get length of metadata
	for(i=0; i<2; i++){
		metaHexChars += versionFileOutput[i]*(Math.pow(16, (1-i)));
	}

	// Record all metadata as hex into metaHex
	var metaHex ='';
	for(i=2; i<2+metaHexChars; i++){
		metaHex += versionFileOutput[i];
		versionFileDict["metaHex"] = metaHex;
	}

	// convert metaHex to meta
	var meta = '';
	for (var i = 2; i < 2+metaHexChars; i += 2){
    	meta += String.fromCharCode(parseInt(versionFileOutput.substr(i, 2), 16));
    	versionFileDict["meta"] = meta;
    }

    // isolate version file
	var versionFile = '';
	for(i=2+metaHexChars; i<versionFileOutput.length; i++){
		versionFile += versionFileOutput[i];
		versionFileDict["versionFile"] = versionFile;
	}

	return versionFileDict;
}