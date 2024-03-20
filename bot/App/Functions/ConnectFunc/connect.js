const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const startClient = require('../ClientFunc/startClient')
const consultarServidor = require('./serverConsult')
const validaToken = require('./validaToken')


// Create a new client instance
async function ConnectWPP() {
    const token = await consultarServidor();
    console.log('saiu consultar servidor')
    if (validaToken(token)) {
        console.log('if connection')
        const client = new Client({
            authStrategy: new LocalAuth()
        })
        console.log(client)

        // When the client is ready, run this code (only once)
        client.once('ready', async () => {
            console.log('Client is ready!')
            startClient(client, token)
        })

        // When the client received QR-Code
        client.on('qr', qr => {
            qrcode.generate(qr, { small: true })
        })

        // Start your client
        client.initialize()
    }
}

module.exports = ConnectWPP