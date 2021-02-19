import { Button, TextInput } from 'carbon-components-react';
import Link from 'next/link';
import { useState } from 'react';
import useValue from '../hooks/useValue';
import styles from './styles/Register.module.css';
import typeOnlyNumbers from '../../utils/typeOnlyNumbers';
import { getCepInformacoes } from '../../adapters/xhr';

const register = () => {
  const [nome, setNome] = useValue('');
  const [usuario, setUsuario] = useValue('');
  const [cep, setCep] = useValue('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useValue('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [senha, setSenha] = useValue('');
  const [confirmacaoSenha, setConfimacaoSenha] = useValue('');

  const buscarInformacoesCep = async () => {
    if (cep.length !== 8) return;

    const { data } = await getCepInformacoes(cep);

    if (logradouro !== data.logradouro) setLogradouro(data.logradouro || '');
    if (cidade !== data.localidade) setCidade(data.localidade || '');
    if (estado !== data.uf) setEstado(data.uf || '');
  };
  return (

    <div className={styles.container}>
      <div className={styles['form-container']}>

        <TextInput id="nome" labelText="Nome completo" value={nome} onChange={setNome} />
        <br />
        <TextInput id="usuario" labelText="Usuário" value={usuario} onChange={setUsuario} />
        <br />
        <TextInput id="cep" labelText="Cep" type="text" maxLength={8} onKeyDown={typeOnlyNumbers} autoComplete="off" onChange={setCep} onBlur={buscarInformacoesCep} value={cep} />
        <br />
        <TextInput id="logradouro" labelText="Logradouro" type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
        <br />
        <TextInput maxLength={5} id="numero" labelText="Número" onKeyDown={typeOnlyNumbers} value={numero} onChange={setNumero} />
        <br />
        <TextInput id="cidade" labelText="Cidade" type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        <br />
        <TextInput id="estado" labelText="Estado" type="text" maxLength={2} value={estado} onChange={(e) => setEstado(e.target.value)} />
        <br />
        <TextInput type="password" id="senha" labelText="Informe a senha" value={senha} onChange={setSenha} />
        <br />
        <TextInput type="password" id="confimacaoSenha" labelText="Confirmar a senha" value={confirmacaoSenha} onChange={setConfimacaoSenha} />

        <br />
        <Button className={styles.button}>Cadastrar</Button>
        <br />
        <Link href="/login">
          <span className={styles.login}>Já possuo cadastro</span>
        </Link>
      </div>
    </div>
  );
};

export default register;
