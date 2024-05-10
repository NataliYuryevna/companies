import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter-Regular';
    font-weight: 400;
    font-size: 18px;
    line-height: 1.2;
    padding: 15px;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @media (max-width: 768px) {
    body {
      font-size: 16px;
    }
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`
export {GlobalStyle}