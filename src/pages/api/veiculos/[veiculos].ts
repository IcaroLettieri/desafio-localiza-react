import { NowRequest, NowResponse } from '@vercel/node';
import mockVeiculos from '../../../../mock/veiculos.json';

const handler = (request: NowRequest, response: NowResponse) => {
  const { query: { veiculos } } = request;
  const veiculo = mockVeiculos.filter((item) => item.veiculo === veiculos);
  if (veiculo.length >= 1) response.status(200).send(veiculo[0]);

  response.status(404).end();
};

export default handler;
