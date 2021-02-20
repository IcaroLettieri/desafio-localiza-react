import {
  Tile, Grid, Row, Accordion, AccordionItem,
} from 'carbon-components-react';
import IAgendamento from '../../types/IAgendamento';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import styles from './styles/Agendamento.module.css';

const Agendamento = ({
  Id,
  DataAgendamento,
  DataHoraColetaPrevista,
  DataHoraColetaRealizada,
  DataHoraEntregaPrevista,
  DataHoraEntregaRealizada,
  ValorHora,
  HorasLocacao,
  SubTotal,
  CustosAdicional,
  ValorTotal,
  RealizadaVistoria,
  Veiculo,
  Checklist: {
    CarroLimpo,
    TanqueCheio,
    TanqueLitroPendente,
    Amassados,
    Arranhoes,
  },
}: IAgendamento) => (
  <Tile className={styles.veiculo} key={Id}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <img src={Veiculo.img} alt="" />
      <h4 className={styles.modelo}>
        {Veiculo.marca} {Veiculo.modelo} -  {formatDate(DataAgendamento, 'dd/MM/yyyy')}
      </h4>
    </div>
    <div className={styles.veiculoDados}>

      <Accordion className={styles.accordion}>
        <AccordionItem title={<span className={styles.title}>Detalhes do Agendamento</span>}>
          <Grid className={styles.veiculoMeta}>
            <Row>
              <Tile>
                <span>Data Agendamento:</span>
                {formatDate(DataAgendamento, 'dd/MM/yyyy')}
              </Tile>
              <Tile>
                <span>Data Coleta Prevista:</span>
                { formatDate(DataHoraColetaPrevista, 'dd/MM/yyyy HH:mm')}

              </Tile>
              <Tile>
                <span>Data Hora Coleta Realizada:</span>
                { formatDate(DataHoraColetaRealizada, 'dd/MM/yyyy HH:mm')}
              </Tile>
              <Tile>
                <span>  Data Hora Entrega Prevista:</span>
                { formatDate(DataHoraEntregaPrevista, 'dd/MM/yyyy HH:mm')}
              </Tile>
              <Tile>
                <span>Data Hora Entrega Realizada:</span>
                { formatDate(DataHoraEntregaRealizada, 'dd/MM/yyyy HH:mm')}
              </Tile>
            </Row>
            <Row>
              <Tile>
                <span>Valor/Hora:</span>
                {formatCurrency(ValorHora)}
              </Tile>
              <Tile>
                <span>Horas Locação:</span>
                { HorasLocacao } { HorasLocacao > 1 ? 'horas' : 'hora'}
              </Tile>
              <Tile>
                <span>Sub Total:</span>
                {formatCurrency(SubTotal)}
              </Tile>
              <Tile>
                <span>Custos Adicional:</span>
                {formatCurrency(CustosAdicional)}
              </Tile>
              <Tile>
                <span>Valor Total:</span>
                {formatCurrency(ValorTotal)}
              </Tile>
            </Row>

            <Row>
              <Tile>
                <span>Realizada Vistoria:</span>
                {RealizadaVistoria ? 'Sim' : 'Não'}
              </Tile>
              {/* <Tile>
            <span> Operador Id:</span>
            { OperadorId }
          </Tile> */}

              <Tile>
                <span> Carro Limpo:</span>
                {CarroLimpo ? 'Sim' : 'Não'}
              </Tile>
              <Tile>
                <span> Tanque Cheio:</span>
                {TanqueCheio ? 'Sim' : 'Não'}
              </Tile>
              <Tile>
                <span> Tanque Litro Pendente:</span>
                {TanqueLitroPendente} {TanqueLitroPendente > 1 ? 'litros' : 'litro' }
              </Tile>
              <Tile>
                <span> Amassados:</span>
                {Amassados ? 'Sim' : 'Não'}
              </Tile>
              <Tile>
                <span> Arranhoes:</span>
                {Arranhoes ? 'Sim' : 'Não' }
              </Tile>
            </Row>
          </Grid>
        </AccordionItem>
      </Accordion>

    </div>
  </Tile>
);

export default Agendamento;
