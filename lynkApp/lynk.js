var sjcl = require('./node_modules/sjcl/sjcl.js')

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  /*
  // Open the file and read into file_output
	const data = Assets.getText('bigCube.stl');
	console.log("here's the data: ");
	var file_output = '';
	for (var i = 0, l = data.length; i < l; i++){
    //output += '\\u' + pad_four(input.charCodeAt(i).toString(16));
		file_output += data[i].charCodeAt(0).toString(16) + ' ';
  }
  console.log(file_output);

  // Hash the file
	var file_bit_array = sjcl.hash.sha256.hash(file_output);
	var digest_sha256 = sjcl.codec.hex.fromBits(file_bit_array);  
    
  console.log("File hash: ");
  console.log(digest_sha256);


  // Encrypt and Decrypt the hash with a password
  var password = "password";
	var encrypted = sjcl.encrypt(password, digest_sha256);
	var plaintext = sjcl.decrypt(password, encrypted);

	console.log("Encrypted hash: ");
  var parsedMessage = JSON.parse(encrypted);
  var ciphertext = parsedMessage["ct"];
  var cipher_hex = '0x';
  var hex_digit;
  for (var i = 0, l = ciphertext.length; i < l; i++){
  hex_digit = ciphertext.charCodeAt(i).toString(16);
  cipher_hex += hex_digit;
  }
  console.log("cipher_hex");
  console.log(cipher_hex);
  console.log(ciphertext);

  console.log("Decrypted hash: ");
  console.log(plaintext);
  */
  });
}
