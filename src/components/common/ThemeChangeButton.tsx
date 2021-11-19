import React, { useCallback } from 'react';
import styled from 'styled-components';

import MoonIcon from '../../../public/images/icon/moon.svg';
import SunIcon from '../../../public/images/icon/sun.svg';

import { useBase, useBaseUpdate } from '../../store/Base';

interface IThemeIcon {
  themeMode: string;
}

const BtnThemeChange = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  position: fixed;
  right: 25px;
  bottom: 25px;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.pointBgColor};
  :hover {
    background-color: ${({ theme }) => theme.pointBgHoverColor};
    > span {
      background-color: #ffff00;
    }
  }

  transition: all 0.125s ease-in 0s;
`;

const ThemeIcon = styled.span<IThemeIcon>`
  display: block;
  width: 35px;
  height: 35px;
  mask: url(${({ themeMode }) => (themeMode === 'dark' ? SunIcon : MoonIcon)}) no-repeat;
  mask-size: 35px;
  background-color: black;
  transition: all 0.125s ease-in 0s;
`;

function LeftBar() {
  const { theme } = useBase();
  const baseUpdate = useBaseUpdate();

  const handleThemeChnage = useCallback(() => {
    const value = theme === 'dark' ? 'white' : 'dark';
    baseUpdate({ type: 'THEME_CHANGE', value });
  }, [theme, baseUpdate]);

  return (
    <BtnThemeChange title='theme change button' onClick={handleThemeChnage}>
      <ThemeIcon themeMode={theme} />
    </BtnThemeChange>
  );
}

export default LeftBar;
