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
import TagsList from './TagsList';
import CountdownTimer from './CountdownTimer';

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
      <CatLabel className="primary-video__category" slug={m2l_cat?.slug} rounded>
        {m2l_cat?.name}
      </CatLabel>
      <TagsList className="primary-video__tags" tags={tags} />
      <div className="primary-video__meta">
        <span className="primary-video__duration">{formatDuration(video.videopress.duration)}</span>
        <PlayButton
          className="primary-video__play-button"
          onClick={() => {
            setIsolate({ id, video, post_title, m2l_cat, tags });
            toggleVideoModal(true);
            router.push(`?video=${post_name}`, `/video/${post_name}`, { shallow: true });
          }}
        />
      </div>

      <div className="primary-video__video-container">
        <div className="primary-video__wrap">
          {videoHtml}
          <CountdownTimer controls={controls} videoRef={ref} />
        </div>
      </div>
    </PrimaryVideoContainer>
  );
};

const PrimaryVideoContainer = styled.main`
  display: flex;
  width: ${({ theme }) => theme.sizes.content}px;
  max-width: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto auto;
  align-items: center;
  justify-items: start;
  grid-template-areas:
    'title label'
    'video video'
    'meta cat'
    'tags tags';
  padding: 2rem;
  gap: 2rem;
  ${media.break`
    padding: 8rem 2rem;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto auto auto auto 1fr;
    gap: 2rem 1rem;
    grid-template-areas:
      'label video'
      'title video'
      'cat video'
      'tags video'
      'meta video';
      align-items: start;
  `}
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
      margin: 0;
    }
    &__category {
      grid-area: cat;
      justify-self: end;
      margin: 0;
      ${media.break`
        justify-self: start;

      `}
    }
    &__tags {
      grid-area: tags;
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        display: inline;
        color: ${({ theme }) => theme.pink};
      }
    }
    &__meta {
      grid-area: meta;
      display: flex;
      gap: 1rem;
      align-items: center;
      ${media.break`
        display: initial;
      `}
    }
    &__play-button {
      order: 1;
      ${media.break`
        order: 2;
      `}
    }
    &__duration {
      color: ${({ theme }) => theme.pink};
      display: inline;
      order: 2;
      ${media.break`
      
        margin-top: 2rem;
        margin-right: 2rem;
        order: 1;
      `}
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
