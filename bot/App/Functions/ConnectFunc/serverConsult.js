function consultarServidor() {
  const cnpj = 1111;
  const id_client = 1;


  let dataHoraAtual = new Date();
  let token = ''

  // Exibir a data e hora atual

  let dataHoraISO = dataHoraAtual.toISOString();

  return fetch('http://127.0.0.1:5000/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cnpj, id_client, dataHoraISO }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao consultar empresa.');
      }
      return response.json();
    })
    .then(data => {

      if (token === data){
        return token
      } else {
        if (data.length === 64)
          token = data
        return token
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      process.exit(1); // Encerra o script
    });
}

module.exports = consultarServidor;
