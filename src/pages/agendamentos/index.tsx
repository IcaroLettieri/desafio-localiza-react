import {
  Row, Grid,
} from 'carbon-components-react';
import { useEffect, useState } from 'react';

import styles from './styles/Agendamentos.module.css';
import IAgendamento from '../../types/IAgendamento';
import { getAgendamentos } from '../../adapters/xhr';
import Agendamento from '../../components/Agendamento/Agendamento';

const agendamentos = () => {
  const [agendamentosArray, setAgendamentosArray] = useState<IAgendamento[]>();

  useEffect(() => {
    getAgendamentos()
      .then((response) => {
        setAgendamentosArray(response.data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Grid>
        {agendamentosArray?.map((agendamento) => (
          <Row>
            <Agendamento {...agendamento} />
          </Row>
        ))}
      </Grid>

    </div>
  );
};

export default agendamentos;
