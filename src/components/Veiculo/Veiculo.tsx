import {
  Button, Tag, Tile, Tooltip,
} from 'carbon-components-react';
import IVeiculo from '../../types/IVeiculo';
import formatCurrency from '../../utils/formatCurrency';
import styles from './styles/Veiculo.module.scss';

const Veiculo = ({
  id,
  capacidadePortaMalas,
  capacidadeTanque,
  categoria,
  combustivel,
  marca,
  modelo,
  placa,
  valorHora,
  handleSelectCar,
  veiculoSelecionado,
}: IVeiculo) => (
  <Tile className={styles.veiculo} key={id}>
    <div className={styles.image}>
      <img src="https://placehold.it/300" alt={modelo} />
    </div>
    <div className={styles.veiculoDados}>
      <h3 className={styles.modelo}>
        {marca} {modelo}
      </h3>

      <div className={styles.veiculoMeta}>
        <Tile>
          <span>Categoria:</span>
          {categoria}
        </Tile>
        <Tile>
          <span>Porta-malas:</span>
          {`${capacidadePortaMalas} litros`}
        </Tile>
        <Tile>
          <span>
            Combustível
            <Tooltip>
              Capacidade do tanque: {capacidadeTanque} litros
            </Tooltip>
          </span>
          {combustivel}
        </Tile>
      </div>
      <div className={styles.button}>
        {(!veiculoSelecionado)
          ? (
            <Button data-placa={placa} onClick={handleSelectCar}>
              <span>
                Alugar por <strong>{formatCurrency(valorHora)}</strong>/hora
              </span>
            </Button>
          )
          : (
            <Tag>
              <p>Veículo selecionado por <strong>{formatCurrency(valorHora)}</strong>/hora</p>
            </Tag>
          )}
      </div>
    </div>
  </Tile>
);

export default Veiculo;
