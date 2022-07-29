import React from 'react';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import classNames from 'classnames';

import { media } from './theme';
import spin from './spin';
import useSpinEffect from '../lib/useSpinEffect';

const BigPlayButton = ({ className, onClick }) => {
  const [spin, handlers] = useSpinEffect(4);
  return (
    <Button className={classNames(className, 'big-play-button')} onClick={onClick} style={spin} {...handlers}>
      <FaPlay />
    </Button>
  );
};

const Button = styled.button`
  width: 50px;
  height: 50px;
  position: absolute;
  border-radius: 50%;
  background: none;
  border: 0;
  color: white;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0;
  ${media.break`
    top: 50%;
    width: 100px;
    height: 100px;
  `}
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
    transition: 0.4s;
    transition-timing-function: linear;
  }

  svg {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 40%;
    transition: 0.5s ease-out;
  }
  :hover svg {
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

export default BigPlayButton;
