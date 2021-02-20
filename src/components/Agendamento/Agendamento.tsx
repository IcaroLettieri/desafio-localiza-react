import {
  Button, Tag, Tile, Tooltip,
  Grid, Row,
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
  OperadorId,
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
    <div>
      <img src="https://placehold.it/300" alt="a" />
    </div>
    <div className={styles.veiculoDados}>
      <h3 className={styles.modelo}>
        {Veiculo.marca} {Veiculo.modelo}
      </h3>

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
            <span>ValorHora:</span>
            {formatCurrency(ValorHora)}
          </Tile>
          <Tile>
            <span> Horas Locacao:</span>
            { HorasLocacao } { HorasLocacao > 1 ? 'horas' : 'hora'}
          </Tile>
        </Row>
        <Row>
          <Tile>
            <span>SubTotal:</span>
            {formatCurrency(SubTotal)}
          </Tile>
          <Tile>
            <span>CustosAdicional:</span>
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
          <Tile>
            <span> Operador Id:</span>
            { OperadorId }
          </Tile>

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
    </div>
  </Tile>
);

export default Agendamento;
