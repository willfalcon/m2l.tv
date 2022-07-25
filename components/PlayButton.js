import React from 'react';
import styled from 'styled-components';
import { IoPlaySharp } from 'react-icons/io5';
import classNames from 'classnames';
import Link from 'next/link';
import { animated } from 'react-spring';

import spin from './spin';

const PlayButton = ({ className, styles, onClick }) => {
  return (
    <ButtonStyles className={classNames('play-button', className)} style={styles} onClick={onClick}>
      <span>
        Play <IoPlaySharp />
      </span>
    </ButtonStyles>
  );
};

const ButtonStyles = styled(animated.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: white;
  border: 0;
  border-radius: 15px;
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.font.medium};
  padding: 1rem 1.5rem;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  background: none;
  overflow: hidden;
  svg {
    fill: white;
  }
  &::before {
    content: '';
    background: ${({ theme }) => theme.gradientRight};
    position: absolute;
    width: 150%;
    height: 275%;
    left: -25%;
    top: -75%;

    border-radius: 50%;
    z-index: 0;
    transform-origin: center;
  }
  span {
    position: relative;
    z-index: 0;
    transition: 0.5s ease-out;
    display: flex;
    align-items: center;
  }
  :hover span {
    transform: scale(1.1);
  }
  :hover::before {
    animation: ${spin} 2s linear infinite;
  }
`;
export default PlayButton;
