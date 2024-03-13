const fs = require('fs');
const collectInfoClient = require('./CollectInfo');
const handleMainLevel = require('../MenuFunc/MainMenuLevel');
const handleSubMenu = require('../MenuFunc/SubMenuLevels');
const ConversationState = require('../../Classes/conversationState');

const conversationStates = new Map();

async function startClient(client) {
    client.onMessage(async (message) => {
        try {
            if (message.isGroupMsg) {
                return;
            }

            const clientPhone = message.from;
            const greetings = ['boa noite', 'bom dia', 'boa tarde', 'ola', 'oi'];
            const isGreeting = message && message.body && greetings.includes(message.body.toLowerCase());
            // Verifica se já existe uma instância de ConversationState para este cliente
            if (!conversationStates.has(clientPhone) && isGreeting) {
                // Se não existir, cria uma nova instância e a mensagem enviada estiver dentro de greetings
                const clientConversationState = new ConversationState();
                    
                await collectInfo(client, message, clientConversationState);

                conversationStates.set(clientPhone, clientConversationState);
            } else {
                // Se já existir, continua o fluxo da conversa conforme o estado atual
                const clientConversationState = conversationStates.get(clientPhone);
                console.log('Client Conversation State');
                console.log(clientConversationState);
                switch (clientConversationState.getStage()) {
                    case 1:
                        await handleMainLevel(client, message, clientConversationState.getClientData());
                        break;
                    case 2:
                        await handleSubMenu(client, message, clientConversationState.getClientData());
                        break;
                    default:
                        console.log('Atendimento encerrado.');
                        // Remove a instância de ConversationState quando o atendimento é encerrado
                        conversationStates.delete(clientPhone);
                        break;
                }
            }
        } catch (error) {
            console.error('Erro ao processar mensagem: ', error);
        }
    });
}

async function collectInfo(client, message, clientConversationState) {
    const infos = await collectInfoClient(client, message, clientConversationState);

    // Passa as informações coletadas para o ConversationState
    clientConversationState.setClientData(infos);
    console.log('Data: ' + clientConversationState.getClientData())
    // Após coletar as informações do cliente, avança para o próximo estágio da conversa
}

module.exports = startClient;