const wppconnect = require('@wppconnect-team/wppconnect');
const startClient = require('../ClientFunc/startClient');

function ConnectWPP() {
    wppconnect
    .create({
        session: 'sessionName',
        catchQR: (base64Qr, asciiQR) => {
        console.log(asciiQR);
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');

        var imageBuffer = response;
        require('fs').writeFile(
            'out.png',
            imageBuffer['data'],
            'binary',
            function (err) {
            if (err != null) {
                console.log(err);
            }
            }
        );
        },
        logQR: false,
    })
    .then((client) => {
        startClient(client);
    })
    .catch((error) => console.log(error));
}

module.exports = ConnectWPP;