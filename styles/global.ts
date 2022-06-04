import { createGlobalStyle } from "styled-components";

let GlobalStyles = createGlobalStyle`
  /*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
  */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  html, body {
    height: 100%;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  input, button, textarea, select {
    font: inherit;
  }
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  #root, #__next {
    isolation: isolate;
  }
  #__next {
    min-height: 100vh;
    display: grid;
    place-items: center;
    text-transform: uppercase;
    background-image: linear-gradient(
      65deg,
      hsl(264deg 100% 80%) 0%,
      hsl(282deg 86% 77%) 15%,
      hsl(301deg 73% 75%) 27%,
      hsl(316deg 100% 78%) 38%,
      hsl(325deg 100% 78%) 47%,
      hsl(334deg 100% 79%) 56%,
      hsl(342deg 100% 79%) 64%,
      hsl(356deg 100% 80%) 71%,
      hsl(9deg 100% 79%) 77%,
      hsl(20deg 100% 77%) 84%,
      hsl(28deg 100% 75%) 89%,
      hsl(36deg 100% 73%) 95%,
      hsl(43deg 100% 71%) 100%
    );
    background-repeat: repeat;
  }

  :root {
    --transition-hover: all 0.2s ease-out;
  }
`;

export default GlobalStyles;
