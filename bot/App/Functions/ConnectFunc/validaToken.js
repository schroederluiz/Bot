const consultarServidor = require("./serverConsult");

function validaToken(token) {
    if (token === consultarServidor() && token.length() === 64){
        return token
    } else {
        console.error('Erro ao processar mensage: Token inválido.')
    }
}

module.exports = validaToken