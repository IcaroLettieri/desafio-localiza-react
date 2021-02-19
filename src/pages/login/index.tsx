import { Button, TextInput } from 'carbon-components-react';
import Link from 'next/link';
import UserAvatar32 from '@carbon/icons-react/lib/user--avatar/32';
import styles from './styles/Login.module.css';

const login = () => (
  <div className={styles.container}>
    <div className={styles['form-container']}>
      <UserAvatar32 className={styles.avatar} />
      <TextInput id="user" labelText="Informe o usuário" />
      <br />
      <TextInput type="password" id="password" labelText="Informe a senha" />
      <br />
      <Button className={styles.button}>Entrar</Button>
      <br />
      <Link href="/register">
        <span className={styles.register}>Não possuo cadastro</span>
      </Link>
    </div>
  </div>
);

export default login;
