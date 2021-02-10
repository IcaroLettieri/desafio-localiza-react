import veiculos from '../../../../mock/veiculos.json';

const handler = (_, response) => {
  response.send(veiculos);
};

export default handler;
