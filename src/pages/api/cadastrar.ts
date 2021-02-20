import { NowRequest, NowResponse } from '@vercel/node';

interface IBody {
  Cpf: string;
  Nome: string;
  Senha: string;
  DataNascimento: Date;
  Cep: string;
  Logradouro: string;
  Numero: number;
  Complemento: string;
  Cidade: string;
  Estado: string;
}

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
      Cpf,
      Nome,
      Senha,
      DataNascimento,
      Cep,
      Logradouro,
      Numero,
      Complemento,
      Cidade,
      Estado,
    },
  }: { body: IBody } = request;

  // Salvar no banco de dados

  response.status(200).send({
    Cpf,
    Nome,
    Senha,
    DataNascimento,
    Cep,
    Logradouro,
    Numero,
    Complemento,
    Cidade,
    Estado,
  });
};

export default handler;
