import { NowRequest, NowResponse } from '@vercel/node';

interface IBody {
  VeiculoId: number;
  UsuarioId: number;
  OperadorId: number;
  DataRetirada: Date;
  DataDevolucao: Date;
}

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
      VeiculoId,
      UsuarioId,
      OperadorId,
      DataRetirada,
      DataDevolucao,
    },
  }: { body: IBody } = request;

  response.status(200).send({
    VeiculoId,
    UsuarioId,
    OperadorId,
    DataRetirada,
    DataDevolucao,
  });
};

export default handler;
