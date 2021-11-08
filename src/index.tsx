import React from 'react';
import { render, hydrate } from 'react-dom';
import App from './App';
import BaseProvider from './store/Base';
import GlobalStyle from './styles/global';

const rootElement = document.getElementById('root');

if (rootElement?.hasChildNodes()) {
  hydrate(
    <BaseProvider>
      <GlobalStyle />
      <App />
    </BaseProvider>,
    rootElement,
  );
} else {
  render(
    <BaseProvider>
      <GlobalStyle />
      <App />
    </BaseProvider>,
    rootElement,
  );
}
