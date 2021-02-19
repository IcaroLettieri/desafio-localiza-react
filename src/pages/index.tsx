import { useEffect, useState } from 'react';
import {
  Grid, Row, Loading, Column, MultiSelect, FormLabel, DatePicker,
  DatePickerInput, Button, Select, SelectItem, ModalHeader, ModalFooter,
  ComposedModal, ModalBody, TextInput, Link, InlineNotification,
} from 'carbon-components-react';

import { getVeiculos, postAgendar, postLogin } from '../adapters/xhr';
import IVeiculo from '../types/IVeiculo';
import Veiculo from '../components/Veiculo/Veiculo';
import useValue from './hooks/useValue';
import IAgenda from '../types/IAgenda';
import ILogin from '../types/ILogin';
import { isAuthenticated, login } from '../services/auth';
import { cpfMask } from '../utils/mask';

const Index = () => {
  const [dataColeta, handleDataColeta] = useValue('');
  const [dataColetaValidation, setDataColetaValidation] = useState(false);

  const [horaColeta, handleHoraColeta] = useValue('');
  const [horaColetaValidation, setHoraColetaValidation] = useState(false);

  const [dataEntrega, handleDataEntrega] = useValue('');
  const [dataEntregaValidation, setDataEntregaValidation] = useState(false);

  const [horaEntrega, handleHoraEntrega] = useValue('');
  const [horaEntregaValidation, setHoraEntregaValidation] = useState(false);

  const [cpf, setCpf] = useState('');
  const [cpfValidation, setCpfValidation] = useState(false);

  const [password, handlePassword] = useValue('');
  const [passwordValidation, setPasswordValidation] = useState(false);

  const [loginValidation, setLoginValidation] = useState(false);

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

  const preparaDadosMultiselect = (categoria) => (
    veiculos
      .map((item) => item[categoria])
      .filter((item, index, self) => self.indexOf(item) === index)
      .map((item) => ({ label: item }))
  );

  const toggleModalMessage = (message) => {
    setMessageModal(message);
    setOpenModalMessage(true);
  };

  const handleCpf = (event) => {
    setCpf(cpfMask(event.currentTarget.value));
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

  const handleSubmit = async () => {
    let failValidation = false;
    if (dataColeta === '') {
      failValidation = true;
      setDataColetaValidation(true);
    } else setDataColetaValidation(false);

    if (horaColeta === '') {
      failValidation = true;
      setHoraColetaValidation(true);
    } else setHoraColetaValidation(false);

    if (dataEntrega === '') {
      failValidation = true;
      setDataEntregaValidation(true);
    } else setDataEntregaValidation(false);

    if (horaEntrega === '') {
      failValidation = true;
      setHoraEntregaValidation(true);
    } else setHoraEntregaValidation(false);

    if (failValidation) {
      toggleModalMessage('Necessário preencher os campos de formulário.');
    } else if (!isAuthenticated()) {
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
        UsuarioId: 2,
        OperadorId: 1,
        DataRetirada,
        DataDevolucao,
      };

      const response = await postAgendar(data);

      if (response.status === 200) {
        toggleModalMessage('Locação agendada com sucesso !');
        handleCancelSelectCar();
      }
    }
  };

  const handleLogin = async () => {
    let failValidation = false;
    if (cpf === '') {
      failValidation = true;
      setCpfValidation(true);
    } else setCpfValidation(false);

    if (password === '') {
      failValidation = true;
      setPasswordValidation(true);
    } else setPasswordValidation(false);

    if (!failValidation) {
      const data:ILogin = {
        Cpf: cpf,
        Senha: password,
      };

      const response = await postLogin(data);

      if (response.status === 200) {
        login(response.data.token);
        setOpenModalLogin(false);
        setLoginValidation(false);
      } else {
        setLoginValidation(true);
      }
    }
  };

  const renderTimeSelect = () => (
    <>
      <SelectItem value="" text="hh:mm" />
      <SelectItem value="08:00" text="08:00" />
      <SelectItem value="08:30" text="08:30" />
      <SelectItem value="09:00" text="09:00" />
      <SelectItem value="09:30" text="09:30" />
      <SelectItem value="10:00" text="10:00" />
      <SelectItem value="10:30" text="10:30" />
      <SelectItem value="11:00" text="11:00" />
      <SelectItem value="11:30" text="11:30" />
      <SelectItem value="12:00" text="12:00" />
      <SelectItem value="12:30" text="12:30" />
      <SelectItem value="13:00" text="13:00" />
      <SelectItem value="13:30" text="13:30" />
      <SelectItem value="14:00" text="14:00" />
      <SelectItem value="14:30" text="14:30" />
      <SelectItem value="15:00" text="15:00" />
      <SelectItem value="15:30" text="15:30" />
      <SelectItem value="16:00" text="16:00" />
      <SelectItem value="16:30" text="16:30" />
      <SelectItem value="17:00" text="17:00" />
      <SelectItem value="17:30" text="17:30" />
      <SelectItem value="18:00" text="18:00" />
    </>
  );

  const renderModalRegister = () => (
    <ComposedModal open={openModalRegister} onClose={() => setOpenModalRegister(false)} size="sm">
      <ModalHeader style={{ padding: 20 }}>
        <h4>Cadastro</h4>
      </ModalHeader>
      <ModalBody>
        <TextInput id="user" labelText="Informe o usuário" />
        <TextInput type="password" id="password" labelText="Informe a senha" />
      </ModalBody>
      <ModalFooter>
        <Button
          kind="secondary"
          onClick={() => { setOpenModalRegister(false); }}
        >Cancelar
        </Button>
        <Button kind="primary">Cadastrar</Button>
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
          id="cpf"
          labelText="Informe seu CPF"
          value={cpf}
          onChange={handleCpf}
          autoComplete="off"
          invalid={cpfValidation}
          invalidText="Digite seu CPF"
        />
        <TextInput.PasswordInput
          id="password-login"
          labelText="Informe a senha"
          value={password}
          onChange={handlePassword}
          invalid={passwordValidation}
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
          kind="secondary"
          onClick={() => { setOpenModalLogin(false); }}
        >Cancelar
        </Button>
        <Button
          kind="primary"
          onClick={handleLogin}
        >Entrar
        </Button>
      </ModalFooter>
    </ComposedModal>
  );

  const renderModalMessage = () => (
    <ComposedModal open={openModalMessage} onClose={() => setOpenModalMessage(false)} size="sm">
      <ModalHeader style={{ padding: 65 }}>
        <h4>{messageModal}</h4>
      </ModalHeader>
      <ModalFooter secondaryButtonText="Fechar" />
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
                    <DatePicker dateFormat="d/m/Y" datePickerType="single">
                      <DatePickerInput
                        labelText=""
                        id="date-coleta-prevista"
                        placeholder="dd/mm/yyyy"
                        style={{ maxWidth: 160, marginTop: 8 }}
                        value={dataColeta}
                        onBlur={handleDataColeta}
                        autoComplete="off"
                        invalid={dataColetaValidation}
                        invalidText="Faltou a data !"
                      />
                    </DatePicker>
                  </Column>
                  <Column sm={12} md={4} lg={6}>
                    <Select
                      id="select-time-coleta"
                      labelText=" "
                      onChange={handleHoraColeta}
                      value={horaColeta}
                      invalid={horaColetaValidation}
                      invalidText="Faltou o horário !"
                    >
                      {renderTimeSelect()}
                    </Select>
                  </Column>
                </Row>

                <Row style={{ marginTop: 10 }}>
                  <Column sm={12} md={12} lg={12}>
                    <FormLabel>Data e Hora da Entrega</FormLabel>
                  </Column>
                  <Column sm={12} md={4} lg={6}>
                    <DatePicker dateFormat="d/m/Y" datePickerType="single">
                      <DatePickerInput
                        labelText=""
                        id="date-entrega-prevista"
                        placeholder="dd/mm/yyyy"
                        style={{ maxWidth: 160, marginTop: 8 }}
                        value={dataEntrega}
                        onBlur={handleDataEntrega}
                        autoComplete="off"
                        invalid={dataEntregaValidation}
                        invalidText="Faltou a data !"
                      />
                    </DatePicker>
                  </Column>
                  <Column sm={12} md={4} lg={6}>
                    <Select
                      id="select-time-entrega"
                      labelText=" "
                      onChange={handleHoraEntrega}
                      value={horaEntrega}
                      invalid={horaEntregaValidation}
                      invalidText="Faltou o horário !"
                    >
                      {renderTimeSelect()}
                    </Select>
                  </Column>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Column sm={12} md={4} lg={6}>
                    <Button onClick={handleSubmit}>
                      Alugar
                    </Button>
                  </Column>
                  <Column sm={12} md={4} lg={6}>
                    <Button kind="secondary" onClick={handleCancelSelectCar}>
                      Cancelar
                    </Button>
                  </Column>
                </Row>
              </>
            )
          }
        </Column>
        <Column>
          {
            !veiculosFiltrados
              ? <Loading id="veiculos" />
              // eslint-disable-next-line max-len
              : veiculosFiltrados.map((veiculo) => (
                <Row key={veiculo.id}>
                  <Veiculo
                    {...veiculo}
                    handleSelectCar={() => handleSelectCar(veiculo)}
                    veiculoSelecionado={veiculoSelecionado}
                  />
                </Row>
              ))
          }
        </Column>
      </Row>
    </Grid>
  );
};

export default Index;
