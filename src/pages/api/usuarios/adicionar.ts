import { NowRequest, NowResponse } from '@vercel/node';

type TipoCadastro = 'Cliente' | 'Operador';

interface IBody {
  cpfMatricula: string;
  nome: string;
  tipoCadastro: TipoCadastro;
  cep: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
}

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
      cpfMatricula,
      nome,
      tipoCadastro,
      cep,
      logradouro,
      numero,
      cidade,
      estado,
    },
  }: { body: IBody } = request;

  // Salvar no banco de dados

  response.status(200).send({
    cpfMatricula,
    nome,
    tipoCadastro,
    cep,
    logradouro,
    numero,
    cidade,
    estado,
  });
};

export default handler;
