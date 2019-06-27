'use strict';

var CoinKey = require('coinkey'),
    bip38 = require('bip38'),
    wif = require('wif');

module.exports = class Bip38DecryptionHelper {

    constructor (publicAddress, encryptedPrivateKey, secret, log) {

        this.publicAddress = publicAddress;
        this.encryptedPrivateKey = encryptedPrivateKey;
        this.secret = secret;
        this.log = log || console.log;

        return this;
    }

    decrypt () {

        this.log('Decrypting "' + this.encryptedPrivateKey + '" with "' + this.secret + '"...');

        this.decryptedKey = bip38.decrypt(this.encryptedPrivateKey, this.secret, this.logProgessInPercent);

        this.privateKeyWif = wif.encode(128, this.decryptedKey.privateKey, this.decryptedKey.compressed);

        this.isValidSecret = this.publicAddressesMatch();

        return this;
    }

    getResult () {

        return {
            decryptedKey: this.decryptedKey,
            privateKeyWif: this.privateKeyWif,
            isValidSecret: this.isValidSecret
        }
    }

    logProgessInPercent (status) {

        return;

        var ansiEscapeCode = '\x1b[0G';

        process.stdout.write("Decrypting " + Math.round(status.percent) + '%' + ansiEscapeCode);
    }

    publicAddressesMatch () {

        var coinKey = CoinKey.fromWif(this.privateKeyWif)

        return coinKey.publicAddress === this.publicAddress;
    }
};
