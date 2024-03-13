function nextStage(stage, clientConversationState) {
    stage = stage++
    clientConversationState.setStage(stage);
}

function previousStage(stage, clientConversationState) {
    stage = stage--
    clientConversationState.setStage(stage);
}

function resetStage(clientConversationState) {
    clientConversationState.setStage(1)
}

module.exports = { nextStage, previousStage };