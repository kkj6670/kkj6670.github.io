import React, {useMemo} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { whiteTheme, darkTheme } from './styles/theme';

import { useBase } from './store/Base';

import LeftBar from './common/LeftBar';
import BoardList from './common/Board/BoardList';

const Wrap = styled.div`
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
				<main>
					<BoardList />
				</main>
			</Wrap>
		</ThemeProvider>
	);
}

export default App;
