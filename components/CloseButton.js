import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import Link from 'next/link';

const CloseButton = ({ className, onClick }) => {
  if (onClick) {
    return (
      <Button className={classNames('close-button', className)} onClick={onClick}>
        <span />
        <span />
      </Button>
    );
  }
  return (
    <Link href="/">
      <ButtonLink className={classNames('close-button close-button--link', className)}>
        <span />
        <span />
      </ButtonLink>
    </Link>
  );
};

const ButtonStyles = css`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.gradient};
  border: 0;
  border-radius: 50%;
  z-index: 0;
  padding: 0;
  box-shadow: ${({ theme }) => theme.shadow};
  position: absolute;
  cursor: pointer;
  &::before {
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
const Button = styled.a`
  ${ButtonStyles}
`;

const ButtonLink = styled.a`
  ${ButtonStyles}
`;

export default CloseButton;
