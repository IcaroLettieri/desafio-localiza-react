import { NowResponse } from '@vercel/node';
import faker from 'faker';

type Combustivel = 'Álcool' | 'Gasolina' | 'Diesel';
type Categoria = 'Básico' | 'Completo' | 'Luxo';

interface IVeiculo {
  id: number;
  modelo: string;
  marca: string;
  placa: string;
  valorHora: number;
  capacidadePortaMalas: number;
  capacidadeTanque: number;
  combustivel: Combustivel;
  categoria: Categoria;
}

interface IAgendamento {
    Id: number;
    DataAgendamento: Date;
    DataHoraColetaPrevista: Date;
    DataHoraColetaRealizada: Date;
    DataHoraEntregaPrevista: Date;
    DataHoraEntregaRealizada: Date;
    ValorHora: number;
    HorasLocacao: number;
    SubTotal: number;
    CustosAdicional: number;
    ValorTotal: number;
    RealizadaVistoria: boolean;
    UsuarioId: number;
    OperadorId: number;
    Veiculo: IVeiculo;
    Checklist: {
      CarroLimpo: boolean;
      TanqueCheio: boolean;
      TanqueLitroPendente: number;
      Amassados: boolean;
      Arranhoes: boolean;
    }
}

const handler = (_, response: NowResponse) => {
  const agendamentos: IAgendamento[] = [];
  const combustiveis: Combustivel[] = ['Álcool', 'Gasolina', 'Diesel'];
  const categorias: Categoria[] = ['Básico', 'Completo', 'Luxo'];

  for (let i = 1; i < 11; i++) {
    agendamentos.push({
      Id: i,
      DataAgendamento: faker.date.recent(),
      DataHoraColetaPrevista: faker.date.between(faker.date.recent(), faker.date.future()),
      DataHoraColetaRealizada: faker.date.future(),
      DataHoraEntregaPrevista: faker.date.between(faker.date.recent(), faker.date.future()),
      DataHoraEntregaRealizada: faker.date.future(),
      ValorHora: +faker.commerce.price(15, 150),
      HorasLocacao: faker.random.number({ min: 2, max: 50 }),
      SubTotal: +faker.commerce.price(15, 150),
      CustosAdicional: +faker.commerce.price(15, 150),
      ValorTotal: +faker.commerce.price(15, 150),
      RealizadaVistoria: faker.random.boolean(),
      UsuarioId: 1,
      OperadorId: 2,
      Veiculo: {
        id: i,
        modelo: faker.vehicle.model(),
        marca: faker.vehicle.manufacturer(),
        placa: faker.vehicle.vin(),
        valorHora: +faker.commerce.price(15, 150),
        capacidadePortaMalas: faker.random.number({ min: 250, max: 700 }),
        capacidadeTanque: faker.random.number({ min: 250, max: 700 }),
        combustivel: combustiveis[faker.random.number({ min: 0, max: 2 })],
        categoria: categorias[faker.random.number({ min: 0, max: 2 })],
      },
      Checklist: {
        CarroLimpo: faker.random.boolean(),
        TanqueCheio: faker.random.boolean(),
        TanqueLitroPendente: faker.random.number({ min: 250, max: 700 }),
        Amassados: faker.random.boolean(),
        Arranhoes: faker.random.boolean(),
      },
    });
  }

  response.status(200).send(agendamentos);
};

export default handler;
