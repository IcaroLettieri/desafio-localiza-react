import jwt from 'jsonwebtoken';
import faker from 'faker';
import { NowRequest, NowResponse } from '@vercel/node';
import salt from '../../constants/salt';

interface IBody {
  Cpf: string;
  Senha: string;
}

const checaLogin = (Cpf, Senha) => !!Cpf && !!Senha;

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
      Cpf,
      Senha,
    },
  }: { body: IBody } = request;

  if (!checaLogin(Cpf, Senha)) {
    response.status(401).end();
    return;
  }

  const token = jwt.sign(
    {
      nome: faker.name.firstName(),
      sobrenome: faker.name.lastName(),
    },
    salt,
  );

  response.status(200).send({
    token,
  });
};

export default handler;
