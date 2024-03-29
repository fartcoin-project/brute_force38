BIP38_decrypter brute_force38
=================
## Installation

### Install dependencies

Download and install the latest version from:

* [Node.js LTS](https://nodejs.org/en/download/) (installs 'node' and 'npm')

### Clone repository

Clone the *BIP38* repository to a nice place on your machine via:

```
	git clone https://github.com/fartcoin-project/brute_force38.git
		cd brute_force38
		sudo chmod 775 *
		sudo chmod 775 -R *
		sudo chown $USER:$USER *
		sudo chown $USER:$USER -R *
```

### Build

Fire up your console at the project location and execute:

```
cd brute_force38
	npm install npm@latest -g
	npm install 

Go to: 
cd brute_force38/node_modules/bip38/index.js  (edit index.js)
Make a comment of line 128 to suppress the errors
	// assert.deepEqual(salt, checksum)

```

## Start and test if the Brute_force38 works
```
cd ~/brute_force38/	
	npm install
	./start.js  or sudo node start.js
```	

* You should now see a list of passwords in the terminal.
* Brute_force38 will now utilize all CPUs to test each password against your BIP38 private key. 
* Invalid passwords are saved in [invalid_secrets.json](./invalid_secrets.json) and will be imported next try.
* If the correct password has been found by brute_force38 the program will terminate the search. 
* The correct password will be saved in [valid_secret.json](./valid_secret.json).

## Configuration

1. Edit the [config.json](./config.json) and paste the `publicAddress` and `encryptedPrivateKey` values of your BIP38 encoded key.
2. Edit the [secrets.js](./secrets.js) so that it will return an array of all secrets you want to test on your BIP38 encoded key.

License
-------
*brute_force38* is released under the [MIT license](https://opensource.org/licenses/MIT).
