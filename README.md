BIP38_decrypter brute-force
=================
## Installation

### Install dependencies

Download and install the latest version from:

* [Node.js LTS](https://nodejs.org/en/download/) (installs 'node' and 'npm')

### Clone repository

Clone the *BIP38* repository to a nice place on your machine via:

    git clone https://github.com/fartcoin-project/BIP38_decrypter.git
	
### Build

Fire up your console at the project location and execute:

    npm install -g n
    npm link
	npm install --save bip38
	
## Configuration

1. Edit the [config.json](./config.json) and paste the `publicAddress` and `encryptedPrivateKey` values of your BIP38 encoded key.
2. Edit the [secrets.js](./secrets.js) so that it will return an array of all secrets you want to test on your BIP38 encoded key.

## Start

Fire up your console at the project location and execute:

    ./start.js   or node start.js

The application will now utilize all available CPUs to test each secret against your BIP38 encoded private key. 
Invalid secrets are logged out to [invalid_secrets.json](./invalid_secrets.json). 
If a valid secret has been found it will be logged out to [valid_secret.json](./valid_secret.json).

License
-------
*brute-force BIP38* is released under the [MIT license](https://opensource.org/licenses/MIT).
