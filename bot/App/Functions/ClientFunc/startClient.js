const fs = require('fs');
const collectInfoClient = require('./CollectInfo');
const ConversationState = require('../../Classes/conversationState');
const menuControl = require('../MenuFunc/menuControl');

let stage = 0;

let createdClient = false

async function startClient(client) {
    client.on('message_create', async (message) => {
        try {
            if (message.isGroupMsg) {
                return;
            }

            const clientPhone = message.from;
            const greetings = ['boa noite', 'bom dia', 'boa tarde', 'ola', 'oi'];
            const isGreeting = message && message.body && greetings.includes(message.body.toLowerCase());
            // Verifica se já existe uma instância de ConversationState para este cliente
            console.log('Já existe instância de ConversationState para este cliente?', createdClient);
            if (!createdClient && isGreeting) {
                // Se não existir, cria uma nova instância e a mensagem enviada estiver dentro de greetings
                const clientConversationState = new ConversationState(clientPhone);  
                createdClient = true
                await collectInfo(client, message, clientConversationState, stage, clientPhone);
            } else {
                // Se já existir, continua o fluxo da conversa conforme o estado atual
                
                menuControl(client, message, clientConversationState)
            }
        } catch (error) {
            console.error('Erro ao processar mensagem: ', error);
        }
    });
}

async function collectInfo(client, message, clientConversationState, stage, clientPhone) {
    try {
        const { count, infos } = await collectInfoClient(client, message, clientConversationState, stage, clientPhone);

        // Passa as informações coletadas para o ConversationState
        console.log('===============================');
        console.log('Count:', count);
        console.log('Infos:', infos);
        console.log('===============================');
        
        clientConversationState.setClientData(infos);
        clientConversationState.setStage(count);
        console.log('Data:', clientConversationState);
        menuControl(client, message, clientConversationState)
    } catch (error) {
        console.error('Erro ao coletar informações:', error);
    }
}

module.exports = startClient