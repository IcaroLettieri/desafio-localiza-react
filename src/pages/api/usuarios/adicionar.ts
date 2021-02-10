import { NowRequest, NowResponse } from '@vercel/node';

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
      nome,
      sobrenome,
      email,
      // senha,
      cpf,
      endereco,
      enderecoNumero,
      complemento,
      bairro,
      cidade,
      estado,
    },
  } = request;

  // Salvar no banco de dados

  response.status(200).send({
    nome,
    sobrenome,
    email,
    // senha,
    cpf,
    endereco,
    enderecoNumero,
    complemento,
    bairro,
    cidade,
    estado,
  });
};

export default handler;
