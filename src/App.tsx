import React, {useMemo} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { whiteTheme, darkTheme } from './styles/theme';

import { useBase } from './store/Base';

import LeftBar from './common/LeftBar';
import Board from './common/Board';

const Wrap = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	background-color: ${({theme}) => theme.bgColor};
`;

function App() {
	const baseContext = useBase();

	const {
		theme
	} = baseContext;

	const selectedTheme = useMemo(() => {
		return theme === 'dark' ? darkTheme : whiteTheme;
	}, [theme]);
	
	return (
		<ThemeProvider theme={selectedTheme}>
			<Wrap>
				<LeftBar />
				{/*<Board />*/}
			</Wrap>
		</ThemeProvider>
	);
}

export default App;
