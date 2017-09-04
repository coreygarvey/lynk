pragma solidity ^0.4.0;

contract Owned {
    address internal owner;

    function Owned() {
        owner = msg.sender;
    }

    function setOwner(address _owner) {
        if (owner == 0x0 || msg.sender == owner) {
            owner = _owner;
        }
    }

    modifier onlyOwner {
        if (msg.sender != owner) throw;
        _;
    }
}

contract Mortal is Owned {
  function kill() onlyOwner {
      selfdestruct(owner);
  }
}

contract Drm is Mortal {


    // purchase(address customer, int count)
        // totalCost = count * price
        // if msg.val< totalCost{ throw };
        // if (licenses[client]){ licenses[client] += count };
        // else liceses[client] = count

    // Validate(address customer)
    //  return licenses[client] > 0

    // Use()
    // if licenses[client] <= 0 { throw };
    //  licences[client]--;
    //  return true
    /* 

    struct pot {
        uint release_block;
        uint amount;
    }
    mapping (address => pot) pending_students;

    function set(address send_to) payable {
        pending_students[send_to].amount += msg.value;
        pending_students[send_to].release_block = now + 2 minutes;
    }

    function forward(address send_to) payable returns (bool) {
        if (now < pending_students[send_to].release_block) return false;
        if (!send_to.send(pending_students[send_to].amount)) return false;
        pending_students[send_to].amount = 0;
        return true;
    }

    function cancel_student(address send_to) payable returns (bool) {
        if (msg.sender != owner) return false;
        if (!owner.send(pending_students[send_to].amount)) return false;
        pending_students[send_to].amount = 0;
        return true;
    }

    function get_amount(address send_to) constant returns (uint) {
        return pending_students[send_to].amount;
    }

    function get_release_block(address send_to) constant returns (uint) {
        return pending_students[send_to].release_block;
    }
    */


    uint public price;

    mapping (address => int) public licenses;

    event LicensePurchase(address client, address domain);
    
    event PriceChange(uint oldPrice, uint newPrice);



    function Drm() {
        // warning: never set values in constructor, they won't be visible 
        // in proxy (cause it executes delegatecall and we're using proxy context)
    }

    function init(address _owner) {
        super.setOwner(_owner);
    }

    function setPrice(uint _price) onlyOwner {
        price = _price;
    }

    // Function called by Project contract to set a user's license
    function setLicense(address _client, int _quantity) returns (int){
        int license = licenses[_client];
        bool hasLicense = license != 0x0;
        // If no license, initilize as 0
        if(!hasLicense) {
            license = 0;
        }
        license += _quantity;
        licenses[_client] = license;
        return license;
    }

    function returnLicense(address _client) returns (int){
        int license = licenses[_client];
        bool hasLicense = license != 0x0;
        // If no license, initilize as 0
        if(!hasLicense) {
            return 0;
        } else{
            return license;
        }
    }

    /*
    function purchase(address[] clients, address[] discounts) payable notBanned(tx.origin) {
        uint total = applyDiscounts(clients.length * price, clients.length, Discount.ClientAction.PURCHASE, discounts);
        if (msg.value < total) throw;
        
        LicenseDomain domain = domains[tx.origin];
        bool hadDomain = domain != LicenseDomain(0x0);
        if (!hadDomain) {
            domain = new LicenseDomain(clients, tx.origin);
        }
        
        for (uint i = 0; i < clients.length; i++) {
            if (blacklist[clients[i]] || licenses[clients[i]] != LicenseDomain(0x0)) throw;
            if (hadDomain) {
                domain.add(clients[i]);
            }
            licenses[clients[i]] = domain;
        }
        
        if (!hadDomain) {
            domains[tx.origin] = domain;
        }
        
        LicensePurchase(tx.origin, domain);
    }
    */
}
