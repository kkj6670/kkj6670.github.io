import React, { useMemo } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import BaseProvider, { useBase } from '../src/store/Base';
import GlobalStyle from '../src/styles/global';
import { whiteTheme, darkTheme } from '../src/styles/theme';

import MainLayout from '../src/components/layout/MainLayout';

const App = function ({ Component, pageProps }: AppProps) {
  const { theme } = useBase();

  const selectedTheme = useMemo(() => {
    return theme === 'dark' ? darkTheme : whiteTheme;
  }, [theme]);

  return (
    <>
      <Head>
        <title>K Note</title>
      </Head>
      <GlobalStyle />
      <BaseProvider>
        <ThemeProvider theme={selectedTheme}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </BaseProvider>
    </>
  );
};

export default App;
