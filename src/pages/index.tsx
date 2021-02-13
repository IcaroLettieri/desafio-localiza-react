import { useEffect, useState } from 'react';
import {
  Grid, Row, Loading, Column, MultiSelect,
} from 'carbon-components-react';
import { getVeiculos } from '../adapters/xhr';
import IVeiculo from '../types/IVeiculo';
import Veiculo from '../components/Veiculo/Veiculo';

const Index = () => {
  const [veiculos, setVeiculos] = useState<IVeiculo[]>();
  const [veiculosFiltrados, setVeiculosFiltrados] = useState<IVeiculo[]>();
  const [filtrosAplicados, setFiltrosAplicados] = useState({
    categoria: [],
    marca: [],
    combustivel: [],
  });

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

  const preparaDadosMultiselect = (categoria) => (
    veiculos
      .map((item) => item[categoria])
      .filter((item, index, self) => self.indexOf(item) === index)
      .map((item) => ({ label: item }))
  );

  const handleMultiSelect = ({ selectedItems }, label) => {
    const itensSelecionados = {};
    itensSelecionados[label] = selectedItems.map((item) => item.label);
    setFiltrosAplicados({ ...filtrosAplicados, ...itensSelecionados });
  };

  useEffect(() => {
    getVeiculos()
      .then((response) => {
        setVeiculos(response.data);
        setVeiculosFiltrados(response.data);
      });
  }, []);

  return (
    <Grid>
      <Row>
        <Column style={{ maxWidth: 320 }}>
          {
            veiculos
            && (
              <>
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
        </Column>
        <Column>
          {
          !veiculosFiltrados
            ? <Loading id="veiculos" />
            // eslint-disable-next-line max-len
            : veiculosFiltrados.map((veiculo) => <Row key={veiculo.id}><Veiculo {...veiculo} /></Row>)
          }
        </Column>
      </Row>
    </Grid>
  );
};

export default Index;
