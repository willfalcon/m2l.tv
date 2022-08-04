import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useSpinEffect from '../../lib/useSpinEffect';

import BigPlayButton from './BigPlayButton';

const CountdownTimer = ({ controls, videoRef, name }) => {
  const [timer, setTimer] = useState(3);
  const [timerStarted, startTimer] = useState(false);

  const [spin] = useSpinEffect(4, true);

  const [videoBeenPlayed, setVideoBeenPlayed] = useState(false);

  function decrementInOneSecond(current) {
    setTimeout(() => {
      if (current > 0) {
        setTimer(current - 1);
        decrementInOneSecond(current - 1);
      } else {
        controls.play();
      }
    }, 1000);
  }

  function checkUI() {
    if (!videoBeenPlayed) {
      gtag('event', 'video_play', {
        video_name: name,
      });

      setVideoBeenPlayed(true);
    }

    if (timer > 0) {
      setTimer(0);
    }
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.addEventListener('play', checkUI);
    }
    return () => {
      if (videoRef?.current) {
        videoRef.current.removeEventListener('play', checkUI);
      }
    };
  }, [videoRef, videoBeenPlayed]);

  if (timer === 0) {
    return null;
  }

  return timerStarted ? (
    <Countdown className="countdown" style={spin}>
      <span>{timer}</span>
    </Countdown>
  ) : (
    <BigPlayButton
      className="single-video__play-button"
      onClick={() => {
        startTimer(true);
        decrementInOneSecond(timer);
      }}
    />
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

    transform: var(--angle);
    transition: var(--duration);
    transition-timing-function: linear;
  }
`;

export default CountdownTimer;
