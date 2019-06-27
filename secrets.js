'use strict';
/*   
Solutions for different passwords..  All the same Private-Key
Address is: 1BGkdHBg9dwCggjQznUP891Ukhp4jMDEfW 

key: 6PRKpn2fsaDUoDgyqZPN6odzVL8zasrP9SPtYUQBWinHYF5Lvh2tnbibG7 Pass: BitcoinDaytrader 
key: 6PRKpn2fsLwwr7TCvXCjyDzysVmrLYpYqejdvLgRyAmCwdatu789beydWp Pass: 123406272019  
key: 6PRKpn2ftLhcgPcU9TdkgmaQtxZHttzHNfYth1r2p8RZxQP63QJ726p52r Pass: Hey

The above will decrypt and give you your private key
privatekey: 5KKMVZFWPRYt8VxoWRB1AiRnUsuPKWUWbR5vYUvJ9xPtxKq1Uuu 
*/


	// Edit Config.json 
    // "publicAddress": "1BGkdHBg9dwCggjQznUP891Ukhp4jMDEfW",
    // "encryptedPrivateKey": "6PRKpn2ftLhcgPcU9TdkgmaQtxZHttzHNfYth1r2p8RZxQP63QJ726p52r"	
	// The Password is: Hey
		
	// Only use tokens: secrets = secrets.concat(combinations(tokens, '!!!!'));
	// ! is a single WILDCARD input                        (WILDCARD, '!!!!') 
	
	// To combine tokens with Wildcards (letters/Caseers) 
	// secrets  =  secrets.concat(combinations(letters,  tokens[0] +      '!'       + tokens[1] ));
	//  Where the result password generated is:           Array[0] + amount_letters +  Array[1] 
	// secrets = secrets.concat(combinations(letters, '!' + tokens[1] + tokens[2]));
	
var combinations = require('./combinations');

module.exports = (function() {

    var secrets = [],
        prefixedSecrets = [],
        suffixedSecrets = [],
        paddedSecrets = [],
        tokens = [
            'Part',
            'Of',
			'The',
			'Password',
        ],
		// Single Letter Sets
		Ais = ['a', 'A', '@', '4'],
		Bis = ['b', 'B', '8', '6'],	
		Cis = ['c', 'C', '('],	
		Dis = ['d', 'D'],			
		Eis = ['e', 'E', '3'],
		Fis = ['f', 'F'],	
		Gis = ['g', 'G', '9'],	
		His = ['h', 'H', '4'],
		Iis = ['i', 'I', '!', '1'],
		Jis = ['j', 'J'],	
		Kis = ['k', 'K'],	
		Lis = ['l', 'L', '7', '1'],			
		Mis = ['m', 'M'],
		Nis = ['n', 'N', '^'],	
		Ois = ['o', 'O', '0'],	
		Pis = ['p', 'P'],		
		Qis = ['q', 'Q'],
		Ris = ['r', 'R'],	
		Sis = ['s', 'S', '5'],	
		Tis = ['t', 'T', '1', '7'],			
		Uis = ['u', 'U'],
		Vis = ['v', 'V', '^'],	
		Wis = ['w', 'W', 'm', 'M', 'E'],	
		Xis = ['x', 'X'],
		Yis = ['y', 'Y'],
		Zis = ['z', 'Z'],
		// Alphabet small letters
		letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                   'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
		// Alphabet Case letters
		Caseers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                   'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
		// Digits/Numbers				   
        numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		// Other Signs
        dividers = ['|', '&', '+', '-', '_', ' ', ''];		
		
      
///////// To Generate the password Hey ///////////////
	// 1st Try: Eis = ['e', 'E', '3']
    secrets = secrets.concat(combinations(Eis, '!'));

	// 2nd Add: His = ['h', 'H', '4'] before Eis 
	secrets.forEach(function(secret) {
        prefixedSecrets = prefixedSecrets.concat(combinations(His, '!' + secret));
    });
    secrets = secrets.concat(prefixedSecrets);
	 
	 
    // 3rd Add: Yis = ['y', 'Y'] after Eis 
    secrets.forEach(function(secret) {
        suffixedSecrets = suffixedSecrets.concat(combinations(Yis, secret + '!'));
    });
    secrets = secrets.concat(suffixedSecrets);
    
	return secrets;

}());

