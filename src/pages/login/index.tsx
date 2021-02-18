import { Button, TextInput } from 'carbon-components-react';
import styles from './styles/Login.module.css';

const login = () => (
  <div className={styles.container}>
    <div className={styles['form-container']}>

      <TextInput id="user" labelText="Informe o usuário" />
      <br />
      <TextInput type="password" id="password" labelText="Informe a senha" />
      <br />
      <Button className={styles.button}>Entrar</Button>
    </div>
  </div>

);

export default login;
