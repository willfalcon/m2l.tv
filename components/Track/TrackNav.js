import React from 'react';
import styled from 'styled-components';
import { HiArrowNarrowRight, HiArrowNarrowLeft } from 'react-icons/hi';
import classNames from 'classnames';

import spin from '../spin';
import { media } from '../theme';
import useSpinEffect from '../../lib/useSpinEffect';

const TrackNav = ({ className, navDisabled, swiper }) => {
  const [prevSpin, prevHandlers] = useSpinEffect(3);
  const [nextSpin, nextHandlers] = useSpinEffect(3);

  return (
    <>
      <NavButton
        way="prev"
        className={classNames('track-nav track-prev', className)}
        disabled={navDisabled[0]}
        aria-disabled={navDisabled[0]}
        {...prevHandlers}
        style={prevSpin}
        onClick={() => {
          swiper.slideTo(swiper.activeIndex - 3);
        }}
      >
        <HiArrowNarrowLeft />
      </NavButton>
      <NavButton
        way="next"
        className={classNames('track-nav track-next', className)}
        disabled={navDisabled[1]}
        aria-disabled={navDisabled[1]}
        {...nextHandlers}
        style={nextSpin}
        onClick={() => {
          swiper.slideTo(swiper.activeIndex + 3);
        }}
      >
        <HiArrowNarrowRight />
      </NavButton>
    </>
  );
};

const NavButton = styled.button`
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;
  z-index: 3;
  background: none;
  padding: 0;
  cursor: pointer;
  display: none;
  opacity: 1;
  ${media.break`
    display: block;
  `}
  &::before {
    content: '';
    background: ${({ theme }) => theme.gradient};
    border-radius: 50%;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    position: absolute;
    transform: var(--angle);
    transition: var(--duration);
    transition-timing-function: linear;
  }

  &[aria-disabled='true'] {
    opacity: 0.5;
  }
  svg {
    color: white;
    width: 90%;
    height: 90%;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    transition: 0.5s ease-out;
  }
  :hover:not([aria-disabled='true']) svg {
    transform: translate(-50%, -50%) scale(1.1);
  }
  &.track-next {
    right: 10px;
  }
  &.track-prev {
    left: 10px;
  }
`;

export default TrackNav;
