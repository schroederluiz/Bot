const {subMenuOne, subMenuTwo, subMenuThree} = require("./SubMenuLevels");

async function getNextMessage(client, phoneNumber) {
  return new Promise(resolve => {
      client.on('message', async msg => {
          if (msg.from === phoneNumber) {
              resolve(msg);
          }
      });
  });
}

async function handleMainLevel(client, message, clientConversationState) {
  const greetings = ['boa noite', 'bom dia', 'boa tarde', 'ola', 'oi'];
  const clientPhone = message.from;

  if (!message.isGroupMsg && clientConversationState.getIdClient() === clientPhone) {
      console.log('chegou mensagem de funil');
      const clientData = clientConversationState.getClientData();
      const nomeCliente = Array.isArray(clientData) && clientData.length > 0 ? clientData[0] : '';
      const menuMessage = `Olá ${nomeCliente}! ` +
          'Qual atendimento você precisa? (Digite apenas o número da opção desejada)\n' +
          '1 - Suporte Técnico (Apenas para quem possui contrato de manutenção).\n' +
          '2 - Pós Venda (Já possui maquinário ou software LENKE).\n' +
          '3 - Comercial Lenke\n' +
          '4 - Encerrar atendimento';

      // Envia a mensagem do menu principal
      await client.sendMessage(message.from, menuMessage);

      // Aguarda a próxima mensagem do cliente
      const response = await getNextMessage(client, message.from);

      // Verifica se a resposta do cliente é válida
      const body = response.body.trim().toLowerCase();
      console.log(body);

      // Define o estágio da conversa
      clientConversationState.setStage(2);

      // Verifica a opção escolhida pelo cliente
      if (body === '1') {
          subMenuOne(client, response, clientConversationState);
      } else if (body === '2') {
          subMenuTwo(client, response, clientConversationState);
      } else if (body === '3') {
          subMenuThree(client, response, clientConversationState);
      } else if (body === '4') {
          client.sendMessage(message.from, 'Atendimento encerrado, continuamos à disposição para qualquer atendimento!');
      }
  }
}

module.exports = handleMainLevel;
