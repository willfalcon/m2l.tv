import { css } from 'styled-components';

export default css`
  &.enter {
    opacity: 0;
  }
  &.enter-active {
    opacity: 1;
    /* z-index: 2; */
  }
  &.enter-done {
    opacity: 1;
  }
  &.exit {
    opacity: 1;
  }
  &.exit-active {
    opacity: 0;
    /* z-index: 1; */
  }
  &.exit-done {
    opacity: 0;
  }
  &.enter-active,
  &.exit-active {
    transition: 0.5s;
  }
`;
