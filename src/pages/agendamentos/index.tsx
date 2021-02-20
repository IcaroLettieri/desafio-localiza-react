import {
  Row, Grid,
} from 'carbon-components-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles/Agendamentos.module.css';
import IAgendamento from '../../types/IAgendamento';
import { getAgendamentos } from '../../adapters/xhr';
import Agendamento from '../../components/Agendamento/Agendamento';
import { isAuthenticated } from '../../services/auth';

const agendamentos = () => {
  const [agendamentosArray, setAgendamentosArray] = useState<IAgendamento[]>();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    } else {
      getAgendamentos()
        .then((response) => {
          setAgendamentosArray(response.data);
        });
    }
  }, []);

  return (
    <div className={styles.container}>

      <Grid>
        <h3 className={styles.title}>Agendamentos</h3>
        {agendamentosArray?.map((agendamento) => (
          <Row style={{ maxWidth: 720 }}>
            <Agendamento {...agendamento} />
          </Row>
        ))}
      </Grid>

    </div>
  );
};

export default agendamentos;
