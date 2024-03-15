const menuControl = require("./menuControl");

function handleMainLevel(client, message, clientConversationState) {
    const greetings = ['boa noite', 'bom dia', 'boa tarde', 'ola', 'oi'];
    clientPhone = message.from
    if (!message.isGroupMsg && clientConversationState.getIdClient() === clientPhone) {
      count = 2;
      console.log('chegou mensagem de funil')
      const clientData = clientConversationState.getClientData();
      const nomeCliente = Array.isArray(clientData) && clientData.length > 0 ? clientData[0] : '';
      const menuMessage = `Olá ${nomeCliente}! ` +
          'Qual atendimento você precisa? (Digite apenas o número da opção desejada)\n' +
          '1 - Suporte Técnico (Apenas para quem possui contrato de manutenção).\n' +
          '2 - Pós Venda (Já possui maquinário ou software LENKE).\n' +
          '3 - Comercial Lenke\n' +
          '4 - Encerrar atendimento';      
      
      client.sendMessage(message.from, menuMessage)
        .then(() => {
          if (message.body.toLowerCase() === '4') {
            count = 0;
            client.sendMessage(message.from, 'Atendimento encerrado, continuamos a disposição para qualquer atendimento!');
          } else {
            let count = message.body
            clientConversationState.setStage(count)
            menuControl(client, message, clientConversationState)
          }
        })
        .catch((error) => console.error('Error when sending: ', error));
    }
  }

module.exports = handleMainLevel