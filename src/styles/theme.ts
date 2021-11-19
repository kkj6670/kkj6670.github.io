import { DefaultTheme } from 'styled-components';

export const color = {
  darkGray: '#373C3F',
  darkGray2: '#474C50',
  darkGray3: '#868E96',
  gray: '#A1A1A1',
  lightGray: '#F7F6F3',
  lightGray2: '#D7D6D3',
};

const defaultTheme = {
  color,
};
export const whiteTheme: DefaultTheme = {
  ...defaultTheme,
  name: 'white',
  bgColor: '#FFF',
  pointBgColor: color.lightGray,
  pointBgHoverColor: color.lightGray2,
  textColor: '#24292f',
  pointColor: '#ff8080',
  scrollColor: {
    thumb: '#D3D1CB',
    track: '#EDECE9',
  },
};

export const darkTheme: DefaultTheme = {
  ...defaultTheme,
  name: 'dark',
  bgColor: '#2F3437FF',
  pointBgColor: color.darkGray,
  pointBgHoverColor: color.darkGray2,
  textColor: '#FFF',
  pointColor: '#ff8080',
  scrollColor: {
    thumb: '#474c50',
    track: 'rgba(202, 204, 206, 0.04)',
  },
};
