const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const startClient = require('../ClientFunc/startClient')
const consultarServidor = require('./serverConsult')


// Create a new client instance
function ConnectWPP() {
    const client = new Client({
        authStrategy: new LocalAuth()
    })

    // When the client is ready, run this code (only once)
    client.once('ready', () => {
        console.log('Client is ready!')
    })

    // When the client received QR-Code
    client.on('qr', qr => {
        qrcode.generate(qr, { small: true })
    })

    // Start your client
    const token = consultarServidor();
    if (token.length === 64) {
        client.initialize()

        startClient(client)
    }

}

module.exports = ConnectWPP