const handleMainLevel = require('./MainMenuLevel');
const handleSubMenu = require('./SubMenuLevels');

async function menuControl(client, message, clientConversationState){
    console.log('Entrou no menuControl');
    switch (clientConversationState.getStage()) {
        case 1:
            console.log('Passando para o handleMainLevel');
            await handleMainLevel(client, message, clientConversationState);
            break;
        case 2:
            console.log('Passando para o handleSubMenu');
            await handleSubMenu(client, message, clientConversationState.getClientData());
            break;
        default:
            console.log('Atendimento encerrado.');
            // Remove a instância de ConversationState quando o atendimento é encerrado
            clientConversationState.delete(clientPhone);
            break;
    }
}

module.exports = menuControl