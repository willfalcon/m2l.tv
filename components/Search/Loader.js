import React from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import { RiLoader2Fill } from 'react-icons/ri';

import useSpinEffect from '../../lib/useSpinEffect';
import spin from '../spin';

const Loader = ({ loading }) => {
  const transition = useTransition(loading, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [loaderSpin] = useSpinEffect(2, true);

  return transition(
    (style, item) =>
      item && (
        <StyledLoader style={{ ...style, ...loaderSpin }}>
          <RiLoader2Fill />
        </StyledLoader>
      )
  );
};

const StyledLoader = styled(animated.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
  z-index: 2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradient};
    z-index: 0;
    top: 0;
    left: 0;
    border-radius: 50%;
    transform: var(--angle);
    transition: var(--duration);
    transition-timing-function: linear;
  }
  svg {
    width: 40px;
    height: 40px;
    animation: 2s ${spin} infinite linear;
  }
`;
export default Loader;
