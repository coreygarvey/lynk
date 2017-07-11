pragma solidity ^0.4.4;

contract Project {
  function Project() {
    owner = msg.sender;
  }

  // state
  address public owner;
  
  // Signatures of template, details, and tests files
  string public template;
  string public details;
  string public tests;

  // Mapping between version signatures (currently hashes)
  //    and the pubKey that signed (user's eth address)
  mapping (bytes32 => string) public versions;

  function setTemplate(string templateSig){
      if(msg.sender != owner) return;
      template = templateSig;
  }
  function getTemplate() constant returns (string){
      return template;
  }

  function setDetails(string detailsSig){
      if(msg.sender != owner) return;
      details = detailsSig;
  }
  function getDetails() constant returns (string){
      return details;
  }

  function setTests(string testsSig){
      if(msg.sender != owner) return;
      tests = testsSig;
  }
  function getTests() constant returns (string){
      return tests;
  }
  function setVersion(bytes32 versionSig, string sig){
      versions[versionSig] = sig;
  }
  
  function getVersion(bytes32 versionSig) constant returns (string){
      return versions[versionSig];
  }
}
