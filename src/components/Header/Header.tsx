import Report20 from '@carbon/icons-react/lib/report/20';
import User20 from '@carbon/icons-react/lib/user--avatar/20';
import Logout20 from '@carbon/icons-react/lib/logout/20';

import { Button } from 'carbon-components-react';
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderGlobalBar,
} from 'carbon-components-react/lib/components/UIShell';
import { useState, useEffect } from 'react';
import Link from 'carbon-components-react/lib/components/UIShell/Link';
import { isAuthenticated, logout } from '../../services/auth';
import styles from './styles/Header.module.css';

const Header = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(isAuthenticated());
  }, [isAuthenticated()]);

  return (
    <CarbonHeader className={styles.header} aria-label={process.env.SITE_NAME}>

      <HeaderName href="/" prefix="">
        <img src="logonegativa.png" height={23} width={120} alt="logo localiza" />
      </HeaderName>

      <HeaderGlobalBar>
        {(!auth) ? (
          <Button className={styles.buttonLoginLogout}>
            <span><User20 /></span>
            <span>Login</span>
          </Button>
        ) : (
          <>
            <Link href="/agendamentos">
              <Button className={styles.buttonPrimary}>
                <span><Report20 /></span>
                <span>Meus Agendamentos</span>
              </Button>
            </Link>
            <Button
              className={styles.buttonLoginLogout}
              onClick={logout}
            >
              <span><Logout20 /></span>
              <span>Sair</span>
            </Button>
          </>
        )}
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};

export default Header;
