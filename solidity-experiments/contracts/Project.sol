pragma solidity ^0.4.4;

import "./Drm.sol";

contract project {
  function project() {
    owner = msg.sender;
  }

  // state
  address public owner;
  
  // modifier limiting actions to the contract owner
  modifier onlyOwner(){
      require(msg.sender == owner);
      _;
  }

  // Version of file
  struct Version {
      bytes32 hash;
      string signature;
  }

  // Core Project Files
  //  projectFiles[0] = Templates
  //  projectFiles[1] = Details
  //  projectFiles[2] = Tests
  mapping (uint => mapping (bytes32 => string)) public projectFiles;
  
  // projectFiles[0] corresponds to protocol
  function setProtocol(bytes32 hash, string protocolSig) onlyOwner {
      projectFiles[0][hash] = protocolSig;
      return;
  }
  
  function returnProtocol(bytes32 hash) constant returns (string){
      string signature = projectFiles[0][hash];
      return signature;
  }


  // projectFiles[1] corresponds to templates
  function setTemplate(bytes32 hash, string templateSig) onlyOwner {
      projectFiles[1][hash] = templateSig;
      return;
  }
  
  function returnTemplate(bytes32 hash) constant returns (string){
      string signature = projectFiles[1][hash];
      return signature;
  }

  // projectFiles[2] corresponds to tests
  function setTest(bytes32 hash, string testsSig) onlyOwner {
      projectFiles[2][hash] = testsSig;
      return;
  }
  
  function returnTest(bytes32 hash) constant returns (string){
      string signature = projectFiles[2][hash];
      return signature;
  }

  // Commited versions of project 
  //mapping (address => Version[]) public versions;
  mapping (address => mapping (bytes32 => string)) public versions;

  // User commiting a hash:signature pair to contract
  function setVersion(bytes32 hash, string signature){
      versions[msg.sender][hash] = signature;
      return;
  }

  // retrieving the hash from the signature
  function returnVersion(bytes32 hash) constant returns (string) {
      string signature = versions[msg.sender][hash];
      return signature;
  } 



    // Printable file
  struct Printable {
      Drm drm;
      bytes32 hash;
      string signature;
  }

  // Printable files list
  Printable[] printableList;


  // Create Printable Files
  function createPrintable(bytes32 hash, string printableSig) onlyOwner {
    // Create drm
    Drm printableDrm = new Drm();

    // Create printable struct
    Printable memory printableObj = Printable({
        drm: printableDrm,
        hash: hash,
        signature: printableSig
      });

    printableList.push(printableObj);

    return;
  }

  function returnPrintable(string signature) constant returns (bytes32){
    uint printableFileCount = printableList.length;
    for (uint i=0; i<printableFileCount; i++){
      var printable = printableList[i];
      if(sha3(printable.signature) == sha3(signature)){
          bytes32 hash = printable.hash;
          return hash;
      }
    }
    return 0;
  }




  /*
  project.deployed().then(a=>{proj1=a;})
  project2.deployed().then(a=>{proj2=a;})
  var hash = "0x67a4e165f4abedb51f5b11c6c81f49b3af281dc14a6f72b6ef2316fa994eb37b"
  var signature = "1cfc9823400620d5844de807280249b7e856c073139f20823ae5aa2fd0596df1520471ff6837a91cfa2a437e37fc3f340337bec4345eda67eaed117c672b27ae1b"

  var client = "0x06672c6964065dcb5828bb4f3df2049d94669fb1"
  proj1.setDrmLicense(signature, client, 4)
  */


  // function purchaseDrmLicense(string signature, address client, uint quantity) returns (uint)
  // Payable function, checks on DRM against total cost for quantity plus gas
  //    How to pass payable to another function?
  //    If it must be contacted directly, DRM contract stored in DB same way as project
  //    Or, could have DRM function getPrice, check value that way. Then value goes to project contract instead of DRM contract


  // Outside Project Contract:
    // Project.printables uses Printable Schema
    // Add DRM contractAddr to Printable Schema
    // To create printable, also create contract associated
    // To Buy/Use License, call on contract associated with printable
    // To Use license, call on DRM -> useLicense(), with client
      // Run as loop over quantity they wish to print
      // Each print try to useLicense(), returning hash of printableFile location
        // Possibly switching hash after each use
      // LynkApp (in printer) receives printableFile hash, calls printableFile storage, gets file from Hash, prints 
        // Then changes file location? Would need to also store new location on Blockchain, would this defeat purpose of the change?

  // Functions:
    // ** Only if money is all collected within this Project for each printable
    // createPrintable
    // returnPrintable
    // purchaseLicense payable (setDRMLicense now)
    // useLicense - reduce licence[msg.sender] by 1 if they have at least 1, and return hash

/*

  function purchaseDrmLicense(string signature, address client, uint quantity) payable returns (uint){
    uint printableFileCount = printableList.length;
    for (uint i=0; i<printableFileCount; i++){
      var printable = printableList[i];
      if(sha3(printable.signature) == sha3(signature)){
          uint newLicense = printable.drm.setLicense(client, quantity);
          return newLicense;
      }
    }
    return 0;
  }

*/


  // change to buyDrmLicense
  // This function a manager to assign printing rights to a client address
  //    It is not 'payable', there is no transfer of funds
  function setDrmLicense(string signature, address client, int quantity) returns (int){
    uint printableFileCount = printableList.length;
    for (uint i=0; i<printableFileCount; i++){
      var printable = printableList[i];
      if(sha3(printable.signature) == sha3(signature)){
          int newLicense = printable.drm.setLicense(client, quantity);
          return newLicense;
      }
    }
    return 0;
  }

  // proj1.returnDrmLicense(signature, client)
  function returnDrmLicense(string signature, address client) constant returns (int){
    uint printableFileCount = printableList.length;
    for (uint i=0; i<printableFileCount; i++){
      var printable = printableList[i];
      if(sha3(printable.signature) == sha3(signature)){
          int license = printable.drm.returnLicense(client);
          return license;
      }
    }
    return 0;
  }

  // proj1.purchaseWithLicense(signature, client)
  // proj1.purchaseWithLicense(signature, client2)
  // Person purchase n number of prints. Where to control the receiving of those prints. 
  // Printer/Lynk gets request for number of prints, checks for license, if license available
  //    Reduce license, read through (print) document that many times
  //    This purchase funciton should return boolean or:
  //      It should reduce the license by 1, return hash which can only be printed once (because it is moved to new hash or some other way)
  function purchaseWithLicense(string signature, address client) constant returns (bool){
    uint printableFileCount = printableList.length;
    for (uint i=0; i<printableFileCount; i++){
      var printable = printableList[i];
      if(sha3(printable.signature) == sha3(signature)){
          int license = printable.drm.returnLicense(client);
          bool hasLicense = license > 0;
          return hasLicense;
      }
    }
    return false;
  }

}






