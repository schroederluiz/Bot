const startClient = require('../ClientFunc/startClient');
const handleMainLevel = require('./MainMenuLevel');

async function handleSubMenu(client, message, clientInfo) {
  if (!message.isGroupMsg) {  
    startClient(client, count)
    handleMainLevel(client, message, clienteInfo)
    console.log('chegou no submenu')
    switch (message.body.toLowerCase()) {
      case '1':
        count++;
        console.log('chegou no submenu 1')
        subMenuOne(clientInfo)
        break;
      case '2':
      case '3':
        count++;
        break;
      case '4':
        count = 1;
        handleMainLevel(client, message, clienteInfo)
        break;
      default:
        break;
      }
    }
  }

function subMenuOne(clientInfo){
  const subMenuOneMessage = 'Para atendimento SUPORTE, você pode acessar o link abaixo:\n' +
                            `https:/wa.me/554899629548?text=Olá,%20me%20chamo%20${clientInfo[1]}%20e%20preciso%20de%20um%20atendimento%20suporte%20para%20a%20empresa%20${clientInfo[2]}%20na%20filial%20${clientInfo[3]}.`
  client.sendText(message.from, subMenuOneMessage)
}
module.exports = handleSubMenu