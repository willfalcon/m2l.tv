import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { animated, useTransition } from 'react-spring';
import { useMeasure, useVideo } from 'react-use';
import { useRouter } from 'next/router';

import CloseButton from '../CloseButton';
import CountdownTimer from './CountdownTimer';
import CatLabel from '../CatLabel';
import TagsList from '../TagsList';
import Video from './Video';

import logo from '../../public/m2l-tv.png';
import useSiteContext from '../SiteContext';
import { media } from '../theme';

const VideoModal = () => {
  const [wrapperRef, size] = useMeasure();
  const router = useRouter();
  const { isolate, videoModal, toggleVideoModal } = useSiteContext();
  const post_title = isolate?.post_title || '';
  const m2l_cat = isolate?.m2l_cat || '';
  const tags = isolate?.tags || [];
  const aspect = 16 / 9;

  const heightIfFullWidth = size.width / aspect;
  const tooTallIfFullWidth = heightIfFullWidth > size.height;

  //a = w / h    ah = w    h = w / a

  const videoSizes = tooTallIfFullWidth
    ? {
        width: aspect * size.height,
        height: size.height,
      }
    : {
        width: size.width,
        height: heightIfFullWidth,
      };

  const transition = useTransition(videoModal, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [controls, setControls] = useState();
  const [ref, setRef] = useState();

  return transition(
    (styles, item) =>
      item && (
        <StyledVideo className="single-video" style={styles} videosizes={videoSizes}>
          <div className="single-video__wrap" ref={wrapperRef}>
            <div className="single-video__inner">
              {!!size.width && <Video className="single-video__video" setControls={setControls} setRef={setRef} isolate={isolate} />}
            </div>
          </div>
          <div className="single-video__info">
            <div className="single-video__logo">
              <Image className="single-video__logo-image" src={logo} alt="M2L.tv" />
            </div>
            <h1 className="single-video__title">{post_title}</h1>
            <CatLabel className="single-video__cat" slug={m2l_cat?.slug}>
              {m2l_cat?.name}
            </CatLabel>
            <TagsList className="single-video__tags" tags={tags} />
            <CloseButton
              className="single-video__close"
              onClick={() => {
                toggleVideoModal(false);
                router.push('/', undefined, { shallow: true });
              }}
            />
          </div>
        </StyledVideo>
      )
  );
};

const StyledVideo = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.black};
  z-index: 5;
  padding: 1rem;

  display: grid;
  grid-template-rows: 56.25vw 1fr;
  grid-template-columns: 100%;
  justify-items: center;
  ${media.break`
    padding: 6rem;
    grid-template-rows: 1fr auto;
  `}

  .single-video {
    &__wrap {
      width: 100%;
    }
    &__inner {
      width: ${({ videosizes }) => (!!videosizes.width ? `${videosizes.width}px` : '100%')};
      height: ${({ videosizes }) => (!!videosizes.height ? `${videosizes.height}px` : '100%')};
      position: relative;
      margin-left: auto;
      margin-right: auto;
    }
    &__video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      width: ${({ videosizes }) => (!!videosizes.width ? `${videosizes.width}px` : '100%')};
      height: ${({ videosizes }) => (!!videosizes.height ? `${videosizes.height}px` : 'initial')};
    }

    &__info {
      width: ${({ videosizes }) => (!!videosizes.width ? `${videosizes.width}px` : '100%')};
      display: grid;
      gap: 2rem;
      align-items: end;
      position: relative;
      grid-template-rows: auto auto auto 1fr;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'title title'
        'cat     .  '
        'tags   tags'
        'logo    .  ';

      ${media.break`
        grid-template-columns: 200px auto 1fr;
        grid-template-rows: auto auto;
        grid-template-areas:
          'logo title title'
          ' .    cat   tags';
      
      `}
    }

    &__logo {
      grid-area: logo;
    }
    &__title {
      grid-area: title;
      margin: 0;
      padding-right: 70px;
    }
    &__cat {
      grid-area: cat;
      color: ${({ theme }) => theme.pink};
      margin: 0;
      justify-self: start;
    }

    &__tags {
      color: ${({ theme }) => theme.pink};
      grid-area: tags;
      list-style: none;
      padding: 0;
      margin: 0;
      align-self: center;
      text-align: left;
      li {
        display: inline;
      }
    }

    &__close {
      position: absolute;
      top: 10px;
      right: 20px;
      ${media.break`
      top: 20px;
      `}
    }
  }
`;

export default VideoModal;
