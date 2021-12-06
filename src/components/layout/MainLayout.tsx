import React, { useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import LeftBar from '../common/Header';
import ThemeChangeBtn from '../common/ThemeChangeBtn';

import { useBase } from '../../store/Base';
import { whiteTheme, darkTheme } from '../../styles/theme';

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow-y: auto;

  @media only screen and (max-width: 768px) {
    margin-top: 50px;
    height: calc(100% - 50px);
  }

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

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = function ({ children }: IMainLayoutProps) {
  const { theme } = useBase();

  const selectedTheme = useMemo(() => {
    return theme === 'dark' ? darkTheme : whiteTheme;
  }, [theme]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrap>
        <LeftBar />
        <Main>{children}</Main>
        <ThemeChangeBtn />
      </Wrap>
    </ThemeProvider>
  );
};

export default MainLayout;
