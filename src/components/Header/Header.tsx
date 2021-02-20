import Report20 from '@carbon/icons-react/lib/report/20';
import User20 from '@carbon/icons-react/lib/user--avatar/20';
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
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
    <CarbonHeader className={styles.header} aria-label={process.env.SITE_NAME}>

      <HeaderName href="#" prefix="">
        <img src="logonegativa.png" height={23} width={120} alt="logo localiza" />
      </HeaderName>

      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Agendamentos" onClick={handlePesquisar}>
          <Report20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Área do usuário" onClick={handleUsuario}>
          <User20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};

export default Header;
