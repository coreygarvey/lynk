pragma solidity ^0.4.4;

contract Project {
  function Project() {
    owner = msg.sender;
  }

  // state
  address public owner;
  
  

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
    

  // projectFiles[0] corresponds to templates
  function setTemplate(bytes32 hash, string templateSig) onlyOwner {
      projectFiles[0].push(Version({
          hash: hash,
          signature: templateSig
      }));
      return;
  }
  
  function getTemplate(string signature) constant returns (bytes32){
      uint templateFileCount = projectFiles[0].length;
      for (uint i=0; i<templateFileCount; i++){
        var template = projectFiles[0][i];
        if(sha3(template.signature) == sha3(signature)){
            bytes32 hash = template.hash;
            return hash;
        }
      }
      return 0;
  }

  // projectFiles[1] corresponds to details
  function setDetails(bytes32 hash, string detailsSig) onlyOwner {
      projectFiles[1].push(Version({
          hash: hash,
          signature: detailsSig
      }));
      return;
  }
  
  function getDetails(string signature) constant returns (bytes32){
      uint detailsFileCount = projectFiles[1].length;
      for (uint i=0; i<detailsFileCount; i++){
        var details = projectFiles[1][i];
        if(sha3(details.signature) == sha3(signature)){
            bytes32 hash = details.hash;
            return hash;
        }
      }
      return 0;
  }

  // projectFiles[2] corresponds to tests
  function setTests(bytes32 hash, string testsSig) onlyOwner {
      projectFiles[2].push(Version({
          hash: hash,
          signature: testsSig
      }));
      return;
  }
  
  function getTests(string signature) constant returns (bytes32){
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
  function commitVersion(bytes32 hash, string signature){
      versions[msg.sender].push(Version({
          hash: hash,
          signature: signature
      }));
      return;
  }

  // modifier for only the owner of the contract
  modifier onlyOwner(){
      require(msg.sender == owner);
      _;
  }

  // retrieving the hash from the signature
  function returnHash(string signature) constant returns (bytes32) {
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
  // Additional Function ideas
  /*
    Ballot{
        struct Voter
        struct Proposal
        address public chairperson
        mapping(address => Voter) public voters
        Proposal[] public proposals
        function Ballot( bytes32[] proposalNames)
        function giveRightToVote(address voter)
        function delegate(address to)
        function vote(uint proposal)
        function winningProposal() constant
        function winnerName() constan
    }

   SimpleAuction{
        address public beneficiary
        uint public auctionStart
        uint public biddingTime
        address public highestBidder
        uint public highestBid
        mapping(address => uint) pendingReturns
        bool ended;
        event HighestBidIncreased(address bidder, int amount)
        event AuctionEnded(address winner, uint amount)
        function SimpleAuction(uint _biddingTime, address _beneficiary)
        function bid() payable
        function withdraw() returns(bool)
        function auctionEnd()
    }

    BlindAuction {
        struct Bid
        address public beneficiary
        uint public auctionStart
        uint public biddingEnd
        uint public revealEnd
        bool public ended
        
       mapping(address=>Bid[]) public bids

      address public highestBidder
      uint public highestBid
      
      mapping(address => uint) pendingReturns

      event AuctionEnded(address winner, uint highestBid)

      modifier onlyBefore(uint _time) { require(now < _time); _;}
      modifier onlyAfter(uint _time) { require(now > _time); _;}

      function BlindAuction(uint _biddingTime, uint _revealTime, address _beneficiary)

      function bid(bytes32 _blindedBid) payable onlyBefore(biddingEnds)
      function reveal(uint[] _values, bool[] _fake, bytes32[] secret)

      function placeBid(address bidder, uint value) internal returns (bool success)

        function withdraw() returns (bool)

       function auctionEnd() onlyAfter(revealEnd)

  */
 

}
