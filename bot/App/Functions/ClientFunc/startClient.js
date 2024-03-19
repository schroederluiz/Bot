const fs = require('fs')
const collectInfoClient = require('./CollectInfo')
const handleMainLevel = require('../MenuFunc/mainMenuLevel')
const validaToken = require('../ConnectFunc/validaToken')

let stage = 0

let createdClient = false

async function startClient(client, token) {
    client.on('message_create', async (message) => {
        try {
            if (message.isGroupMsg) {
                return
            }
            if (validaToken()) {
                const clientPhone = message.from

                console.log(message.body)
                const greetings = ['boa noite', 'bom dia', 'boa tarde', 'ola', 'oi']
                const isGreeting = message && message.body && greetings.includes(message.body.toLowerCase())
                // Verifica se já existe uma instância de ConversationState para este cliente
                if (isGreeting && !message.isGroupMsg && createdClient === false) {
                    // Se não existir, cria uma nova instância e a mensagem enviada estiver dentro de greeting 
                    await collectInfo(client, message, clientPhone, token)
                }
            }
        } catch (error) {
            console.error('Erro ao processar mensagem: ', error)
        }
    })
}

async function collectInfo(client, message, clientPhone, token) {
    try {
        if (validaToken(token)){
        const { count, infos, clientConversationState } = await collectInfoClient(client, message, stage, clientPhone)

        // Passa as informações coletadas para o ConversationState
        console.log('===============================')
        console.log('Count:', count)
        console.log('Infos:', infos)
        console.log('===============================')

        clientConversationState.setClientData(infos)
        clientConversationState.setStage(count)
        clientConversationState.setIdClient(clientPhone)
        console.log('Data:', clientConversationState)
        handleMainLevel(client, message, clientConversationState)
        } 
    } catch (error) {
        console.error('Erro ao coletar informações:', error)
    }
}

module.exports = startClient