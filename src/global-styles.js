import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
    font-family: 'Quicksand', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fefefe;
    font-size: 18px;
    margin: 0;
    color: #333;
    box-sizing: border-box;
    --logo: #21086e;
    --logo-background: #f0e991;
    --hover: #0c0d0e;
    --hover-dark: #0081bd;
    --mauvelous: #ff9fb2;
    --navy: #03045e;
    --star: #0077b6;
    --cerulean: #00b4d8;
    --sky-blue: #90e0ef;
    --powder-blue: #caf0f8;
  };
`