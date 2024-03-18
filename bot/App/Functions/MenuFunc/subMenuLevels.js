const startClient = require('../ClientFunc/startClient')
const handleMainLevel = require('./mainMenuLevel')

function defineData(clientConversationState){
  const clientData = clientConversationState.getClientData()
  const nomeCliente = Array.isArray(clientData) && clientData.length > 0 ? clientData[0] : ''
  const nomeEmpresa = Array.isArray(clientData) && clientData.length > 1 ? clientData[1] : ''
  const nomeFilial = Array.isArray(clientData) && clientData.length > 2 ? clientData[2] : ''
  const data = [nomeCliente, nomeEmpresa, nomeFilial]
  return data
}

function subMenuOne(client, message, clientConversationState){
  const data = defineData(clientConversationState)
  const subMenuOneMessage = 'Para atendimento SUPORTE, você pode acessar o link abaixo:\n' +
                            `https:/wa.me/554899629548?text=Olá,%20me%20chamo%20${data[0]}%20e%20preciso%20de%20um%20atendimento%20suporte%20para%20a%20empresa%20${data[1]}%20na%20filial%20${data[2]}.`
  client.sendMessage(message.from, subMenuOneMessage)
}

function subMenuTwo(client, message, clientConversationState){
  const data = defineData(clientConversationState)
  const subMenuOneMessage = 'Para atendimento SUPORTE, você pode acessar o link abaixo:\n' +
                            `https:/wa.me/554896720902?text=Olá,%20me%20chamo%20${data[0]}%20e%20preciso%20de%20um%20atendimento%20pós-venda%20para%20a%20empresa%20${data[1]}%20na%20filial%20${data[2]}.`
  client.sendMessage(message.from, subMenuOneMessage)
}

function subMenuThree(client, message, clientConversationState){
  const data = defineData(clientConversationState)
  const subMenuOneMessage = 'Para atendimento SUPORTE, você pode acessar o link abaixo:\n' +
                            `https:/wa.me/554899629548?text=Olá,%20me%20chamo%20${data[0]}%20e%20preciso%20de%20um%20atendimento%20comercial%20para%20a%20empresa%20${data[1]}%20na%20filial%20${data[2]}.`
  client.sendMessage(message.from, subMenuOneMessage)
}


module.exports = {subMenuOne, subMenuTwo, subMenuThree}