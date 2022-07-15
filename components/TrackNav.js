import React, { useState } from 'react';
import styled from 'styled-components';
import { HiArrowNarrowRight, HiArrowNarrowLeft } from 'react-icons/hi';
import classNames from 'classnames';

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
  top: 47%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.gradient};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;
  z-index: 3;
  cursor: pointer;
  &[aria-disabled='true'] {
    opacity: 0.5;
  }
  svg {
    color: white;
    width: 90%;
    height: 90%;
  }
  &.track-next {
    right: 10px;
  }
  &.track-prev {
    left: 10px;
  }
`;

export default TrackNav;
