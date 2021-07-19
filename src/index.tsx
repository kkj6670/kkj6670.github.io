import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BaseProvider from './store/Base';
import { GlobalStyle } from "./styles/global";

ReactDOM.render(
	<BaseProvider>
			<GlobalStyle />
			<App />
	</BaseProvider>,
	document.getElementById('root')
);