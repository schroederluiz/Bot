async function collectInfoClient(client, message, clientConversationState, stage, clientPhone) {
  const pendingReplies = new Map();
  try {
      let confirm = false;
      if (stage === 0) {
          count = 1;

          console.log('chegou na mensagem inicial');
          client.sendMessage(message.from, 'Bem vindo a central de atendimento Lenke Automação!');
          await client.sendMessage(message.from, 'Digite seu nome, empresa e filial separados por vírgula (,):');

          confirm = true;
      }

      // Armazena o número de telefone do usuário como chave e uma Promise como valor
      pendingReplies.set(message.from, new Promise(resolve => {
          console.log('chegou na armazenagem do número');
          client.on('message_create', msg => {
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
      console.log(splitResponse)
      if (splitResponse.length !== 3) {
          console.error('Resposta do usuário não está no formato esperado.');
          // Reinicia a função para permitir que o usuário digite novamente
          count = 0;
          collectInfoClient(client, message, clientConversationState, count);
      } else {
          const [nome, empresa, filial] = splitResponse;
          const infos = [nome.trim(), empresa.trim(), filial.trim(), clientPhone];
          // Mensagem de confirmação dos dados
          if (confirm === true) {
              await client.sendMessage(message.from, `Você digitou:\n\nNome: ${nome}\nEmpresa: ${empresa}\nFilial/unidade: ${filial}\n\nDigite "1" para confirmar ou "0" para encerrar.`);
              // Aguarda a resposta do usuário para confirmar ou encerrar
              await new Promise(resolve => {
                  client.on('message_create', async msg => {
                      if (msg.from === message.from && msg.body) {
                          if (msg.body === '1') {
                              // Confirmação recebida
                              resolve();
                          } else if (msg.body === '0') {
                              // Resposta igual a 0, encerra a conversa
                              client.sendMessage(message.from, 'Encerrando conversa.');
                              // Remova a Promise do Map após ser resolvida
                              pendingReplies.delete(message.from);
                              resolve(); // Encerra a Promise
                          }
                      }
                  });
              });
          }
          // Remove a Promise do Map após ser resolvida
          pendingReplies.delete(message.from);

          // Retorna a confirmação e as informações do cliente
          console.log('============================')
          console.log(infos)
          console.log(count)
          console.log('============================')
          return { count, infos};
      }
  } catch (error) {
      console.error('Erro ao enviar ou receber mensagem: ', error);
      return null;
  }
}

module.exports = collectInfoClient;
