import React, { useState } from 'react';
import styled from 'styled-components';
import BigLabel from './BigLabel';
import CatLabel from './CatLabel';
import formatDuration from '../lib/formatDuration';
import PlayButton from './PlayButton';
import VideoModal from './VideoModal';

const PrimaryVideo = props => {
  const { post_title, m2l_cat, video } = props;

  const [isolateMode, setIsolateMode] = useState(false);

  return (
    <PrimaryVideoContainer className="primary-video">
      <div className="primary-video__info">
        <BigLabel className="primary-video__label">Watch Now</BigLabel>
        <h1 className="primary-video__title">{post_title}</h1>
        <CatLabel className="primary-video__category" rounded>
          {m2l_cat?.name}
        </CatLabel>
        <div>
          <span className="primary-video__duration">{formatDuration(video.videopress.duration)}</span>
          <PlayButton onClick={() => setIsolateMode(true)} />
        </div>
      </div>
      <div className="primary-video__video-container">
        <div className="primary-video__wrap">
          <video className="primary-video__video" width={video.width} height={video.height} controls poster={video.videopress.poster}>
            <source src={video.videopress.original} type="video/mp4" />
          </video>
        </div>
      </div>
      {isolateMode && <VideoModal {...props} onClose={() => setIsolateMode(false)} />}
    </PrimaryVideoContainer>
  );
};

const PrimaryVideoContainer = styled.main`
  display: flex;
  width: ${({ theme }) => theme.sizes.content}px;
  max-width: 100%;
  margin: 0 auto;
  padding: 8rem 2rem;
  .primary-video {
    &__duration {
      color: ${({ theme }) => theme.pink};
      display: inline;
      margin-top: 2rem;
      margin-right: 2rem;
    }
    &__info {
      flex: 0 0 250px;
      display: flex;
      flex-direction: column;
      align-items: start;
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
