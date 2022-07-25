import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

import spin from './spin';

const CatLabel = ({ className, children }) => {
  return (
    <Label className={classNames('cat-label', className)}>
      <span>{children}</span>
    </Label>
  );
};

const Label = styled.div`
  padding: 1rem 2rem;
  display: block;
  width: auto;
  border-radius: 15px;
  position: relative;
  margin-bottom: 2rem;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -60%;
    left: -5%;
    width: 110%;
    height: 225%;
    border-radius: 15px;
    background: ${({ theme }) => theme.gradient};
  }
  :hover::before {
    animation: ${spin} 2s linear infinite;
  }
  span {
    color: ${({ theme }) => theme.pink};
    position: relative;
    z-index: 1;
    text-transform: uppercase;
    font-size: 1.8rem;
  }
  &::after {
    content: '';
    background: ${({ theme }) => theme.black};
    position: absolute;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    border-radius: 15px;
    z-index: 0;
  }
`;

export default CatLabel;
