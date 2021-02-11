import { NowRequest, NowResponse } from '@vercel/node';

interface IBody {
  id: number; // ID do agendamento
  carroLimpo: boolean;
  tanqueCheio: boolean;
  tanqueLitroPendente: number;
  amassados: boolean;
  arranhoes: boolean;
}

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
      id,
      carroLimpo,
      tanqueCheio,
      tanqueLitroPendente,
      amassados,
      arranhoes,
    },
  }: { body: IBody } = request;

  // TODO: Adicionar validação

  response.status(200).send({
    id,
    carroLimpo,
    tanqueCheio,
    tanqueLitroPendente,
    amassados,
    arranhoes,
  });
};

export default handler;
