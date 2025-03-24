import { createGlobalStyle } from 'styled-components';
import { COLORS } from '../constants/colors.ts';

const GlobalStyles = createGlobalStyle`

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  :root {
    // colors
    --color-primary: ${COLORS.primary};
    --color-primary-hover: #f3e3d1;
    --color-background: ${COLORS.background};
    --color-text-primary: ${COLORS.darkGray};
    --color-border-gray: #d1d1d1;
    --color-danger: #E65E60;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  a {
    font-weight: 500;
    color: unset;
    text-decoration: inherit;
  }

  html, body {
    height: 100%;
    min-width: 320px;
    min-height: 100vh;
  }

  body {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color: var(--color-text-primary);
    background-color: var(--color-background);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Common classes*/
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  h1, h2, h3, h4 {
    color: inherit;
  }

  .page {
    padding-top: 56px;
  }

  .container-mb {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .text-highlight {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
    font-size: 50px;
    line-height: 1.2;
    margin-bottom: 0.3em;
  }
  
  .rtl {
    display: block;
    text-align: right;
  }
    

`;

export default GlobalStyles;
