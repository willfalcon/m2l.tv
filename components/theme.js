import { css } from 'styled-components';

const theme = {
  black: `#1A0E1C`,
  neon: `#ECFF89`,
  white: `#ffffff`,
  pink: `#E7B8E2`,
  yellow: `#FFE289`,
  darkPurple: `#5B0751`,
  lightPurple: `#7D3074`,
  purple: `#942F88`,

  gradient: `linear-gradient(to bottom, #FF0E4D, #A1008E)`,
  gradientRight: `linear-gradient(to right, #FF0E4D, #A1008E)`,
  gradientBlack: `linear-gradient(to bottom, #1A0E1C, #1A0E1C)`,

  shadow: `RGBA(0, 0, 0, 0.5) 0 2px 4px`,

  font: {
    family: 'filson-pro, sans-serif',
    regular: 400,
    medium: 500,
    bold: 700,
    heavy: 800,
  },
  sizes: {
    break: 768,
    large: 1024,
    content: 1200,
    mobileHeader: 164,
    header: 82,
  },
};

const media = Object.keys(theme.sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export default theme;
export { media };
