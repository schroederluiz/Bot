const startClient = require('../ClientFunc/startClient');
const handleMainLevel = require('./MainMenuLevel');

async function handleSubMenu(client, message, clientConversationState) {
  if (!message.isGroupMsg) { 
    console.log('chegou no submenu')
    switch (message.body.toLowerCase()) {
      case '1':
        count++;
        console.log('chegou no submenu 1')
        subMenuOne(clientConversationState)
        break;
      case '2':
      case '3':
        count++;
        break;
      case '4':
        count = 1;
        handleMainLevel(client, message, clientConversationState)
        break;
      default:
        break;
      }
    }
  }

function subMenuOne(clientConversationState){
  const clientData = clientConversationState.getClientData();
  const nomeCliente = Array.isArray(clientData) && clientData.length > 0 ? clientData[0] : ''
  const nomeEmpresa = Array.isArray(clientData) && clientData.length > 0 ? clientData[0] : ''
  const nomeFilial = Array.isArray(clientData) && clientData.length > 0 ? clientData[0] : '';
  const subMenuOneMessage = 'Para atendimento SUPORTE, você pode acessar o link abaixo:\n' +
                            `https:/wa.me/554899629548?text=Olá,%20me%20chamo%20${nomeCliente}%20e%20preciso%20de%20um%20atendimento%20suporte%20para%20a%20empresa%20${nomeEmpresa}%20na%20filial%20${nomeFilial}.`
  client.sendMessage(message.from, subMenuOneMessage)
}
module.exports = handleSubMenu