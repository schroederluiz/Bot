const { MessageMedia } = require('whatsapp-web.js')
const ConversationState = require('../../Classes/conversationState')

async function collectInfoClient(client, message, stage, clientPhone) {
    const pendingReplies = new Map()
    try {
        let confirm = false
        let match = false
        if (stage === 0 && match === false) {
            count = 1

            client.sendMessage(message.from, 'Olá! 😎').then(() => {
                setTimeout(() => {
                    client.sendMessage(message.from, 'Um momento, já vou lhe encaminhar o cardápio! 🍔').then(() => {
                        setTimeout(() => {
                            let media = MessageMedia.fromFilePath('./app/Functions/imageFunc/image.png')
                            client.sendImage(message.from, ).catch(error => console.error('Erro ao enviar imagem:', error));
                        }, 2000);
                    }).catch(error => console.error('Erro ao enviar mensagem:', error));
                }, 2000);
            }).catch(error => console.error('Erro ao enviar mensagem:', error));
            coletarPedido(message)
        } else {
            await client.sendMessage(message.from, 'Dados enviados incorretamente, por favor, reenvie da forma correta.')
        }

        // Armazena o número de telefone do usuário como chave e uma Promise como valor
        pendingReplies.set(message.from, new Promise(resolve => {
            client.on('message_create', msg => {
                // Verifica se a mensagem é do usuário correto
                if (msg.from === message.from && msg.body) {
                    resolve(msg.body)
                }
            })
        }))

        // Aguarda a resposta do usuário
        const response = await pendingReplies.get(message.from)

        // Processa a resposta do usuário
        const splitResponse = response.split(',')
        if (splitResponse.length !== 3) {
            console.error('Resposta do usuário não está no formato esperado.')
            // Reinicia a função para permitir que o usuário digite novamente
            count = 0
            match = true
            collectInfoClient(client, message, stage, clientPhone)
        } else {
            const [nome, empresa, filial] = splitResponse
            const infos = [nome.trim(), empresa.trim(), filial.trim(), clientPhone]
            const clientConversationState = new ConversationState()
            // Mensagem de confirmação dos dados
            if (confirm === true) {
                await client.sendMessage(message.from, `Você digitou:\n\nNome: ${nome}\nEmpresa: ${empresa}\nFilial/unidade: ${filial}\n\nDigite "1" para confirmar ou "0" para encerrar.`)
                // Aguarda a resposta do usuário para confirmar ou encerrar
                await new Promise(resolve => {
                    client.on('message_create', async msg => {
                        if (msg.from === message.from && msg.body) {
                            if (msg.body === '1') {
                                // Confirmação recebida
                                resolve()
                            } else if (msg.body === '0') {
                                // Resposta igual a 0, encerra a conversa
                                client.sendMessage(message.from, 'Encerrando conversa.')
                                // Remova a Promise do Map após ser resolvida
                                pendingReplies.delete(message.from)
                                resolve() // Encerra a Promise
                            }
                        }
                    })
                })
            }
            // Remove a Promise do Map após ser resolvida
            pendingReplies.delete(message.from)

            // Retorna a confirmação e as informações do cliente
            return { count, infos, clientConversationState }
        }
    } catch (error) {
        console.error('Erro ao enviar ou receber mensagem: ', error)
        return null
    }
}

module.exports = collectInfoClient
