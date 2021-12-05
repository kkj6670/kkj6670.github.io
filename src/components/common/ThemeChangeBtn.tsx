import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useBase, useBaseUpdate } from '../../store/Base';

interface IThemeIcon {
  themeMode: string;
}

const BtnThemeChange = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 60px;
  height: 60px;
  right: 25px;
  bottom: 10px;

  @media only screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
    right: 25px;
    bottom: 10px;
  }

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

const sunIconUrl = `${process.env.URL_PATH}/static/images/icon/sun.svg`;
const moonIconUrl = `${process.env.URL_PATH}/static/images/icon/moon.svg`;
const ThemeIcon = styled.span<IThemeIcon>`
  display: block;
  width: 60%;
  height: 60%;
  mask: url(${({ themeMode }) => (themeMode === 'dark' ? sunIconUrl : moonIconUrl)}) no-repeat;
  mask-size: 100%;
  background-color: black;
  transition: all 0.125s ease-in 0s;
`;

const ThemeChangeBtn = function () {
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
};

export default ThemeChangeBtn;
