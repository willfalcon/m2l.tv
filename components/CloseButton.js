import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import Link from 'next/link';

import useSpinEffect from '../lib/useSpinEffect';

const CloseButton = ({ className, onClick, style }) => {
  const [spin, handlers] = useSpinEffect();

  if (onClick) {
    return (
      <Button
        className={classNames('close-button', className)}
        onClick={onClick}
        {...handlers}
        style={{
          ...spin,
          style,
        }}
      >
        <span />
        <span />
      </Button>
    );
  }
  return (
    <Link href="/">
      <ButtonLink
        className={classNames('close-button close-button--link', className)}
        onMouseOver={() => setTurning(true)}
        onMouseLeave={() => setTurning(false)}
      >
        <span />
        <span />
      </ButtonLink>
    </Link>
  );
};

const ButtonStyles = css`
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  z-index: 0;
  padding: 0;
  box-shadow: ${({ theme }) => theme.shadow};
  position: absolute;
  cursor: pointer;
  background: none;
  ::before {
    content: '';
    background: ${({ theme }) => theme.gradient};
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    position: absolute;
    transform: var(--angle);
    transition: var(--duration);
    transition-timing-function: linear;
  }
  &::after {
    content: '';
    background: ${({ theme }) => theme.black};
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 50%;
    z-index: 1;
  }

  span {
    width: 25px;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    &:nth-child(1) {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:nth-child(2) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;
const Button = styled.button`
  ${ButtonStyles}
`;

const ButtonLink = styled.a`
  ${ButtonStyles}
`;

export default CloseButton;
