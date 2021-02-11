import { NowResponse } from '@vercel/node';
import faker from 'faker';

const handler = (_, response: NowResponse) => {
  const veiculos = [];
  const combustiveis = ['Álcool', 'Gasolina', 'Diesel'];
  const categorias = ['Básico', 'Completo', 'Luxo'];

  for (let i = 1; i < 101; i++) {
    veiculos.push({
      id: i,
      modelo: faker.vehicle.model(),
      marca: faker.vehicle.manufacturer(),
      placa: faker.vehicle.vin(),
      valorHora: faker.commerce.price(15, 150),
      capacidadePortaMalas: faker.random.number({ min: 250, max: 700 }),
      capacidadeTanque: faker.random.number({ min: 250, max: 700 }),
      combustivel: combustiveis[faker.random.number({ min: 0, max: 2 })],
      categoria: categorias[faker.random.number({ min: 0, max: 2 })],
    });
  }

  response.status(200).send(veiculos);
};

export default handler;
