import jwt from 'jsonwebtoken';
import faker from 'faker';
import { NowRequest, NowResponse } from '@vercel/node';
import salt from '../../constants/salt';

const login = (emailOuCPF, senha) => !!emailOuCPF && !!senha;

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
      emailOuCPF,
      senha,
    },
  } = request;

  if (!login(emailOuCPF, senha)) {
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
