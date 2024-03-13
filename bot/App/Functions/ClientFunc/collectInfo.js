const { nextStage, previousStage } = require('../MenuFunc/stageControl');

async function collectInfoClient(client, message, clientConversationState) {
    const pendingReplies = new Map();
    let stage = clientConversationState.getStage()
    try {
      let confirm = false
      if (stage === 0) {
        nextStage(stage, clientConversationState)

        console.log('chegou na mensagem inicial');
        client.sendText(message.from, 'Bem vindo a central de atendimento Lenke Automação!')
        await client.sendText(message.from, 'Digite seu nome, empresa e filial separados por vírgula (,):')

        confirm = true

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
        previousStage(stage, clientConversationState)
        collectInfoClient(client, message, clientConversationState);
      } else {
        const [nome, empresa, filial] = splitResponse;
        const infos = [nome.trim(), empresa.trim(), filial.trim()];
        // Mensagem de confirmação dos dados
        if (confirm === true) {
          await client.sendText(message.from, `Você digitou:\n\nNome: ${nome}\nEmpresa: ${empresa}\nFilial/unidade: ${filial}\n\nDigite "1" para confirmar ou "0" para encerrar.`);
          // Aguarda a resposta do usuário para confirmar ou encerrar
          await new Promise(resolve => {
              client.onMessage(async msg => {
                  if (msg.from === message.from && msg.body) {
                      if (msg.body === '1') {
                          // Confirmação recebida
                          resolve();
                      } else if (msg.body === '0') {
                          // Resposta igual a 0, encerra a conversa
                          client.sendText(message.from, 'Encerrando conversa.');
                          // Remova a Promise do Map após ser resolvida
                          pendingReplies.delete(message.from);
                          resolve(); // Encerra a Promise
                      }
                  }
              });
          });
        }            
        clientConversationState.setStage(1)
        clientConversationState.setClientData(infos)
        // Remove a Promise do Map após ser resolvida
        pendingReplies.delete(message.from);
  
        // Retorna a confirmação e as informações do cliente
        return infos
      }
    } catch (error) {
      console.error('Erro ao enviar ou receber mensagem: ', error);
      return null;
    }
  }
  
module.exports = collectInfoClient;