import React, { useEffect } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import BaseProvider from '../store/Base';
import GlobalStyle from '../styles/global';

import MainLayout from '../components/layout/MainLayout';

const App = function ({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') router.push('/board/javascript');
  }, [router]);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>K Note</title>
      </Head>
      <BaseProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </BaseProvider>
    </>
  );
};

export default App;
