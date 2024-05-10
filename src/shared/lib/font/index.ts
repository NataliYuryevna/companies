import { createGlobalStyle } from 'styled-components';


const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Inter-Regular';
    src: url(${require("./Inter-Regular.ttf")}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Inter-SemiBold';
    src: url(${require("./Inter-SemiBold.ttf")}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }
`
export {FontStyles}