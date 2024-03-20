const consultarServidor = require("./serverConsult");

function validaToken(token) {
    if (token) {
        return token
    } else {
        console.error('Erro ao processar mensage: Token inválido.')
    }
}

module.exports = validaToken