import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Swiper, SwiperSlide } from 'swiper/react';

import BigLabel from '../BigLabel';
import TrackNav from './TrackNav';
import TrackSlide from '../TrackSlide/TrackSlide';
import ScrollWatcher from './ScrollWatcher';

import { media } from '../theme';
import useTrackContext from './TrackContext';
import useSiteContext from '../SiteContext';

import 'swiper/css/navigation';
import 'swiper/css';

const VideoTrack = ({ className, videos, label, description, name, slug, triggerLoadTags }) => {
  const [navDisabled, setNavDisabled] = useState([true, videos.length <= 3]);
  const { curriculumSlug, tagSlug, loadTags } = useSiteContext();
  const {
    hoverState,
    setHoverState,
    viewportSizes: { width, height },
    allReady,
  } = useTrackContext();

  const mobile = width < 768;

  const [swiperRef, setSwiperRef] = useState(null);

  const ref = useRef();

  useEffect(() => {
    if (curriculumSlug || tagSlug) {
      if (curriculumSlug === slug) {
        ref.current.scrollIntoView({ block: 'center' });
      }
      if (allReady) {
        if (tagSlug === slug) {
          ref.current.scrollIntoView({ block: 'center' });
        }
      }
    }
  }, [allReady]);

  return (
    <TrackWrapper className={classNames('video-track', className)} viewport={{ width, height }} id={slug} ref={ref}>
      {triggerLoadTags && (
        <ScrollWatcher
          onEnter={() => {
            loadTags(true);
          }}
        />
      )}
      <div className="video-track__header">
        <BigLabel className="video-track__label">{label || name}</BigLabel>
        <p className="video-track__description">{description}</p>
      </div>
      <Swiper
        className="video-track__list"
        spaceBetween={mobile ? 2 : 50}
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
          if (tagSlug && tagSlug === slug) {
            swiper.el.parentNode.scrollIntoView();
          }
        }}
      >
        {videos.map(video => (
          <SwiperSlide className="" key={video.id}>
            <TrackSlide {...video} setHoverState={setHoverState} hoverState={hoverState} viewportWidth={width} />
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
      width: 100%;
      padding: 0.5rem;
      max-width: 100%;
      margin: 0 auto;

      ${media.break`
        
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
