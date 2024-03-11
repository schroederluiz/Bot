const fs = require('fs');
const collectInfoClient = require('./CollectInfo');
const handleMainLevel = require('../MenuFunc/MainMenuLevel');
const handleSubMenu = require('../MenuFunc/SubMenuLevels');
const ConversationState = require('../../Classes/conversationState');

const conversationStates = new Map();

let count = 0;

async function startClient(client) {
    client.onMessage(async (message) => {
        try {
            if (message.isGroupMsg) {
                return;
            }
            const clientPhone = message.from;

            // Verifica se já existe uma instância de ConversationState para este cliente
            if (!conversationStates.has(clientPhone)) {
                // Se não existir, cria uma nova instância
                const clientConversationState = new ConversationState();

                // Inicia o processo de coleta de informações do cliente
                const { confirmation, infos } = await collectInfo(client, message, clientConversationState);
                
                clientConversationState.setStage(count)
                clientConversationState.setClientData(infos)
                conversationStates.set(clientPhone, clientConversationState)
            } else {
                // Se já existir, continua o fluxo da conversa conforme o estado atual
                const clientConversationState = conversationStates.get(clientPhone);
                switch (clientConversationState.getStage()) {
                    case 0:
                        await handleMainLevel(client, message, clientConversationState.getClientData());
                        break;
                    case 1:
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

async function collectInfo(client, message, conversationState) {
    await collectInfoClient(client, message, conversationState);
    // Após coletar as informações do cliente, avança para o próximo estágio da conversa
    conversationState.nextStage();
}

module.exports = startClient;
