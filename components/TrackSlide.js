import { rgba } from 'polished';
import React, { useState } from 'react';
// import { animated, useSpring, useTransition } from 'react-spring';
import styled from 'styled-components';
// import { SwiperSlide } from 'swiper/react';
// import theme from './theme';
import formatDuration from '../lib/formatDuration';
import CatLabel from './CatLabel';
import PlayButton from './PlayButton';

const TrackSlide = ({ className, setIsolate, id, video, post_title, m2l_cat }) => {
  return (
    <Button
      className="slide-video"
      // hover={hover}
      onClick={() => setIsolate({ id, video, post_title, m2l_cat })}
    >
      <img className="slide-video__poster" src={video.videopress?.poster} alt={post_title} />
      <div className="slide-video__content-wrap">
        <h3 className="slide-video__name">{post_title}</h3>
        <div className="slide-video__info">
          <CatLabel className="slide-video__cat">{m2l_cat?.name}</CatLabel>
          <p className="slide-video__duration">{formatDuration(video.videopress?.duration)}</p>
          {/* <PlayButton className="slide-video__play-button" /> */}
        </div>
      </div>
      {/* <SlideModal
        className="slide-video__expanded"
        onClick={() => setIsolate({ id, video, post_title, m2l_cat })}
        onMouseLeave={() => setHover(false)}
      >
        <img className="slide-video__poster" src={video.videopress?.poster} alt={post_title} />
        <h3 className="slide-video__name">{post_title}</h3>
      </SlideModal> */}
    </Button>
  );
};

const Button = styled.button`
  color: white;
  text-decoration: none;
  background: none;
  border: 0;
  cursor: pointer;
  display: block;
  position: relative;
  transition: 0.25s;
  transform: scale(1) translateY(0px);
  background: ${({ theme }) => rgba(theme.black, 0)};
  box-shadow: 'none';
  .slide-video {
    &__content-wrap {
      position: relative;
      transition: 0.25s;
      height: 40px;
      overflow: hidden;
    }
    &__name {
      position: absolute;
      display: block;
      /* width: 100%; */
      transition: 0.25s;
      /* left: 50%; */
      top: 0;
      /* transform: translateX(-50%); */
      text-align: left;
      margin: 0.5rem;
      /* margin-right: auto;
      margin-left: ${({ hover }) => (hover ? '0px' : 'auto')}; */
    }
    &__info {
      display: flex;
      overflow: hidden;
      transition: 0.25s;
      transition-delay: 0.25s;

      padding-top: 40px;
    }
    &__cat {
      margin: 0;
      margin-right: 1rem;
    }
    &__duration {
    }
    &__poster {
      /* transition: 0.5s; */
    }
    &__play-button {
      transform: scale(0.8);
      margin-left: auto;
    }
  }
  :hover {
    transform: scale(1.1) translateY(-30px);
    background: ${({ theme }) => rgba(theme.black, 1)};
    box-shadow: ${({ theme }) => theme.shadow};
    position: absolute;
    .slide-video {
      &__content-wrap {
        height: 100px;
      }
      &__name {
        /* left: 0%;
        transform: translateX(0%); */
      }
      &__info {
        /* height: 65px; */
      }
    }
  }
`;

export default TrackSlide;
