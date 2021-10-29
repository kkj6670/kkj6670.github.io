import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'IM_Hyemin-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Regular.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
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
	  font-family: 'IM_Hyemin-Regular', sans-serif;
    font-weight: bold;
  }
  
  input, button {
    font-family: 'IM_Hyemin-Regular', sans-serif;
    font-weight: bold;
  }
  
  li {
	  list-style: none;
  }
  
  a {
    text-decoration: none;
  }
  
  #root {
	  width: 100%;
	  height: 100%;
  }
`;

export default GlobalStyle;
