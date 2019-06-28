'use strict';
/*   
						Edit Config.json 
		"publicAddress": "1BGkdHBg9dwCggjQznUP891Ukhp4jMDEfW",
		"encryptedPrivateKey": "6PRKpn2ftLhcgPcU9TdkgmaQtxZHttzHNfYth1r2p8RZxQP63QJ726p52r"	
		
	Examples for different BIP38encryptedKeys..  All from the same Private-Key/Address..
	privatekey: 5KKMVZFWPRYt8VxoWRB1AiRnUsuPKWUWbR5vYUvJ9xPtxKq1Uuu 
	Address is: 1BGkdHBg9dwCggjQznUP891Ukhp4jMDEfW 

	BIP38encryptedKey: 6PRKpn2ftLhcgPcU9TdkgmaQtxZHttzHNfYth1r2p8RZxQP63QJ726p52r Password: Hey
	BIP38encryptedKey: 6PRKpn2fsLwwr7TCvXCjyDzysVmrLYpYqejdvLgRyAmCwdatu789beydWp Password: 123406272019  
	BIP38encryptedKey: 6PRKpn2fsaDUoDgyqZPN6odzVL8zasrP9SPtYUQBWinHYF5Lvh2tnbibG7 Password: BitcoinDaytrader 

	Example Password is: Hey
*/	
var combinations = require('./combinations');

module.exports = (function() {

    var secrets = [],
        prefixedSecrets = [],
        suffixedSecrets = [],
        paddedSecrets = [],
        tokens = ['Part', 'Of', 'The', 'Password'],
		// Single Letter Sets
		As = ['a', 'A', '@', '4'],
		Bs = ['b', 'B', '8', '6'],	
		Cs = ['c', 'C', '('],	
		Ds = ['d', 'D'],			
		Es = ['e', 'E', '3'],
		Fs = ['f', 'F'],	
		Gs = ['g', 'G', '9'],	
		Hs = ['h', 'H', '4'],
		Is = ['i', 'I', '!', '1'],
		Js = ['j', 'J'],	
		Ks = ['k', 'K'],	
		Ls = ['l', 'L', '7', '1'],			
		Ms = ['m', 'M'],
		Ns = ['n', 'N', '^'],	
		Os = ['o', 'O', '0'],	
		Ps = ['p', 'P'],		
		Qs = ['q', 'Q'],
		Rs = ['r', 'R'],	
		Ss = ['s', 'S', '5'],	
		Ts = ['t', 'T', '1', '7'],			
		Us = ['u', 'U'],
		Vs = ['v', 'V', '^'],	
		Ws = ['w', 'W', 'm', 'M', 'E'],	
		Xs = ['x', 'X'],
		Ys = ['y', 'Y'],
		Zs = ['z', 'Z'],
		// Alphabet small letters
		letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                   'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
		// Alphabet Case letters
		Caseers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                   'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
		// Digits/Numbers				   
        numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		// Other Signs
        dividers = ['|', '&', '+', '-', '_', ' '];		
		
      
///////// To Generate the password Hey ///////////////
	// 1st  Es = ['e', 'E', '3']
    secrets = secrets.concat(combinations(Es, '!'));

	// 2nd Hs = ['h', 'H', '4'] before Es 
	secrets.forEach(function(secret) {
        prefixedSecrets = prefixedSecrets.concat(combinations(Hs, '!' + secret));
    });
    secrets = secrets.concat(prefixedSecrets);
	 	 
    // 3rd  after Hs,Es Ys = ['y', 'Y']
    secrets.forEach(function(secret) {
        suffixedSecrets = suffixedSecrets.concat(combinations(Ys, secret + '!'));
    });
    secrets = secrets.concat(suffixedSecrets);
    
	return secrets;

}());
/*	
	 Only try tokens: 
	 secrets = secrets.concat(combinations(tokens, '!!!!'));
	  ! is a single WILDCARD input                        (WILDCARD, '!!!!') 
	
	To combine tokens with Wildcards (letters/Caseers) 
	secrets  =  secrets.concat(combinations(letters,  tokens[0] +      '!'       + tokens[1] ));
	Where the result password generated is:           Array[0] + amount_letters +  Array[1] 
	secrets = secrets.concat(combinations(letters, '!' + tokens[1] + tokens[2]));
*/	