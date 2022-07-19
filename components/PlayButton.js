import React from 'react';
import styled from 'styled-components';
import { IoPlaySharp } from 'react-icons/io5';
import classNames from 'classnames';
import spin from './spin';

const PlayButton = ({ className, onClick }) => {
  return (
    <ButtonStyles className={classNames('play-button', className)} onClick={onClick}>
      Play <IoPlaySharp />
    </ButtonStyles>
  );
};

const ButtonStyles = styled.button`
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
    z-index: -1;
    transform-origin: center;
  }
  :hover::before {
    animation: ${spin} 2s linear infinite;
  }
`;
export default PlayButton;
