import axios from 'axios';
import ICepInformacoes from '../../types/ICepInformacoes';
import IVeiculo from '../../types/IVeiculo';

export const getCepInformacoes = (cep: string) => axios.get<ICepInformacoes>(`http://viacep.com.br/ws/${cep}/json/`);

export const api = axios.create({ baseURL: '/api', timeout: 2000 });

export const getVeiculos = () => api.get<IVeiculo[]>('/veiculos');

export const postAgendar = ({
  dataAgendamento,
  dataHoraColetaPrevista,
  dataHoraColetaRealizada,
  dataHoraEntregaPrevista,
  dataHoraEntregaRealizada,
  valorHora,
  horasLocacao,
  subTotal,
  custosAdicionais,
  valorTotal,
  realizadaVistoria,
}) => api.post('/agendar', {
  dataAgendamento,
  dataHoraColetaPrevista,
  dataHoraColetaRealizada,
  dataHoraEntregaPrevista,
  dataHoraEntregaRealizada,
  valorHora,
  horasLocacao,
  subTotal,
  custosAdicionais,
  valorTotal,
  realizadaVistoria,
});

export const postDevolver = ({
  id,
  carroLimpo,
  tanqueCheio,
  tanqueLitroPendente,
  amassados,
  arranhoes,
}) => api.post('/devolver', {
  id,
  carroLimpo,
  tanqueCheio,
  tanqueLitroPendente,
  amassados,
  arranhoes,
});

export const postLogin = ({ login, senha }) => api.post('/login', { login, senha });

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
