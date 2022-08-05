import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import useSpinEffect from '../lib/useSpinEffect';

const AddButton = ({ className, onClick, added }) => {
  const [spin, handlers] = useSpinEffect(3);

  return (
    <Button className={classNames('add-button', className, { added })} onClick={onClick} added={added} style={spin} {...handlers}>
      <span />
      <span />
    </Button>
  );
};

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 20px;
  z-index: 0;
  padding: 0;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
  cursor: pointer;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradient};
    border-radius: 50%;
    transform: var(--angle);
    transition: var(--duration);
    transition-timing-function: linear;
    z-index: -1;
  }
  ::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: ${({ theme }) => theme.gradientBlack};
    border-radius: 50%;
    z-index: 0;
  }

  span {
    ::before,
    ::after {
      content: '';
      transition: 0.2s;
      border-radius: 50%;
      height: 100%;
      width: 100%;
      position: absolute;
      background: ${({ theme }) => theme.gradient};
      opacity: 1;
    }

    position: absolute;
    z-index: 1;
    transition: 0.2s;
    transform-origin: left;

    &:nth-child(1) {
      height: ${({ added }) => (added ? `1px` : `15px`)};
      width: ${({ added }) => (added ? `22px` : `15px`)};
      top: ${({ added }) => (added ? `20px` : `22px`)};
      left: 20px;
      transform: ${({ added }) => (added ? `translate(-4px, 7px) rotate(-45deg)` : `translate(-4.75px, -2.75px) rotate(-45deg)`)};
      background: ${({ theme }) => theme.gradient};
      ::before {
        top: ${({ added }) => (added ? `0` : `-50%`)};
        left: 0;
      }
      ::after {
        left: 50%;
        left: ${({ added }) => (added ? `0` : `50%`)};
        top: 0;
      }
    }

    &:nth-child(2) {
      height: ${({ added }) => (added ? `1px` : `13px`)};
      width: ${({ added }) => (added ? `10px` : `13px`)};
      top: ${({ added }) => (added ? `20px` : `22px`)};
      left: 20px;
      transform: ${({ added }) => (added ? `translate(-11px, -.5px) rotate(45deg)` : `translate(-4.75px, -2.75px) rotate(-45deg)`)};
      background: ${({ added, theme }) => (added ? theme.gradient : theme.gradientBlack)};

      ::before {
        top: ${({ added }) => (added ? `0%` : `-50%`)};
        left: 0;
        background: ${({ added, theme }) => (added ? theme.gradient : theme.gradientBlack)};
      }
      ::after {
        left: 50%;
        left: ${({ added }) => (added ? `0%` : `50%`)};
        top: 0;
        background: ${({ added, theme }) => (added ? theme.gradient : theme.gradientBlack)};
      }
    }
  }
`;

export default AddButton;
