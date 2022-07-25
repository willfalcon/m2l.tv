import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import BigLabel from '../BigLabel';

import TrackNav from './TrackNav';
import useViewportSizes from '../../lib/useViewportSizes';
import { rgba } from 'polished';
import TrackSlide from './TrackSlide';
import { media } from '../theme';
import useSiteContext from '../SiteContext';

const VideoTrack = ({ className, videos, label, description, name }) => {
  const [navDisabled, setNavDisabled] = useState([true, false]);
  const [width, height, update] = useViewportSizes();
  const mobile = width < 768;
  const [swiperRef, setSwiperRef] = useState(null);

  const [trackHeight, setTrackHeight] = useState(null);

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    if (swiperRef?.el?.clientHeight) {
      setTrackHeight(swiperRef.el.clientHeight);
    }
  }, [swiperRef]);

  return (
    <TrackWrapper className={classNames('video-track', className)} viewport={{ width, height }} trackHeight={trackHeight}>
      <div className="video-track__header">
        <BigLabel className="video-track__label">{label || name}</BigLabel>
        <p className="video-track__description">{description}</p>
      </div>
      <Swiper
        className="video-track__list"
        spaceBetween={mobile ? 0 : 50}
        slidesPerView={3}
        onSlideChange={swiper => {
          if (swiper.isBeginning) {
            setNavDisabled([true, false]);
          } else if (swiper.isEnd) {
            setNavDisabled([false, true]);
          } else {
            setNavDisabled([false, false]);
          }
        }}
        onSwiper={swiper => {
          setSwiperRef(swiper);
        }}
      >
        {videos.map(video => (
          <SwiperSlide className="" key={video.id}>
            <TrackSlide {...video} />
          </SwiperSlide>
        ))}
      </Swiper>
      <TrackNav navDisabled={navDisabled} swiper={swiperRef} />
    </TrackWrapper>
  );
};

const TrackWrapper = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 3rem;
  @media (min-width: 1500px) {
    ::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100px;
      background: ${({ theme }) => `linear-gradient(to right, ${rgba(theme.black, 0)}, ${rgba(theme.black, 1)})`};
      right: 0;
      top: 0;
      z-index: 2;
    }
    ::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100px;
      background: ${({ theme }) => `linear-gradient(to left, ${rgba(theme.black, 0)}, ${rgba(theme.black, 1)})`};
      left: 0;
      top: 0;
      z-index: 2;
    }
  }
  .video-track {
    &__header {
      width: ${({ theme }) => theme.sizes.content}px;
      max-width: 100%;
      margin: 0 auto;
      padding: 0 2rem;
    }
    &__label {
      display: inline-block;
      ${media.break`
        margin-bottom: 2rem;
      `}
    }
    &__description {
      color: ${({ theme }) => theme.neon};
      ${media.break`
        display: inline;
        margin-left: 2rem;
      `}
    }
    &__list {
      overflow: visible;
      /* width: ${({ theme }) => theme.sizes.content}px; */
      width: 100%;
      padding: 0.5rem;
      max-width: 100%;
      margin: 0 auto;

      ${media.break`
        height: ${({ trackHeight }) => (trackHeight ? `${trackHeight}px` : 'auto')};
        width: calc(100% - 120px);
        padding: 2rem;
        @media (min-width: 1500px) {
          width: 1200px;
        }
      `}
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100px;
        background: ${({ theme }) => `linear-gradient(to right, ${rgba(theme.black, 0)}, ${rgba(theme.black, 1)})`};
        right: -60px;
        top: 0;
        z-index: 2;
        @media (min-width: 1500px) {
          display: none;
        }
      }
      &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 100px;
        background: ${({ theme }) => `linear-gradient(to right, ${rgba(theme.black, 1)}, ${rgba(theme.black, 0)})`};
        left: -60px;
        top: 0;
        z-index: 2;
        @media (min-width: 1500px) {
          display: none;
        }
      }
    }
  }
`;

export default VideoTrack;
