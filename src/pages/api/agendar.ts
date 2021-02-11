import { NowRequest, NowResponse } from '@vercel/node';

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
  } = request;

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
