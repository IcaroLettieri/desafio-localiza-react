import jwt from 'jsonwebtoken';
import faker from 'faker';
import { NowRequest, NowResponse } from '@vercel/node';
import salt from '../../constants/salt';

interface IBody {
  login: string;
  senha: string;
}

const checaLogin = (login, senha) => !!login && !!senha;

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
      login,
      senha,
    },
  }: { body: IBody } = request;

  if (!checaLogin(login, senha)) {
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
