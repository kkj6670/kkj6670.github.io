import React from 'react';
import styled from 'styled-components';

import LeftBar from '../common/LeftBar';
import ThemeChangeBtn from '../common/ThemeChangeBtn';

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
  return (
    <Wrap>
      <LeftBar />
      <Main>{children}</Main>
      <ThemeChangeBtn />
    </Wrap>
  );
};

export default MainLayout;
