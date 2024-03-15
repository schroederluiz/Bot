class ConversationState {
    constructor(clientPhone) {
        console.log('construiu o objeto')
        this.stage = '' // Estágio atual do atendimento
        this.clientData = {} // Dados do cliente
        this.idClient = clientPhone
        // Outras propriedades conforme necessário
    }

    getStage(){
        return this.stage
    }

    // Métodos para interagir com o estado da conversa
    setStage(count) {
        console.log('Entou no setStage ' + count)
        this.stage = count;
    }

    getClientData() {
        return this.clientData;
    }

    setClientData(infos) {
        console.log('entrou no setclient data')
        console.log(infos)
        this.clientData = infos;
        console.log(this);
    }

    setIdClient(clientPhone){
        this.idClient = clientPhone
    }

    getIdClient(){
        return this.idClient
    }
    // Outros métodos conforme necessário
}

module.exports = ConversationState;
