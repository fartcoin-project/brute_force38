'use strict';

var Bip38DecryptionHelper = require('./bip38_decryption_helper'),
    combinations = require('./combinations'),
    result;

process.on('message', function(message) {

    result = new Bip38DecryptionHelper(
                    message.publicAddress,
                    message.encryptedPrivateKey,
                    message.secret,
                    function log(message) { process.send(message); }
                 )
                 .decrypt()
                 .getResult();

    process.send('The passwords "' + message.secret + '" is ' + (result.isValidSecret ? 'valid' : 'invalid') + '.');

    process.exit(result.isValidSecret ? 0 : 1);
});
