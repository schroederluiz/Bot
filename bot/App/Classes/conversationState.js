class ConversationState {
    constructor() {
        this.stage = 0; // Estágio atual do atendimento
        this.clientData = {}; // Dados do cliente
        // Outras propriedades conforme necessário
    }

    getStage(){
        return this.stage
    }

    // Métodos para interagir com o estado da conversa
    setStage(stage) {
        this.stage = stage;
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

    // Outros métodos conforme necessário
}

module.exports = ConversationState;
