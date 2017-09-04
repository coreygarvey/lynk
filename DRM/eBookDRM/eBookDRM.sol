contract ebookDRM{
	string ebookFingerPrint;
	address owner;
	address holder;
	address copyright;

	function canRead() constant returns (bool authorized){
		if(msg.sender == holder) return true;
		return false;
	}

	function lendTo(address recipient) returns (bool haslent){
		// only owner can lend
		if (msg.sender != owner) return false;
		// don't lend a book to current holder
		if (holder == recipient) return false;
		if (participant(recipient).loan(this)){
			return true;
		}
	}
}


contract participant{
	int funds; // double not yet handled in solidity

	function loan(address ebook) returns (bool) {
		// don't loan from yourself
		if (ebookDRM(ebook).owner == this) return false;
		// don't loan to copyright
		if (ebookDRM(ebook).copyright == this) return false;
		// arbitrary fee
		int fee = 1;
		// not enough funds
		if (this.fund < fee) return false;
		// the handling of fees is rudimentary, proper rollback should be
		// implemented as currently, value is created temporarily
		if (participant(ebook.copyright).authorizeLoan(ebook,fee)) {
			this.funds = this.funds - fee;
			return true;
		}
		return false;
	}

	function authorizeLoan(address ebook, int fee) returns (bool authorized){
		// don't lend to yourself if you are the copyright owner
		if(msg.sender == this) return false;
		// change the holder
		ebookDRM(ebook).honder = msg.sender;
		// accept funds
		this.funds = this.funds + fee;
		return true;
	}
}