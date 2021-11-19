import React, { useCallback } from 'react';
import styled from 'styled-components';

import MoonIcon from '../../../public/images/icon/moon.svg';
import SunIcon from '../../../public/images/icon/sun.svg';

import { useBase, useBaseUpdate } from '../../store/Base';

interface IBtnThemeChangeProps {
  themeMode: string;
}

const BtnThemeChange = styled.button<IBtnThemeChangeProps>`
  display: block;
  width: 60px;
  height: 60px;
  position: fixed;
  right: 25px;
  bottom: 25px;

  border-radius: 50%;
  background: url(${({ themeMode }) => (themeMode === 'dark' ? SunIcon : MoonIcon)}) no-repeat center;
  background-color: ${({ theme }) => theme.pointBgColor};
  background-size: 35px;
  :hover {
    background-color: ${({ theme }) => theme.pointBgHoverColor};
  }

  transition: all 0.125s ease-in 0s;
`;

function LeftBar() {
  const { theme } = useBase();
  const baseUpdate = useBaseUpdate();

  const handleThemeChnage = useCallback(() => {
    const value = theme === 'dark' ? 'white' : 'dark';
    baseUpdate({ type: 'THEME_CHANGE', value });
  }, [theme, baseUpdate]);

  return <BtnThemeChange title='theme change button' themeMode={theme} onClick={handleThemeChnage} />;
}

export default LeftBar;
