import React from 'react';
import styled from 'styled-components';
import { HiArrowNarrowRight, HiArrowNarrowLeft } from 'react-icons/hi';
import classNames from 'classnames';
import spin from '../spin';

import { media } from '../theme';

const TrackNav = ({ className, navDisabled, swiper }) => {
  return (
    <>
      <NavButton
        way="prev"
        className={classNames('track-nav track-prev', className)}
        disabled={navDisabled[0]}
        aria-disabled={navDisabled[0]}
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
    /* transition: 0.25s; */
  }
  :hover::before {
    animation: ${spin} 2s linear infinite;
  }

  &[aria-disabled='true'] {
    opacity: 0.5;
  }
  svg {
    color: white;
    width: 90%;
    height: 90%;
    z-index: 1;
    position: relative;
  }
  &.track-next {
    right: 10px;
  }
  &.track-prev {
    left: 10px;
  }
`;

export default TrackNav;
