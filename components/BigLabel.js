import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

const BigLabel = ({ className, children }) => {
  return (
    <StyledLabel className={classNames('big-label', className)}>
      <span>{children}</span>
    </StyledLabel>
  );
};

const StyledLabel = styled.div`
  color: ${({ theme }) => theme.yellow};
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.purple};
  display: inline-block;
  padding: 1rem 2rem;
  transform: skew(-12deg);
  font-size: 2.6rem;
  > span {
    display: block;
    transform: skew(12deg);
  }
`;

export default BigLabel;
