import 'styled-components';

interface IColor {
  darkGray: string;
  darkGray2: string;
  darkGray3: string;
  gray: string;
  lightGray: string;
}

interface IScrollColor {
  thumb: string;
  track: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    bgColor: string;
    pointBgColor: string;
    pointBgHoverColor: string;
    textColor: string;
    pointColor: string;
    color: IColor;
    scrollColor: IScrollColor;
  }
}
