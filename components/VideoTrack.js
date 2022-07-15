import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import BigLabel from './BigLabel';
import Link from 'next/link';
import TrackNav from './TrackNav';
import useViewportSizes from 'use-viewport-sizes';
import { rgba } from 'polished';

const VideoTrack = ({ className, videos, label, description }) => {
  const [navDisabled, setNavDisabled] = useState([true, false]);
  const [width, height, update] = useViewportSizes();
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    update();
  }, []);

  return (
    <TrackWrapper className={classNames('video-track', className)} viewport={{ width, height }}>
      <div className="video-track__header">
        <BigLabel className="video-track__label">{label}</BigLabel>
        <p className="video-track__description">{description}</p>
      </div>
      <Swiper
        className="video-track__list"
        spaceBetween={50}
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
        {videos.map(video => {
          return (
            <SwiperSlide className="video-track__item" key={video.ID}>
              <Link href={`/video/${video.post_name}`}>
                <a className="video-track__link">
                  <img className="video-track__poster" src={video.video.videopress?.poster} alt={video.post_title} />
                  <h3 className="video-track__name">{video.post_title}</h3>
                  <p className="video-track__cat">{video.m2l_cat?.name}</p>
                </a>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <TrackNav navDisabled={navDisabled} swiper={swiperRef} />
    </TrackWrapper>
  );
};

const TrackWrapper = styled.div`
  position: relative;
  overflow: hidden;
  .video-track {
    &__header {
      width: ${({ theme }) => theme.sizes.content}px;
      max-width: 100%;
      margin: 0 auto;
      padding: 0 2rem;
    }
    &__label {
      margin-bottom: 2rem;
      display: inline-block;
    }
    &__description {
      display: inline;
      margin-left: 2rem;
      color: ${({ theme }) => theme.neon};
    }
    &__list {
      overflow: visible;
      /* width: ${({ theme }) => theme.sizes.content}px; */
      width: calc(100% - 120px);
      @media (min-width: 1500px) {
        width: 1200px;
      }
      max-width: 100%;
      margin: 0 auto;
      padding: 2rem;
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100px;
        background: ${({ theme }) => `linear-gradient(to right, ${rgba(theme.black, 0)}, ${rgba(theme.black, 1)})`};
        right: -60px;
        top: 0;
        z-index: 2;
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
      }
    }
    &__cat {
      color: ${({ theme }) => theme.pink};
    }
    &__link {
      color: white;
      text-decoration: none;
    }
  }
`;

export default VideoTrack;
