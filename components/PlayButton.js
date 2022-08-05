import React from 'react';
import styled, { css } from 'styled-components';
import { IoPlaySharp } from 'react-icons/io5';
import classNames from 'classnames';
import { animated } from 'react-spring';

import useSpinEffect from '../lib/useSpinEffect';

const PlayButton = ({ className, styles, onClick }) => {
  const [spin, handlers] = useSpinEffect(3);

  return onClick ? (
    <Button
      className={classNames('play-button play-button--span', className)}
      style={{ ...spin, ...styles }}
      {...handlers}
      onClick={onClick}
    >
      <span>
        Play <IoPlaySharp />
      </span>
    </Button>
  ) : (
    <Span className={classNames('play-button play-button--button', className)} style={{ ...spin, ...styles }} {...handlers}>
      <span>
        Play <IoPlaySharp />
      </span>
    </Span>
  );
};

const ButtonStyles = css`
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
    transform: var(--angle);
    transition: var(--duration);
    transition-timing-function: linear;
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
`;

const Button = styled(animated.button)`
  ${ButtonStyles}
`;
const Span = styled(animated.span)`
  ${ButtonStyles}
`;
export default PlayButton;
