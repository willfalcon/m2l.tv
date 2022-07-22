import { rgba } from 'polished';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { VscChromeClose } from 'react-icons/vsc';
import { useVideo } from 'react-use';
import logo from '../public/m2l-tv.png';
import CloseButton from './CloseButton';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import fade from './Fade';
import useViewportSizes from '../lib/useViewportSizes';
import { useMeasure } from 'react-use';
import CountdownTimer from './CountdownTimer';

const VideoModal = ({ isolate, video, m2l_cat, post_title, onClose }) => {
  const { width, height, videopress } = video;

  const [viewportWidth, viewportHeight, update] = useViewportSizes();
  const [wrapperRef, size] = useMeasure();

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

  // console.log({ tooTallIfFullWidth, tooWideIfFullHeight, videoHeight, videoWidth, measuredWidth: size.width, measuredHeight: size.height });
  const [videoHTML, state, controls, ref] = useVideo(
    <video className="single-video__video" width={width} height={height} controls poster={videopress.poster}>
      <source src={videopress.original} type="video/mp4" />
    </video>
  );

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={isolate} timeout={500}>
        <>
          {isolate && (
            <StyledVideo className="single-video" videoSizes={videoSizes}>
              <div className="single-video__wrap" ref={wrapperRef}>
                <div className="single-video__inner">{!!size.width && videoHTML}</div>
                <CountdownTimer controls={controls} />
              </div>
              <div className="single-video__info">
                <Image className="single-video__logo" src={logo} alt="M2L.tv" />
                <h1 className="single-video__title">{post_title}</h1>
                <p className="single-video__cat">{m2l_cat?.name}</p>
                <CloseButton className="single-video__close" />
                {/* <VscChromeClose /> */}
              </div>
            </StyledVideo>
          )}
        </>
      </CSSTransition>
    </TransitionGroup>
  );
};

const StyledVideo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.black};
  z-index: 5;
  padding: 6rem;
  transition: 0.5s;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 100%;
  justify-items: center;
  ${fade}
  .single-video {
    &__wrap {
      width: 100%;
    }
    &__inner {
      width: ${({ videoSizes }) => (!!videoSizes.width ? `${videoSizes.width}px` : '100%')};
      height: ${({ videoSizes }) => (!!videoSizes.height ? `${videoSizes.height}px` : '100%')};
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
      width: ${({ videoSizes }) => (!!videoSizes.width ? `${videoSizes.width}px` : '100%')};
      height: ${({ videoSizes }) => (!!videoSizes.height ? `${videoSizes.height}px` : 'initial')};
    }

    &__info {
      width: ${({ videoSizes }) => (!!videoSizes.width ? `${videoSizes.width}px` : '100%')};
      display: grid;
      grid-template-columns: 200px 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        'logo title'
        '  .    cat';
      gap: 2rem;
      align-items: end;
      position: relative;
    }

    &__logo {
      grid-area: logo;
    }
    &__title {
      grid-area: title;
      margin: 0;
    }
    &__cat {
      grid-area: cat;
      color: ${({ theme }) => theme.pink};
      margin: 0;
    }

    &__close {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
`;

export default VideoModal;
