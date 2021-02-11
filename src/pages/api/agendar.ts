import { NowRequest, NowResponse } from '@vercel/node';

interface IBody {
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

const handler = (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const {
    body: {
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
    },
  }: { body: IBody } = request;

  response.status(200).send({
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
};

export default handler;
