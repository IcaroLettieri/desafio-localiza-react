import axios from 'axios';
import ICepInformacoes from '../../types/ICepInformacoes';
import IVeiculo from '../../types/IVeiculo';

export const getCepInformacoes = (cep: string) => axios.get<ICepInformacoes>(`http://viacep.com.br/ws/${cep}/json/`);

export const api = axios.create({ baseURL: '/api', timeout: 5000 });

export const getVeiculos = () => api.get<IVeiculo[]>('/veiculos');

export const postAgendar = ({
  VeiculoId,
  UsuarioId,
  OperadorId,
  DataRetirada,
  DataDevolucao,
}) => api.post('/agendar', {
  VeiculoId,
  UsuarioId,
  OperadorId,
  DataRetirada,
  DataDevolucao,
});

export const postLogin = ({ Cpf, Senha }) => api.post('/login', { Cpf, Senha });

export const postCadastrar = ({
  cpfMatricula,
  nome,
  tipoCadastro,
  cep,
  logradouro,
  numero,
  cidade,
  estado,
}) => api.post('/cadastrar', {
  cpfMatricula,
  nome,
  tipoCadastro,
  cep,
  logradouro,
  numero,
  cidade,
  estado,
});
