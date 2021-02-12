import ICombustivel from './ICombustivel';
import ICategoria from './IVeiculoCategoria';

interface IVeiculo {
  id: number;
  modelo: string;
  marca: string;
  placa: string;
  valorHora: number;
  capacidadePortaMalas: number;
  capacidadeTanque: number;
  combustivel: ICombustivel;
  categoria: ICategoria;
}

export default IVeiculo;
