import IVeiculo from './IVeiculo';

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

export default IAgendamento;
