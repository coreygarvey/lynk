pragma solidity ^0.4.4;

contract project {
  function project() {
    owner = msg.sender;
  }

  // state
  address public owner;
  
  // modifier for only the owner of the contract
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
  mapping (uint => Version[]) public projectFiles;

  // projectFiles[0] corresponds to protocol
  function setProtocol(bytes32 hash, string protocolSig) onlyOwner {
      projectFiles[0].push(Version({
          hash: hash,
          signature: protocolSig
      }));
      return;
  }
  
  function returnProtocol(string signature) constant returns (bytes32){
      uint protocolFileCount = projectFiles[0].length;
      for (uint i=0; i<protocolFileCount; i++){
        var protocols = projectFiles[0][i];
        if(sha3(protocols.signature) == sha3(signature)){
            bytes32 hash = protocols.hash;
            return hash;
        }
      }
      return 0;
  }


  // projectFiles[1] corresponds to templates
  function setTemplate(bytes32 hash, string templateSig) onlyOwner {
      projectFiles[1].push(Version({
          hash: hash,
          signature: templateSig
      }));
      return;
  }
  
  function returnTemplate(string signature) constant returns (bytes32){
      uint templateFileCount = projectFiles[1].length;
      for (uint i=0; i<templateFileCount; i++){
        var template = projectFiles[1][i];
        if(sha3(template.signature) == sha3(signature)){
            bytes32 hash = template.hash;
            return hash;
        }
      }
      return 0;
  }


  // projectFiles[2] corresponds to tests
  function setTest(bytes32 hash, string testsSig) onlyOwner {
      projectFiles[2].push(Version({
          hash: hash,
          signature: testsSig
      }));
      return;
  }
  
  function returnTest(string signature) constant returns (bytes32){
      uint testsFileCount = projectFiles[0].length;
      for (uint i=0; i<testsFileCount; i++){
        var tests = projectFiles[0][i];
        if(sha3(tests.signature) == sha3(signature)){
            bytes32 hash = tests.hash;
            return hash;
        }
      }
      return 0;
  }

  // Commited versions of project 
  mapping (address => Version[]) public versions;

  // User commiting a hash:signature pair to contract
  function setVersion(bytes32 hash, string signature){
      versions[msg.sender].push(Version({
          hash: hash,
          signature: signature
      }));
      return;
  }

  // retrieving the hash from the signature
  function returnVersion(string signature) constant returns (bytes32) {
      uint length = versions[msg.sender].length;
      for (uint i=0; i<length; i++){
          var version = versions[msg.sender][i];
          if(sha3(version.signature) == sha3(signature)){
              bytes32 hash = version.hash;
              return hash;
          }
      }
      return 0;
  } 

}
