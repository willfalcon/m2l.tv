import { createGlobalStyle } from 'styled-components';

// import { media } from './theme';
const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
    font-size: 10px;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scroll-behavior: smooth;

  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.black};
    font-size: 1.6rem;
    margin: 0;
  }
  button {
    cursor: pointer;
  }
  button, input {
    font-family: ${({ theme }) => theme.font.family};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .text-center {
    text-align: center;
    p &,
    span & {
      margin-left: auto;
      margin-right: auto;
      display: inline-block;
    }
  }
  span.text-center {
    display: block;
    text-align: center;
  }

  #nprogress {
    .bar {
    height: 4px;
    background: ${({ theme }) => theme.gradient};
  }
  .spinner {
    /* display: none; */
    width: 50px;
    height: 50px;
    transform: rotate(-90deg);
    left: 50%;
    top: 50%;
  }
  .spinner-icon {
    width: 100%;
    height: 100%;
    /* animation: none; */
    animation-duration: 1s;
    animation-timing-function: initial;
    border-width: 4px;
    border-top-color: ${({ theme }) => theme.yellow};
    border-left-color: ${({ theme }) => theme.yellow};
    border-bottom-color: ${({ theme }) => theme.yellow};
    
  }
  }
`;

export default GlobalStyle;
