import { FC } from 'react';
import Head from 'next/head';
import Header from '../Header/Header';

const Template: FC = ({ children }) => (
  <>
    <Head>
      <title>{process.env.SITE_NAME}</title>
    </Head>
    <Header />
    {children}
  </>
);

export default Template;
