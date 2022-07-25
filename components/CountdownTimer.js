import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import spin from './spin';

const CountdownTimer = ({ controls }) => {
  const [timer, setTimer] = useState(3);

  function decrementInOneSecond(current) {
    setTimeout(() => {
      if (current > 0) {
        setTimer(current - 1);
      } else {
        controls.play();
      }
    }, 1000);
  }

  useEffect(() => {
    decrementInOneSecond(timer);
  }, [timer]);

  return timer === 0 ? null : (
    <Countdown className="countdown">
      <span>{timer}</span>
    </Countdown>
  );
};

const Countdown = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  font-size: 5rem;
  color: white;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    z-index: 1;
  }
  &::after {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradient};
    position: absolute;
    border-radius: 50%;
    z-index: 0;
    animation: ${spin} 1s linear infinite;
  }
`;

export default CountdownTimer;
