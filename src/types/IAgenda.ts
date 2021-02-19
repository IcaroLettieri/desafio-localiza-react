interface IAgenda {
  dataAgendamento: Date;
  dataHoraColetaPrevista: Date;
  dataHoraColetaRealizada: Date;
  dataHoraEntregaPrevista: Date;
  dataHoraEntregaRealizada: Date;
  valorHora: number;
  horasLocacao: number;
  subTotal: number;
  custosAdicionais: number;
  valorTotal: number;
  realizadaVistoria: boolean;
}

export default IAgenda;
