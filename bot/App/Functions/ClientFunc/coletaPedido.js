// Função para coletar o pedido do cliente
async function coletarPedido(message) {
    // Envie uma mensagem solicitando o pedido
    await client.sendMessage(message.from, 'O que vai querer hoje? 🍕');

    // Aguarde a resposta do cliente
    client.on('message', async message => {
        // Verifique se a mensagem é do mesmo remetente e não é uma mensagem do bot
        if (message.from === message.from && !message.fromMe) {
            const pedido = message.body; // O pedido do cliente
            console.log('Pedido do cliente:', pedido);

            // Use expressões regulares para encontrar palavras-chave específicas no pedido
            const palavrasChave = /(?:^|\W)(x\-?|refr|bat)\w*/gi;
            const palavrasChaveEncontradas = pedido.match(palavrasChave);

            if (palavrasChaveEncontradas) {
                console.log('Palavras-chave encontradas:', palavrasChaveEncontradas);

                // Construa a mensagem de confirmação de pedido mostrando as palavras-chave coletadas
                 await client.sendMessage('Obrigado pelo seu pedido!')
                 await client.sendMessage('seu pedido:');
                 let mensagemConfirmacao = ''
                palavrasChaveEncontradas.forEach(palavra => {
                    mensagemConfirmacao += `- ${palavra}\n`;
                });

                // Envie a mensagem de confirmação ao cliente e solicite confirmação
                await client.sendMessage(message.from, mensagemConfirmacao +'\n\n Seu pedido está correto? (Digite S/N)');
                
                // Aguarde a resposta do cliente
                client.on('message', async resposta => {
                    if (resposta.from === message.from && !resposta.fromMe) {
                        const confirmacao = resposta.body.toLowerCase();
                        if (confirmacao === 's') {
                            // Se a confirmação for 'S', agradeça o pedido e encerre a função
                            await client.sendMessage(message.from, 'Obrigado pelo seu pedido! A equipe já está trabalhando nele.');
                        } else if (confirmacao === 'n') {
                            // Se a confirmação for 'N', chame a função novamente para coletar o pedido novamente
                            await coletarPedido(message);
                        } else {
                            // Se a resposta não for reconhecida, peça para digitar 'S' ou 'N'
                            await client.sendMessage(message.from, 'Por favor, responda com "S" para sim ou "N" para não.');
                        }
                    }
                });
            } else {
                console.log('Nenhuma palavra-chave encontrada no pedido.');
                await client.sendMessage(message.from, 'Desculpe, não foi possível identificar o pedido. Por favor, tente novamente.');
            }
        }
    });
}
