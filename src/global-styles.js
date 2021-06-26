import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;700&display=swap');
  html, body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fefefe;
    font-size: 18px;
    margin: 0;
    color: #333;
    box-sizing: border-box; 
  };
`