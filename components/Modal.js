import classNames from 'classnames';
import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';
import CloseButton from './CloseButton';

const Modal = ({ children, onClose, className }) => {
  return (
    <ModalWrap>
      <Backdrop className={'modal-backdrop'} onClick={onClose} />
      <StyledModal className={'modal'}>
        {children}
        <CloseButton className="modal__close" />
      </StyledModal>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
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

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => rgba(theme.black, 0.75)};
  z-index: 2;
  transition: 0.5s;
`;

const StyledModal = styled.div`
  display: flex;
  align-items: center;
  transition: 0.5s;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: ${rgba('white', 0.85)};
  color: ${({ theme }) => theme.black};
  width: 800px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 4rem;
  .modal {
    &__close {
      top: 10px;
      right: 10px;
    }
  }

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

export default Modal;
