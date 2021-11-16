import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'IM_Hyemin-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Regular.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 100;
    src: url('./NotoSansKR-Thin.otf') format('otf');
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 300;
    src: url('./NotoSansKR-Light.otf') format('otf');
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url('./NotoSansKR-Regular.otf') format('otf');
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url('./NotoSansKR-Medium.otf') format('otf');
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src: url('./NotoSansKR-Bold.otf') format('otf');
  }
  
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 900;
    src: url('./NotoSansKR-Black.otf') format('otf');
  } 

  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 none;
  }
  
  html,
  body {
		width: 100%;
    height: 100%;
  }
  
  html {
	  font-size: 10px;
  }
  
  body {
	  font-size: 1.6rem;
	  font-family: 'Noto Sans KR', sans-serif;
    font-weight: 100;
  }
  
  input, button {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 100;
  }
  
  li {
	  list-style: none;
  }
  
  a {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 100;
    text-decoration: none;
  }
  
  #root {
	  width: 100%;
	  height: 100%;
  }
`;

export default GlobalStyle;
