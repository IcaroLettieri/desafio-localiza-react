import Search20 from '@carbon/icons-react/lib/search/20';
import User20 from '@carbon/icons-react/lib/user--avatar/20';
import Menu20 from '@carbon/icons-react/lib/menu/20';
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
} from 'carbon-components-react/lib/components/UIShell';
import styles from './styles/Header.module.css';

const Header = () => {
  const handlePesquisar = () => {

  };

  const handleMenu = () => {

  };

  const handleUsuario = () => {

  };

  return (
    <div className={styles.header}>
      <CarbonHeader aria-label={process.env.SITE_NAME}>
        <HeaderName href="#" prefix="🚗">
          Alugue seu carro
        </HeaderName>
        <HeaderNavigation aria-label="Menu principal">
          <HeaderGlobalAction aria-label="Abrir menu" onClick={handleMenu}>
            <Menu20 />
          </HeaderGlobalAction>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Pesquisar" onClick={handlePesquisar}>
            <Search20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Área do usuário" onClick={handleUsuario}>
            <User20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </CarbonHeader>
    </div>
  );
};

export default Header;
