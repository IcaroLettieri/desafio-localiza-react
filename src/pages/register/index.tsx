import {
  Button,
  DatePicker,
  DatePickerInput,
  TextInput,
} from 'carbon-components-react';
import Link from 'next/link';
import { useState } from 'react';
import { cpf as CpfValidator } from 'cpf-cnpj-validator';
import { isDate } from 'date-fns';
import useValue from '../hooks/useValue';
import styles from './styles/Register.module.css';
import typeOnlyNumbers from '../../utils/typeOnlyNumbers';
import { getCepInformacoes } from '../../adapters/xhr';
import { cepMask, cpfMask } from '../../utils/mask';

const register = () => {
  const [Nome, setNome] = useValue('');
  const [Cpf, setCpf] = useState('');
  const [Cep, setCep] = useState('');
  const [Logradouro, setLogradouro] = useState('');
  const [Numero, setNumero] = useValue('');
  const [Cidade, setCidade] = useState('');
  const [Estado, setEstado] = useState('');
  const [Senha, setSenha] = useValue('');
  const [DataNascimentoHumanizada, SetDataNascimentoHumanizada] = useValue('');
  const [DataNascimento, setDataNascimento] = useState(null);
  const [confirmacaoSenha, setConfimacaoSenha] = useValue('');
  const [trySubmit, setTrySubmit] = useState(false);

  const buscarInformacoesCep = async () => {
    if (Cep.length !== 10) return;

    const cepTratado = Cep.replace('-', '').replaceAll('.', '');
    const { data } = await getCepInformacoes(cepTratado);

    if (Logradouro !== data.logradouro) setLogradouro(data.logradouro || '');
    if (Cidade !== data.localidade) setCidade(data.localidade || '');
    if (Estado !== data.uf) setEstado(data.uf || '');
  };

  const handleCpf = (event) => {
    setCpf(cpfMask(event.currentTarget.value));
  };

  const handleCep = (event) => {
    setCep(cepMask(event.currentTarget.value));
  };

  const convertDate = () => {
    const convertedDate = new Date(
      Number(DataNascimentoHumanizada.slice(6, 10)),
      (Number(DataNascimentoHumanizada.slice(3, 5)) - 1),
      Number(DataNascimentoHumanizada.slice(0, 2)),
    );

    setDataNascimento(convertedDate);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setTrySubmit(true);
  };

  return (
    <div className={styles.container}>
      <form className={styles['form-container']}>
        <TextInput
          id="nome"
          labelText="Nome completo"
          value={Nome}
          onChange={setNome}
          invalidText="Preencha o nome"
          invalid={trySubmit && !Nome.trim()}
        />
        <br />

        <DatePicker dateFormat="d/m/Y" datePickerType="single">

          <DatePickerInput
            id="dataNascimento"
            labelText="Data de Nascimento"
            value={DataNascimentoHumanizada}
            placeholder="dd/mm/yyyy"
            onChange={SetDataNascimentoHumanizada}
            onBlur={convertDate}
            invalidText="Informe uma data de nascimento válida"
            invalid={trySubmit && !isDate(DataNascimento)}
          />
        </DatePicker>
        <br />
        <TextInput
          id="cpf"
          labelText="Cpf"
          value={Cpf}
          onChange={handleCpf}
          invalidText="Preencha um cpf válido"
          invalid={trySubmit && !CpfValidator.isValid(Cpf)}
        />
        <br />
        <TextInput
          id="Cep"
          labelText="Cep"
          type="text"
          onChange={handleCep}
          onBlur={buscarInformacoesCep}
          value={Cep}
          invalidText="Preencha um Cep válido"
          invalid={trySubmit && !Cep.trim()}
        />
        <br />
        <TextInput
          id="Logradouro"
          name="Logradouro"
          labelText="Logradouro"
          type="text"
          value={Logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
          invalidText="Preencha um Logradouro"
          invalid={trySubmit && !Logradouro.trim()}
        />
        <br />
        <TextInput
          maxLength={5}
          id="numero"
          labelText="Número"
          onKeyDown={typeOnlyNumbers}
          value={Numero}
          onChange={setNumero}
          invalidText="Preencha um número"
          invalid={trySubmit && !Numero.trim()}
        />
        <br />
        <TextInput
          id="Cidade"
          labelText="Cidade"
          type="text"
          value={Cidade}
          onChange={(e) => setCidade(e.target.value)}
          invalidText="Preencha sua Cidade"
          invalid={trySubmit && !Cidade.trim()}
        />
        <br />
        <TextInput
          id="Estado"
          labelText="Estado"
          type="text"
          maxLength={2}
          value={Estado}
          onChange={(e) => setEstado(e.target.value)}
          invalidText="Preencha seu Estado"
          invalid={trySubmit && !Estado.trim()}
        />
        <br />
        <TextInput
          type="password"
          id="senha"
          labelText="Informe a senha"
          value={Senha}
          onChange={setSenha}
          invalidText="Senha obrigatória"
          invalid={trySubmit && !Senha.trim()}
        />
        <br />
        <TextInput
          type="password"
          id="confimacaoSenha"
          labelText="Confirmar a senha"
          value={confirmacaoSenha}
          invalid={trySubmit && (!confirmacaoSenha.trim() || confirmacaoSenha !== Senha)}
          invalidText="Sua confirmação de senha deve ser igual a sua senha"
          onChange={setConfimacaoSenha}
        />

        <br />
        <Button className={styles.button} onClick={handleOnSubmit}>
          Cadastrar
        </Button>
        <br />
        <Link href="/login">
          <span className={styles.login}>Já possuo cadastro</span>
        </Link>
      </form>
    </div>
  );
};

export default register;
