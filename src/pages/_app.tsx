import type { AppProps } from 'next/app';
import '../styles/global.scss';
import Template from '../components/Template/Template';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Template>
    <Component {...pageProps} />
  </Template>
);

export default MyApp;
