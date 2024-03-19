function consultarServidor() {
  const cnpj = 2222;
  const id_client = 2;
  let dataHoraAtual = new Date();
  let token = ''

  // Exibir a data e hora atual
  console.log("Data e hora atual:", dataHoraAtual);

  let dataHoraISO = dataHoraAtual.toISOString();
  console.log('datahora toiso: ' + dataHoraISO)


  fetch('http://localhost:5000/consultar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cnpj, id_client, dataHoraISO }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao consultar o servidor.');
      }
      console.log(response)
      return response.json();
    })
    .then(data => {
      console.log('Resposta do servidor:', data);
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
    });
}

module.exports = consultarServidor