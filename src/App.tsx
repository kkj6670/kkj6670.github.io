import React, { useEffect, useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { whiteTheme, darkTheme } from './styles/theme';

import { useBase } from './store/Base';

import LeftBar from './components/common/LeftBar';
import BoardList from './components/board/BoardList';
import BoardViewer from './components/board/BoardViewer';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Main = styled.main`
  width: calc(100% - 250px);
  height: 100%;
  padding: 25px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 15px;
    height: 15px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scrollColor.thumb};
    border-radius: 10px;
    background-clip: content-box;
    border: 3px solid rgba(255, 255, 255, 0);
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.scrollColor.track};
  }
`;

function App() {
  const { theme } = useBase();

  const selectedTheme = useMemo(() => {
    return theme === 'dark' ? darkTheme : whiteTheme;
  }, [theme]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrap>
        <Router>
          <LeftBar />
          <Main>
            <Switch>
              <Route path={`${URL_PATH}:menu`} component={BoardList} exact />
              <Route path={`${URL_PATH}:menu/:id`} component={BoardViewer} exact />
            </Switch>
          </Main>
        </Router>
      </Wrap>
    </ThemeProvider>
  );
}

export default App;
