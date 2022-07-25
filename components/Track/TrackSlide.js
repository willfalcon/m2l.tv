import React from 'react';
import { useRouter } from 'next/router';
import { rgba } from 'polished';
import styled from 'styled-components';

import CatLabel from '../CatLabel';

import formatDuration from '../../lib/formatDuration';
import useSiteContext from '../SiteContext';
import { media } from '../theme';

const TrackSlide = ({ id, video, post_title, post_name, m2l_cat, tags }) => {
  const router = useRouter();
  const { setIsolate, toggleVideoModal } = useSiteContext();
  return (
    <Button
      className="slide-video"
      // hover={hover}
      onClick={() => {
        setIsolate({ id, video, post_title, m2l_cat, tags });
        toggleVideoModal(true);
        router.push(`?video=${post_name}`, `/video/${post_name}`, { shallow: true });
      }}
    >
      <img className="slide-video__poster" src={video.videopress?.poster} alt={post_title} />
      <div className="slide-video__content-wrap">
        <h3 className="slide-video__name">{post_title}</h3>
        <div className="slide-video__info">
          <CatLabel className="slide-video__cat">{m2l_cat?.name}</CatLabel>
          <p className="slide-video__duration">{formatDuration(video.videopress?.duration)}</p>
        </div>
      </div>
    </Button>
  );
};

const Button = styled.a`
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
      ${media.break`
        overflow: hidden;
        height: 40px;
      `}
    }
    &__name {
      display: block;
      margin: 0.5rem;
      ${media.break`
        transition: 0.25s;
        position: absolute;
        top: 0; 
        text-align: left;
      `}
    }
    &__info {
      overflow: hidden;
      transition: 0.25s;
      transition-delay: 0.25s;
      padding-top: 40px;
      display: none;
      ${media.break`
        display: flex;
      `}
    }
    &__cat {
      margin: 0;
      margin-right: 1rem;
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
    }
  }
`;

export default TrackSlide;
