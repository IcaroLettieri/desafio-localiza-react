import { NowResponse } from '@vercel/node';
import faker from 'faker';

type Combustivel = 'Álcool' | 'Gasolina' | 'Diesel';
type Categoria = 'Básico' | 'Completo' | 'Luxo';

interface IVeiculo {
  id: number;
  img: string;
  modelo: string;
  marca: string;
  placa: string;
  valorHora: number;
  capacidadePortaMalas: number;
  capacidadeTanque: number;
  combustivel: Combustivel;
  categoria: Categoria;
}

const handler = (_, response: NowResponse) => {
  const veiculos: IVeiculo[] = [];
  const combustiveis: Combustivel[] = ['Álcool', 'Gasolina', 'Diesel'];
  const categorias: Categoria[] = ['Básico', 'Completo', 'Luxo'];

  for (let i = 1; i < 21; i++) {
    veiculos.push({
      id: i,
      img: `cars/${faker.random.number({ min: 1, max: 10 })}.png`,
      modelo: faker.vehicle.model(),
      marca: faker.vehicle.manufacturer(),
      placa: faker.vehicle.vin(),
      valorHora: +faker.commerce.price(15, 150),
      capacidadePortaMalas: faker.random.number({ min: 250, max: 700 }),
      capacidadeTanque: faker.random.number({ min: 250, max: 700 }),
      combustivel: combustiveis[faker.random.number({ min: 0, max: 2 })],
      categoria: categorias[faker.random.number({ min: 0, max: 2 })],
    });
  }

  response.status(200).send(veiculos);
};

export default handler;
