class ConversationState {
    constructor() {
        this.stage = 0; // Estágio atual do atendimento
        this.clientData = {}; // Dados do cliente
        // Outras propriedades conforme necessário
    }

    // Métodos para interagir com o estado da conversa
    setStage(stage) {
        this.stage = stage;
    }

    getClientData() {
        return this.clientData;
    }

    setClientData(infos) {
        this.clientData = infos;
    }

    // Outros métodos conforme necessário
}

module.exports = ConversationState;
