import React from 'react';
import styled from 'styled-components';
import BigLabel from './BigLabel';
import CatLabel from './CatLabel';
import formatDuration from '../lib/formatDuration';

const PrimaryVideo = ({ post_title, m2l_cat, video }) => {
  return (
    <Container className="primary-video">
      <div className="primary-video__info">
        <BigLabel className="primary-video__label">Watch Now</BigLabel>
        <h1 className="primary-video__title">{post_title}</h1>
        <CatLabel className="primary-video__category" rounded>
          {m2l_cat?.name}
        </CatLabel>

        <span className="primary-video__duration">{formatDuration(video.videopress.duration)}</span>
      </div>
      <div className="primary-video__video-container">
        <div className="primary-video__wrap">
          <video className="primary-video__video" width={video.width} height={video.height} controls poster={video.videopress.poster}>
            <source src={video.videopress.original} type="video/mp4" />
          </video>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  width: ${({ theme }) => theme.sizes.content}px;
  max-width: 100%;
  margin: 0 auto;
  padding: 8rem 2rem;
  .primary-video {
    &__duration {
      color: ${({ theme }) => theme.pink};
      display: block;
      margin-top: 2rem;
    }
    &__info {
      flex: 0 0 250px;
    }
    &__video-container {
      flex-grow: 1;
    }
    &__wrap {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
    }
    &__video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

export default PrimaryVideo;
