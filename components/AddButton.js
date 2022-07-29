import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

const AddButton = ({ className, onClick, added }) => {
  return (
    <Button className={classNames('add-button', className)} onClick={onClick} added={added}>
      <span />
      <span />
    </Button>
  );
};

const ButtonStyles = css`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.gradient};
  border: 0;
  border-radius: 20px;
  z-index: 0;
  padding: 0;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
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
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 3;
    transition: 0.25s;
    transform-origin: left;
    width: 25px;
    ${({ added }) =>
      added
        ? `
        &:nth-child(1) {
        width: 22px;
        transform: translate(-11px, -11px) rotate(-45deg);
        transform: translate(-4px, 7px) rotate(-45deg);
      }
      &:nth-child(2) {
        width: 10px;
        transform: translate(-11px,-.5px) rotate(45deg);
      }
    `
        : `
      &:nth-child(1) {
        width: 25px;
        transform: translate(-12.5px,-.5px) rotate(0deg);
      }
      &:nth-child(2) {
        width: 25px;
        transform: translate(-0px,-12.5px) rotate(90deg);
      }
    `};
  }
`;
const Button = styled.button`
  ${ButtonStyles}
`;

const ButtonLink = styled.a`
  ${ButtonStyles}
`;

export default AddButton;
