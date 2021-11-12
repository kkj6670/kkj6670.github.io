import { DefaultTheme } from 'styled-components';

export const color = {
  darkGray: '#373C3FFF',
  gray: '#A1A1A1',
  lightGray: '#CDCDCD',
};

const defaultTheme = {
  color,
};
export const whiteTheme: DefaultTheme = {
  ...defaultTheme,
  name: 'white',
  bgColor: '#FFF',
  textColor: '#3A3A3A',
  pointColor: '#ff8080',
  scrollColor: {
    thumb: '#474c50',
    track: 'rgba(202, 204, 206, 0.04)',
  },
};

export const darkTheme: DefaultTheme = {
  ...defaultTheme,
  name: 'dark',
  bgColor: '#2F3437FF',
  textColor: '#FFF',
  pointColor: '#ff8080',
  scrollColor: {
    thumb: '#474c50',
    track: 'rgba(202, 204, 206, 0.04)',
  },
};