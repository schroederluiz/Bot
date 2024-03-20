// Função para coletar o pedido do cliente
async function coletarPedido(client, message) {
    console.log('Entrou coleta pedido');
    try {
        if (message.isGroupMsg) {
            const pedido = message.body; // O pedido do cliente
            console.log('Pedido do cliente:', pedido);

            // Use expressões regulares para encontrar palavras-chave específicas no pedido
            const palavrasChave = /(?:^|\W)(x\-?|refr|bat)\w*/gi;
            const palavrasChaveEncontradas = pedido.match(palavrasChave);

            if (palavrasChaveEncontradas) {
                console.log('Palavras-chave encontradas:', palavrasChaveEncontradas);

                // Construa a mensagem de confirmação de pedido mostrando as palavras-chave coletadas
                const mensagemConfirmacao = palavrasChaveEncontradas.map(palavra => `- ${palavra}`).join('\n');

                // Envie a mensagem de confirmação ao cliente e solicite confirmação
                client.sendMessage(message.from, `Obrigado pelo seu pedido!\nSeu pedido:\n${mensagemConfirmacao}\n\nSeu pedido está correto? (Digite S/N)`);

                // Defina um ouvinte de mensagem para esperar a resposta do cliente
                client.once('message', async resposta => {
                    if (resposta.from === message.from && !resposta.fromMe) {
                        const confirmacao = resposta.body.toLowerCase();
                        if (confirmacao === 's') {
                            // Se a confirmação for 'S', agradeça o pedido e pare de ouvir mensagens
                            await client.sendMessage(message.from, 'Obrigado pelo seu pedido! A equipe já está trabalhando nele.');
                        } else if (confirmacao === 'n') {
                            // Se a confirmação for 'N', chame a função novamente para coletar o pedido novamente
                            await coletarPedido(client, message);
                        } else {
                            // Se a resposta não for reconhecida, peça para digitar 'S' ou 'N'
                            let resp = await client.sendMessage(message.from, 'Por favor, responda com "S" para sim ou "N" para não.');
                            // Continue ouvindo por uma resposta até que seja uma confirmação válida
                            if (resp.trim().toLowerCase() === 'n') {
                                coletarPedido(client, message)
                            } else {
                                console.log('deu boa da silva souza junior')
                                return
                            }
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.log('Nenhuma palavra-chave encontrada no pedido.');
        await client.sendMessage(message.from, 'Desculpe, não foi possível identificar o pedido. Por favor, tente novamente.');
        // Continue ouvindo por uma mensagem até que seja uma confirmação válida
    }
}
module.exports = coletarPedido;