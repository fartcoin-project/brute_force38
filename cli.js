'use strict';

var path = require('path'),
    childProcess = require('child_process'),
    os = require('os'),
    fs = require('fs'),
    workerPath = path.normalize(path.join(__dirname, 'worker.js')),
    invalidSecretsPath = path.join(__dirname, 'invalid_secrets.json'),
    validSecretPath = path.join(__dirname, 'valid_secret.json'),
    numberOfAvailableCPUs = os.cpus().length,
    secrets = require('./secrets'),
    config = require('./config.json'),
    invalidSecrets = [],
    testedSecrets = 0,
    index = 0,
    invalidSecretsSaveInterval;

process.on('exit', function () {

    clearCurrentLine();

    console.log('Progress: ' + currentProgressInPercent() + '% (' + testedSecrets + '/' + secrets.length + ')');

    console.log('Total processing time: ' + process.uptime().toFixed(2) + ' seconds');
    console.log('Processing time per passwords: ' + (process.uptime() / testedSecrets).toFixed(2) + ' seconds');

    process.stdout.write('\x07');
    process.exit(0);
});

process.on('SIGINT', process.exit);

console.log('Brute-Force ' + secrets.length + ' passwords on ' + numberOfAvailableCPUs + ' CPU cores...');
console.log('Public address: ' + config.publicAddress);
console.log('BIP38 encrypted private key: ' + config.encryptedPrivateKey);
console.log('Loading previous passwords from "' + invalidSecretsPath + '"...');

try {
    fs.statSync(invalidSecretsPath);
    invalidSecrets = JSON.parse(fs.readFileSync(invalidSecretsPath, 'utf8'));
    console.log('Imported ' + invalidSecrets.length + ' invalid passwords that will be skipped.');
}
catch (error) {
    console.log('No invalid passwords have been found, moving on...');
}

console.log('Filtering passwords...');
secrets = secrets.filter(function removeInvalidSecret (secret) {

    return invalidSecrets.indexOf(secret) === -1
});

console.log('Decrypting with ' + secrets.length + ' passwords...');

if (secrets.length === 0) {

    process.exit(0);
};

logProgress();

while (numberOfAvailableCPUs--) {

    setTimeout(spawnWorker, numberOfAvailableCPUs * 100);
}

invalidSecretsSaveInterval = setInterval(saveInvalidSecretsToFile, 10000);

function spawnWorker () {

    var workerProcess;

    if (index + 1 > secrets.length) {
        return;
    }
	
    workerProcess = childProcess.fork(workerPath);

    workerProcess.secret = secrets[index];

    workerProcess.send({
        publicAddress: config.publicAddress,
        encryptedPrivateKey: config.encryptedPrivateKey,
        secret: secrets[index]
    });
	
    index++;

    workerProcess.on('exit', function (exitCode) {

        testedSecrets++;

        logProgress();

        if (exitCode === 0) {

            clearCurrentLine();
            console.log('Password Found saved to "' + validSecretPath + '"...');

            fs.writeFile(
                validSecretPath,
                JSON.stringify([workerProcess.secret], null, 4),
                'utf8',
                function (error) {

                    if (error) {
                        console.log(error);
                    }

                    console.log('Search is complete...');
                    process.exit(0);
                }
            );

            return;
        }

        invalidSecrets.push(workerProcess.secret);

        if (testedSecrets === secrets.length) {

            clearInterval(invalidSecretsSaveInterval);
            saveInvalidSecretsToFile();
        }

        spawnWorker();
    });
}

function logProgress () {

    var secretsToCheck = secrets.length - testedSecrets,
        estimatedDuration = testedSecrets === 0
                          ? 'calculating estimated duration...'
                          : 'finished in ~ ' + formatSeconds((process.uptime() / testedSecrets) * secretsToCheck);
		
    clearCurrentLine();
	console.log(secrets[index]);
    process.stdout.write(
        'Progress: ' + currentProgressInPercent() + '% ' +
        '(' + testedSecrets + '/' + secrets.length + ')' 
		+ ', ' + estimatedDuration 
    );
};

function formatSeconds (seconds) {

    var days = Math.floor(seconds / 86400),
        hhmmss = new Date(seconds * 1000).toISOString().substr(11, 8);

    return days + ':' + hhmmss;
};

function currentProgressInPercent () {

    var percentComplete = secrets.length === 0 ? 100 : testedSecrets * 100 / secrets.length;

    return Math.round(percentComplete * 100) / 100;
};

function clearCurrentLine () {

    process.stdout.write('\x1b[0G\x1b[0K');
};

function saveInvalidSecretsToFile () {

    fs.writeFile(
        invalidSecretsPath,
        JSON.stringify(invalidSecrets, null, 4),
        'utf8',
        function (error) {

            if (error) {
                console.log(error);
            }
        }
    );
}
