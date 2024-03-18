function consultarServidor() {
    const cnpj = 2222;
    const id_client = 2;
  
    fetch('http://localhost:5000/consultar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cnpj, id_client }),
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
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  module.exports = consultarServidor