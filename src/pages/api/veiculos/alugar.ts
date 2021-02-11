import { NowRequest, NowResponse } from '@vercel/node';

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
      usuarioId,
      veiculoId,
      retirada,
      entrega,
    },
  } = request;

  response.status(200).send({
    usuarioId,
    veiculoId,
    retirada,
    entrega,
  });
};

export default handler;
