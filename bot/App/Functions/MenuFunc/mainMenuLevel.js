function handleMainLevel(client, message, clientInfo) {
    const greetings = ['boa noite', 'bom dia', 'boa tarde', 'ola', 'oi'];
    const isGreeting = message && message.body && greetings.includes(message.body.toLowerCase());
    if (!message.isGroupMsg && isGreeting) {
      count = 1;
      console.log('chegou mensagem de funil')
      const menuMessage = `Olá ${clientInfo ? clienteInfo.nomeCliente : ''} !` +
        'Qual atendimento você precisa? (Digite apenas o número da opção desejada)\n' +
        '1 - Suporte Técnico (Apenas para quem possui contrato de manutenção).\n' +
        '2 - Pós Venda (Já possui maquinário ou software LENKE).\n' +
        '3 - Comercial Lenke\n' +
        '4 - Encerrar atendimento';
      client.sendText(message.from, menuMessage)
        .then(() => {
          if (message.body.toLowerCase() === '4') {
            count = 0;
            client.sendText(message.from, 'Atendimento encerrado, continuamos a disposição para qualquer atendimento!');
          }
        })
        .catch((error) => console.error('Error when sending: ', error));
    }
  }

module.exports = handleMainLevel