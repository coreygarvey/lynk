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


  // Version of file
  struct Version {
      bytes32 hash;
      string signature;
  }

  // Mapping between user address and versions
  mapping (address => Version[]) public versions;

  function commitVersion(bytes32 hash, string signature){
      versions[msg.sender].push(Version({
          hash: hash,
          signature: signature
      }));
      return;
  }

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
}
