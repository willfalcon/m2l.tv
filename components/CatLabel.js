import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

const CatLabel = ({ className, children }) => {
  return (
    <Label className={classNames('cat-label', classNames)}>
      <span>{children}</span>
    </Label>
  );
};

const Label = styled.div`
  background: ${({ theme }) => theme.gradient};
  padding: 1rem 2rem;
  display: inline-block;
  border-radius: 15px;
  position: relative;
  span {
    color: ${({ theme }) => theme.pink};
    position: relative;
    z-index: 1;
    text-transform: uppercase;
    font-size: 1.8rem;
  }
  &::before {
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
