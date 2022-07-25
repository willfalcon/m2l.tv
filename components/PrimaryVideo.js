import React from 'react';
import styled from 'styled-components';
import { useVideo } from 'react-use';
import { useRouter } from 'next/router';

import BigLabel from './BigLabel';
import CatLabel from './CatLabel';
import PlayButton from './PlayButton';

import formatDuration from '../lib/formatDuration';
import { media } from './theme';
import useSiteContext from './SiteContext';

const PrimaryVideo = props => {
  const { id, post_title, m2l_cat, video, post_name, tags } = props;
  const { setIsolate, toggleVideoModal } = useSiteContext();

  const [videoHtml, state, controls, ref] = useVideo(
    <video className="primary-video__video" width={video.width} height={video.height} controls poster={video.videopress.poster}>
      <source src={video.videopress.original} type="video/mp4" />
    </video>
  );

  const router = useRouter();

  return (
    <PrimaryVideoContainer className="primary-video">
      <BigLabel className="primary-video__label">Watch Now</BigLabel>
      <h1 className="primary-video__title">{post_title}</h1>
      <CatLabel className="primary-video__category" rounded>
        {m2l_cat?.name}
      </CatLabel>
      <div className="primary-video__meta">
        <span className="primary-video__duration">{formatDuration(video.videopress.duration)}</span>
        <PlayButton
          onClick={() => {
            setIsolate({ id, video, post_title, m2l_cat, tags });
            toggleVideoModal(true);
            router.push(`?video=${post_name}`, `/video/${post_name}`, { shallow: true });
          }}
        />
      </div>

      <div className="primary-video__video-container">
        <div className="primary-video__wrap">{videoHtml}</div>
      </div>
    </PrimaryVideoContainer>
  );
};

const PrimaryVideoContainer = styled.main`
  display: flex;
  width: ${({ theme }) => theme.sizes.content}px;
  max-width: 100%;
  margin: 0 auto;
  padding: 8rem 2rem;

  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;

  grid-template-areas:
    'title label'
    'video video'
    'meta cat';

  ${media.break`
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto auto auto 1fr;
    gap: 1rem;
    grid-template-areas:
      'label video'
      'title video'
      'cat video'
      'meta video';
  `}
  align-items: start;
  justify-items: start;
  .primary-video {
    &__label {
      grid-area: label;
      justify-self: end;
      ${media.break`
        justify-self: start;
      `}
    }
    &__title {
      grid-area: title;
    }
    &__category {
      grid-area: cat;
      justify-self: end;
      ${media.break`
        justify-self: start;
      `}
    }
    &__meta {
      grid-area: meta;
    }

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
      grid-area: video;
      width: 100%;
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
