import {
  Button, Tag, Tile, Tooltip, Accordion, AccordionItem,
} from 'carbon-components-react';
import IVeiculo from '../../types/IVeiculo';
import formatCurrency from '../../utils/formatCurrency';
import styles from './styles/Veiculo.module.scss';

const Veiculo = ({
  id,
  img,
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
  <div className={styles.veiculo} key={id}>
    <div className={styles.image}>
      <img src={img} alt={modelo} />
    </div>
    <div className={styles.veiculoDados}>
      <h3 className={styles.modelo}>
        {marca} {modelo}
      </h3>
      <Accordion className={styles.accordion}>
        <AccordionItem title={<span className={styles.title}>Detalhes</span>}>
          <div className={styles.veiculoMeta}>
            <div>
              <span>Categoria:</span>
              {categoria}
            </div>
            <br />
            <div>
              <span>Porta-malas:</span>
              {`${capacidadePortaMalas} litros`}
            </div>
            <br />
            <div>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                Combustível
                <Tooltip>
                  Capacidade do tanque: {capacidadeTanque} litros
                </Tooltip>
              </span>
              {combustivel}
            </div>
          </div>
        </AccordionItem>
      </Accordion>

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
  </div>
);

export default Veiculo;
