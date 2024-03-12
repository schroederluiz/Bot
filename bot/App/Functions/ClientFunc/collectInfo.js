const ConversationState = require('../../Classes/conversationState');

async function collectInfoClient(client, message, clientData, count) {
    const pendingReplies = new Map();
    try {
      if (!clientData) {
        count = 1

        console.log('chegou na mensagem inicial');
        
        await client.sendText(message.from, 'Bem vindo a central de atendimento Lenke Automação! Digite seu nome, empresa e filial separados por vírgula (,):');
        
        clientData = true;

        clientConversationState.setStage(count)
        clientConversationState.setClientData(infos)
      }
  
      // Armazena o número de telefone do usuário como chave e uma Promise como valor
      pendingReplies.set(message.from, new Promise(resolve => {
        console.log('chegou na armazenagem do número');
        client.onMessage(msg => {
          // Verifica se a mensagem é do usuário correto
          if (msg.from === message.from && msg.body) {
            console.log('chegou na verificação de chat');
            resolve(msg.body);
          }
        });
      }));
  
      // Aguarda a resposta do usuário
      const response = await pendingReplies.get(message.from);
  
      // Processa a resposta do usuário
      const splitResponse = response.split(',');
      if (splitResponse.length !== 3) {
        console.error('Resposta do usuário não está no formato esperado.');
        // Reinicia a função para permitir que o usuário digite novamente
        return await collectInfoClient(client, message, dadosClienteSolicitados);
      } else {
        const [nome, empresa, filial] = splitResponse;
        const infos = [nome.trim(), empresa.trim(), filial.trim()];
  
        // Mensagem de confirmação dos dados
        await client.sendText(message.from, `Você digitou:\n\nNome: ${nome}\nEmpresa: ${empresa}\nFilial/unidade: ${filial}\n\nDigite "confirmar" para confirmar ou qualquer outra coisa para encerrar.`);
  
        // Aguarda a resposta do usuário para confirmar ou encerrar
        const confirmationResponse = await pendingReplies.get(message.from);
        const confirmation = confirmationResponse.trim().toLowerCase();
  
        // Remove a Promise do Map após ser resolvida
        pendingReplies.delete(message.from);
  
        // Retorna a confirmação e as informações do cliente
        return { confirmation, infos };
      }
    } catch (error) {
      console.error('Erro ao enviar ou receber mensagem: ', error);
      return null;
    }
  }
  
  module.exports = collectInfoClient;
  