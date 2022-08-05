import classNames from 'classnames';
import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';

import CloseButton from './CloseButton';

const Modal = ({ children, onClose, className, open }) => {
  const transition = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const backdropTransition = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 0.85 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {backdropTransition((styles, item) => item && <Backdrop style={styles} className={'modal-backdrop'} onClick={onClose} />)}
      {transition(
        (styles, item) =>
          item && (
            <StyledModal className={classNames(className, 'modal')} style={styles}>
              {children}
              <CloseButton className="modal__close" onClick={onClose} />
            </StyledModal>
          )
      )}
    </>
  );
};

export const Backdrop = styled(animated.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => rgba(theme.black, 0.75)};
  z-index: 2;
`;

const StyledModal = styled(animated.div)`
  display: flex;
  align-items: center;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: ${rgba('white', 1)};
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
`;

export default Modal;
