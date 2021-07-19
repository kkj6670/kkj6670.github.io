import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
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
	  font-family: Arial sans-serif;
  }
  
  li {
	  list-style: none;
  }

  * {
    box-sizing: border-box;
	  margin: 0;
	  padding: 0;
	  border: 0 none;
  }
  
  a {
    text-decoration: none;
  }
  
  #root {
	  width: 100%;
	  height: 100%;
  }
`