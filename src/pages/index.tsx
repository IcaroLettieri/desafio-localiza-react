import { useEffect, useState } from 'react';
import {
  Grid, Row, Loading, Column, MultiSelect, FormLabel, DatePicker,
  DatePickerInput, Button, Select, SelectItem, ModalHeader, ModalFooter,
  ComposedModal, ModalBody, TextInput, Link, InlineNotification,
} from 'carbon-components-react';
import { cpf as CpfValidator } from 'cpf-cnpj-validator';

import styles from './styles/Index.module.scss';

import {
  getCepInformacoes, getVeiculos, postAgendar, postCadastrar, postLogin,
} from '../adapters/xhr';
import IVeiculo from '../types/IVeiculo';
import Veiculo from '../components/Veiculo/Veiculo';
import useValue from '../utils/useValue';
import IAgenda from '../types/IAgenda';
import ILogin from '../types/ILogin';
import { getUserId, isAuthenticated, login } from '../services/auth';
import { cepMask, cpfMask } from '../utils/mask';
import formatDate from '../utils/formatDate';
import typeOnlyNumbers from '../utils/typeOnlyNumbers';
import ICadastro from '../types/ICadastro';

const Index = () => {
  const today = new Date();

  const [dataColeta, handleDataColeta] = useValue('');
  const [horaColeta, handleHoraColeta] = useValue('');
  const [dataEntrega, handleDataEntrega] = useValue('');
  const [horaEntrega, handleHoraEntrega] = useValue('');
  const [agendamentoValidation, setAgendamentoValidation] = useState(false);

  const [cpf, setCpf] = useState('');
  const [password, handlePassword] = useValue('');
  const [loginValidation, setLoginValidation] = useState(false);

  const [nome, handleNome] = useValue('');
  const [dataNascimento, handleDataNascimento] = useValue('');
  const [cep, setCep] = useState('');
  const [cepGeral, setCepGeral] = useState(false);
  const [logradouro, setLogradouro] = useState('');
  const [numero, handleNumero] = useValue('');
  const [complemento, handleComplemento] = useValue('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [passwordConfirm, handlePasswordConfirm] = useValue('');
  const [registerValidation, setRegisterValidation] = useState(false);

  const [trySubmit, setTrySubmit] = useState(false);

  const [veiculos, setVeiculos] = useState<IVeiculo[]>();
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<IVeiculo>();
  const [veiculosFiltrados, setVeiculosFiltrados] = useState<IVeiculo[]>();
  const [filtrosAplicados, setFiltrosAplicados] = useState({
    categoria: [],
    marca: [],
    combustivel: [],
  });

  const [openModalMessage, setOpenModalMessage] = useState(false);
  const [messageModal, setMessageModal] = useState('');

  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);

  const aplicaFiltro = () => {
    if (veiculos === undefined) return;

    setVeiculosFiltrados(
      [...veiculos].filter((veiculo) => {
        let resultado = true;

        Object.keys(filtrosAplicados).forEach((propriedade) => {
          if (filtrosAplicados[propriedade].length > 0) {
            resultado = resultado && filtrosAplicados[propriedade].includes(veiculo[propriedade]);
          }
        });

        return resultado;
      }),
    );
  };

  useEffect(() => {
    aplicaFiltro();
  }, [filtrosAplicados]);

  useEffect(() => {
    getVeiculos()
      .then((response) => {
        setVeiculos(response.data);
        setVeiculosFiltrados(response.data);
      });
  }, []);

  const toggleModalMessage = (message) => {
    setMessageModal(message);
    setOpenModalMessage(true);
  };

  const loadViaCep = async () => {
    if (cep.length !== 10) return;

    const cepTratado = cep.replace('-', '').replaceAll('.', '');
    const { data } = await getCepInformacoes(cepTratado);
    if (!data.erro) {
      if (logradouro !== data.logradouro) setLogradouro(data.logradouro || '');
      if (cidade !== data.localidade) setCidade(data.localidade || '');
      if (estado !== data.uf) setEstado(data.uf || '');
      if (data.logradouro === '') {
        setCepGeral(true);
      } else {
        setCepGeral(false);
      }
    } else {
      toggleModalMessage('CEP inválido.');
    }
  };

  const preparaDadosMultiselect = (categoria) => (
    veiculos
      .map((item) => item[categoria])
      .filter((item, index, self) => self.indexOf(item) === index)
      .map((item) => ({ label: item }))
  );

  const handleCpf = (event) => {
    setCpf(cpfMask(event.currentTarget.value));
  };

  const handleCep = (event) => {
    setCep(cepMask(event.currentTarget.value));
  };

  const handleMultiSelect = ({ selectedItems }, label) => {
    const itensSelecionados = {};
    itensSelecionados[label] = selectedItems.map((item) => item.label);
    setFiltrosAplicados({ ...filtrosAplicados, ...itensSelecionados });
  };

  const handleSelectCar = (veiculo) => {
    setVeiculoSelecionado(veiculo);
    setVeiculosFiltrados([veiculo]);
  };

  const handleCancelSelectCar = () => {
    setVeiculoSelecionado(null);
    setVeiculosFiltrados(veiculos);
  };

  const handleAgendamento = async () => {
    setTrySubmit(true);
    let failValidation = false;
    if (dataColeta === '' || horaColeta === ''
    || dataEntrega === '' || horaEntrega === '') {
      failValidation = true;
    }

    if (!failValidation) {
      if (!isAuthenticated() && !failValidation) {
        setTrySubmit(false);
        setOpenModalLogin(true);
      } else {
        const DataRetirada = new Date(
          Number(dataColeta.slice(6, 10)),
          (Number(dataColeta.slice(3, 5)) - 1),
          Number(dataColeta.slice(0, 2)),
          Number(horaColeta.slice(0, 2)),
          Number(horaColeta.slice(3, 5)),
        );

        const DataDevolucao = new Date(
          Number(dataEntrega.slice(6, 10)),
          (Number(dataEntrega.slice(3, 5)) - 1),
          Number(dataEntrega.slice(0, 2)),
          Number(horaEntrega.slice(0, 2)),
          Number(horaEntrega.slice(3, 5)),
        );

        const data:IAgenda = {
          VeiculoId: veiculoSelecionado.id,
          UsuarioId: Number(getUserId()),
          OperadorId: 1,
          DataRetirada,
          DataDevolucao,
        };

        const response = await postAgendar(data);

        if (response.status === 200) {
          toggleModalMessage('Locação agendada com sucesso !');
          handleCancelSelectCar();
          setTrySubmit(false);
          setAgendamentoValidation(false);
        } else {
          setAgendamentoValidation(true);
        }
      }
    }
  };

  const handleLogin = async () => {
    setTrySubmit(true);

    let failValidation = false;
    if (!CpfValidator.isValid(cpf) || password === '') {
      failValidation = true;
    }

    if (!failValidation) {
      const data:ILogin = {
        Cpf: cpf,
        Senha: password,
      };

      const response = await postLogin(data);

      if (response.status === 200) {
        login(response.data.entity);
        setOpenModalLogin(false);
        setLoginValidation(false);
        setTrySubmit(false);
      } else {
        setLoginValidation(true);
      }
    }
  };

  const handleRegister = async () => {
    setTrySubmit(true);

    let failValidation = false;
    if (!CpfValidator.isValid(cpf) || nome === '' || password === ''
    || password !== passwordConfirm || dataNascimento === ''
    || cep === '' || logradouro === '' || numero === '' || estado === '') {
      failValidation = true;
    }

    if (!failValidation) {
      const DataNascimento = new Date(
        Number(dataNascimento.slice(6, 10)),
        (Number(dataNascimento.slice(3, 5)) - 1),
        Number(dataNascimento.slice(0, 2)),
      );

      const data:ICadastro = {
        Cpf: cpf,
        Nome: nome,
        Senha: password,
        DataNascimento,
        Cep: cep,
        Logradouro: logradouro,
        Numero: Number(numero),
        Complemento: complemento,
        Cidade: cidade,
        Estado: estado,
      };

      const response = await postCadastrar(data);

      if (response.status === 200) {
        setOpenModalRegister(false);
        setRegisterValidation(false);
        setTrySubmit(false);
      } else {
        setRegisterValidation(true);
      }
    }
  };

  const compareTimes = (
    date = `${today.getDate()}/${((today.getMonth() + 1) > 9) ? (today.getMonth() + 1) : (`0${today.getMonth() + 1}`)}/${today.getFullYear()}`,
    time = '00:00',
    input = '',
  ) => {
    const dateToCompare = new Date(
      Number(date.slice(6, 10)),
      (Number(date.slice(3, 5)) - 1),
      Number(date.slice(0, 2)),
      Number(time.slice(0, 2)),
      Number(time.slice(3, 5)),
    );

    switch (input) {
      case ('Coleta'):
        return (dateToCompare < today);
      case ('Entrega'):
        if (dataColeta !== '') {
          const DataRetirada = new Date(
            Number(dataColeta.slice(6, 10)),
            (Number(dataColeta.slice(3, 5)) - 1),
            Number(dataColeta.slice(0, 2)),
            Number(horaColeta.slice(0, 2)),
            Number(horaColeta.slice(3, 5)),
          );
          if (dateToCompare <= DataRetirada) {
            return true;
          } return false;
        } return (dateToCompare < today);
      default:
        return false;
    }
  };

  const renderTimeSelect = (date, input) => (
    <>
      <SelectItem value="" text="hh:mm" />
      <SelectItem value="08:00" text="08:00" disabled={compareTimes(date, '08:00', input)} />
      <SelectItem value="08:30" text="08:30" disabled={compareTimes(date, '08:30', input)} />
      <SelectItem value="09:00" text="09:00" disabled={compareTimes(date, '09:00', input)} />
      <SelectItem value="09:30" text="09:30" disabled={compareTimes(date, '09:30', input)} />
      <SelectItem value="10:00" text="10:00" disabled={compareTimes(date, '10:00', input)} />
      <SelectItem value="10:30" text="10:30" disabled={compareTimes(date, '10:30', input)} />
      <SelectItem value="11:00" text="11:00" disabled={compareTimes(date, '11:00', input)} />
      <SelectItem value="11:30" text="11:30" disabled={compareTimes(date, '11:30', input)} />
      <SelectItem value="12:00" text="12:00" disabled={compareTimes(date, '12:00', input)} />
      <SelectItem value="12:30" text="12:30" disabled={compareTimes(date, '12:30', input)} />
      <SelectItem value="13:00" text="13:00" disabled={compareTimes(date, '13:00', input)} />
      <SelectItem value="13:30" text="13:30" disabled={compareTimes(date, '13:30', input)} />
      <SelectItem value="14:00" text="14:00" disabled={compareTimes(date, '14:00', input)} />
      <SelectItem value="14:30" text="14:30" disabled={compareTimes(date, '14:30', input)} />
      <SelectItem value="15:00" text="15:00" disabled={compareTimes(date, '15:00', input)} />
      <SelectItem value="15:30" text="15:30" disabled={compareTimes(date, '15:30', input)} />
      <SelectItem value="16:00" text="16:00" disabled={compareTimes(date, '16:00', input)} />
      <SelectItem value="16:30" text="16:30" disabled={compareTimes(date, '16:30', input)} />
      <SelectItem value="17:00" text="17:00" disabled={compareTimes(date, '17:00', input)} />
      <SelectItem value="17:30" text="17:30" disabled={compareTimes(date, '17:30', input)} />
      <SelectItem value="18:00" text="18:00" disabled={compareTimes(date, '18:00', input)} />
    </>
  );

  const renderModalRegister = () => (
    <ComposedModal
      open={openModalRegister}
      onClose={() => setOpenModalRegister(false)}
      size="sm"
    >
      <ModalHeader style={{ padding: 20 }}>
        <h4>Cadastro</h4>
      </ModalHeader>
      <ModalBody style={{ paddingBottom: 30, paddingTop: 30 }}>
        <TextInput
          id="name-register"
          labelText="Nome Completo"
          value={nome}
          onChange={handleNome}
          autoComplete="off"
          invalid={trySubmit && !nome.trim()}
          invalidText="Digite seu Nome Completo"
        />
        <DatePicker
          dateFormat="d/m/Y"
          datePickerType="single"
          // minDate={formatDate(today, "dd'/'MM'/'yyyy'")}
        >
          <DatePickerInput
            labelText="Data de Nascimento"
            id="date-nascimento"
            placeholder="dd/mm/yyyy"
            value={dataNascimento}
            onBlur={handleDataNascimento}
            autoComplete="off"
            invalid={trySubmit && !dataNascimento.trim()}
            invalidText="Informe seu dia de nascimento."
          />
        </DatePicker>

        <TextInput
          id="cpf-register"
          labelText="Informe seu CPF"
          value={cpf}
          onChange={handleCpf}
          autoComplete="off"
          invalid={trySubmit && !CpfValidator.isValid(cpf)}
          invalidText="Preencha um CPF válido"
        />

        <TextInput
          id="cep-register"
          labelText="Informe seu CEP"
          value={cep}
          onChange={handleCep}
          autoComplete="off"
          invalid={trySubmit && !cep.trim()}
          invalidText="Digite seu CEP"
          onBlur={loadViaCep}
        />

        <Button
          className={styles.buttonSecondary}
          onClick={loadViaCep}
        ><span>Buscar CEP</span>
        </Button>

        <TextInput
          id="logradouro"
          name="logradouro"
          labelText="Logradouro"
          type="text"
          value={logradouro}
          readOnly={!cepGeral}
          onChange={(e) => setLogradouro(e.target.value)}
          autoComplete="off"
          invalidText="Preencha o logradouro"
          invalid={trySubmit && !trySubmit && !logradouro.trim()}
        />

        <TextInput
          maxLength={5}
          id="numero-register"
          labelText="Número"
          onKeyDown={typeOnlyNumbers}
          value={numero}
          autoComplete="off"
          onChange={handleNumero}
          invalidText="Preencha um número"
          invalid={trySubmit && !numero.trim()}
        />

        <TextInput
          id="complemento"
          name="complemento"
          labelText="Complemento"
          type="text"
          value={complemento}
          onChange={handleComplemento}
          autoComplete="off"
        />

        <TextInput
          id="cidade"
          labelText="Cidade"
          type="text"
          value={cidade}
          readOnly
          onChange={(e) => setCidade(e.target.value)}
          autoComplete="off"
          invalidText="Preencha sua Cidade"
          invalid={trySubmit && !cidade.trim()}
        />

        <TextInput
          id="estado"
          labelText="Estado"
          type="text"
          maxLength={2}
          value={estado}
          readOnly
          onChange={(e) => setEstado(e.target.value)}
          autoComplete="off"
          invalidText="Preencha seu Estado"
          invalid={trySubmit && !estado.trim()}
        />

        <TextInput.PasswordInput
          id="password-register"
          labelText="Informe a senha"
          value={password}
          onChange={handlePassword}
          invalid={trySubmit && !password.trim()}
          invalidText="Digite sua senha"
        />

        <TextInput.PasswordInput
          id="password-register-confirm"
          labelText="Confirmar a senha"
          value={passwordConfirm}
          onChange={handlePasswordConfirm}
          invalid={trySubmit && (!passwordConfirm.trim()
            || passwordConfirm !== password)}
          invalidText="Sua confirmação de senha deve ser igual a sua senha"
        />

        <Link onClick={() => {
          setOpenModalRegister(false);
          setOpenModalLogin(true);
        }}
        >
          <span>Já possuo cadastro</span>
        </Link>
        {registerValidation
        && (
        <InlineNotification
          title="Houve um problema ao realizar o cadastro."
          subtitle="Nosso suporte está verificando."
          kind="error"
          iconDescription="closes notification"
          lowContrast
          hideCloseButton
        />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          className={styles.buttonSecondary}
          onClick={() => { setOpenModalRegister(false); }}
        ><span>Cancelar</span>
        </Button>
        <Button
          className={styles.buttonPrimary}
          onClick={handleRegister}
        ><span>Cadastrar</span>
        </Button>
      </ModalFooter>
    </ComposedModal>
  );

  const renderModalLogin = () => (
    <ComposedModal
      open={openModalLogin}
      onClose={() => setOpenModalLogin(false)}
      size="sm"
    >
      <ModalHeader style={{ padding: 20 }}>
        <h4>Login</h4>
      </ModalHeader>
      <ModalBody style={{ paddingBottom: 30, paddingTop: 30 }}>
        <TextInput
          id="cpf-login"
          labelText="Informe seu CPF"
          value={cpf}
          onChange={handleCpf}
          autoComplete="off"
          invalid={trySubmit && !CpfValidator.isValid(cpf)}
          invalidText="Preencha um CPF válido"
        />
        <TextInput.PasswordInput
          id="password-login"
          labelText="Informe a senha"
          value={password}
          onChange={handlePassword}
          invalid={trySubmit && !password.trim()}
          invalidText="Digite sua senha"
        />
        <Link onClick={() => { setOpenModalRegister(true); }}>
          <span>Não possuo cadastro</span>
        </Link>
        {loginValidation
        && (
        <InlineNotification
          title="Houve um problema com o login."
          subtitle="Verifique suas credenciais."
          kind="error"
          iconDescription="closes notification"
          lowContrast
          hideCloseButton
        />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          className={styles.buttonSecondary}
          onClick={() => { setOpenModalLogin(false); }}
        ><span>Cancelar</span>
        </Button>
        <Button
          className={styles.buttonPrimary}
          onClick={handleLogin}
        ><span>Entrar</span>
        </Button>
      </ModalFooter>
    </ComposedModal>
  );

  const renderModalMessage = () => (
    <ComposedModal open={openModalMessage} onClose={() => setOpenModalMessage(false)} size="sm">
      <ModalHeader style={{ padding: 65 }}>
        <h4>{messageModal}</h4>
      </ModalHeader>
      <ModalFooter>
        <Button className={styles.buttonSecondary} onClick={() => setOpenModalMessage(false)}>
          <span>Fechar</span>
        </Button>
      </ModalFooter>
    </ComposedModal>
  );

  return (
    <Grid>

      {renderModalMessage()}
      {renderModalLogin()}
      {renderModalRegister()}

      <Row>
        <Column style={{ maxWidth: 320 }}>
          {
            veiculos && !veiculoSelecionado
            && (
              <>
                <h2>Filtro</h2>
                <MultiSelect
                  id="carbon-multiselect-example"
                  items={preparaDadosMultiselect('categoria')}
                  label="Categoria"
                  titleText="Selecione a categoria do veículo"
                  onChange={(event) => handleMultiSelect(event, 'categoria')}
                />
                <MultiSelect
                  id="carbon-multiselect-example"
                  items={preparaDadosMultiselect('marca')}
                  label="Montadoras"
                  titleText="Selecione a montadora"
                  onChange={(event) => handleMultiSelect(event, 'marca')}
                />
                <MultiSelect
                  id="carbon-multiselect-example"
                  items={preparaDadosMultiselect('combustivel')}
                  label="Combustível"
                  titleText="Escolha o combustível"
                  onChange={(event) => handleMultiSelect(event, 'combustivel')}
                />
              </>
            )
          }
          {
            veiculoSelecionado
            && (
              <>
                <h2>Alugar Veículo</h2>
                <Row style={{ marginTop: 10 }}>
                  <Column sm={12} md={12} lg={12}>
                    <FormLabel>Data e Hora da Coleta</FormLabel>
                  </Column>
                  <Column sm={12} md={4} lg={6}>
                    <DatePicker
                      dateFormat="d/m/Y"
                      datePickerType="single"
                      minDate={formatDate(today, "dd'/'MM'/'yyyy'")}
                    >
                      <DatePickerInput
                        labelText=""
                        id="date-coleta-prevista"
                        placeholder="dd/mm/yyyy"
                        style={{ maxWidth: 160, marginTop: 8 }}
                        value={dataColeta}
                        onBlur={handleDataColeta}
                        autoComplete="off"
                        invalid={trySubmit && !dataColeta.trim()}
                        invalidText="Faltou a data !"
                      />
                    </DatePicker>
                  </Column>
                  <Column sm={12} md={4} lg={6}>
                    <Select
                      id="select-time-coleta"
                      labelText=" "
                      style={{ maxWidth: 160 }}
                      onChange={handleHoraColeta}
                      value={horaColeta}
                      invalid={trySubmit && !horaColeta.trim()}
                      invalidText="Faltou o horário !"
                    >
                      {renderTimeSelect(((dataColeta === '') ? undefined : dataColeta), 'Coleta')}
                    </Select>
                  </Column>
                </Row>

                <Row style={{ marginTop: 10 }}>
                  <Column sm={12} md={12} lg={12}>
                    <FormLabel>Data e Hora da Entrega</FormLabel>
                  </Column>
                  <Column sm={12} md={4} lg={6}>
                    <DatePicker
                      dateFormat="d/m/Y"
                      datePickerType="single"
                      minDate={
                        (dataColeta !== '') ? dataColeta
                          : formatDate(today, "dd'/'MM'/'yyyy'")
                      }
                    >
                      <DatePickerInput
                        labelText=""
                        id="date-entrega-prevista"
                        placeholder="dd/mm/yyyy"
                        style={{ maxWidth: 160, marginTop: 8 }}
                        value={dataEntrega}
                        onBlur={handleDataEntrega}
                        autoComplete="off"
                        invalid={trySubmit && !dataEntrega.trim()}
                        invalidText="Faltou a data !"
                      />
                    </DatePicker>
                  </Column>
                  <Column sm={12} md={4} lg={6}>
                    <Select
                      id="select-time-entrega"
                      labelText=" "
                      style={{ maxWidth: 160 }}
                      onChange={handleHoraEntrega}
                      value={horaEntrega}
                      invalid={trySubmit && !horaEntrega.trim()}
                      invalidText="Faltou o horário !"
                    >
                      {renderTimeSelect(((dataEntrega === '') ? undefined : dataEntrega), 'Entrega')}
                    </Select>
                  </Column>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Column sm={12} md={4} lg={6}>
                    <Button className={styles.buttonPrimary} onClick={handleAgendamento}>
                      <span>Alugar</span>
                    </Button>
                  </Column>
                  <Column sm={12} md={4} lg={6}>
                    <Button className={styles.buttonSecondary} onClick={handleCancelSelectCar}>
                      <span>Cancelar</span>
                    </Button>
                  </Column>
                </Row>
                {agendamentoValidation
                && (
                <InlineNotification
                  title="Houve um problema ao realizar o agendamento."
                  subtitle="Nosso suporte está verificando."
                  kind="error"
                  iconDescription="closes notification"
                  lowContrast
                  hideCloseButton
                />
                )}
              </>
            )
          }
        </Column>
        <Column>
          <Row narrow>
            {

            !veiculosFiltrados
              ? <Loading id="veiculos" />
              // eslint-disable-next-line max-len

              : veiculosFiltrados.map((veiculo) => (

                <Veiculo
                  key={veiculo.id}
                  {...veiculo}
                  handleSelectCar={() => handleSelectCar(veiculo)}
                  veiculoSelecionado={veiculoSelecionado}
                />

              ))

          }
          </Row>
        </Column>
      </Row>
    </Grid>
  );
};

export default Index;
