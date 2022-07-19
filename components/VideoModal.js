import { rgba } from 'polished';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { VscChromeClose } from 'react-icons/vsc';

import logo from '../public/m2l-tv.png';
import CloseButton from './CloseButton';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import fade from './Fade';

const VideoModal = ({ isolate, video, m2l_cat, post_title, onClose }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef]);

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={isolate} timeout={500}>
        <>
          {isolate && (
            <StyledVideo className="single-video">
              <div className="single-video__wrap">
                <video
                  className="single-video__video"
                  width={video.width}
                  height={video.height}
                  controls
                  poster={video.videopress.poster}
                  ref={videoRef}
                >
                  <source src={video.videopress.original} type="video/mp4" />
                </video>
              </div>
              <div className="single-video__info">
                <Image className="single-video__logo" src={logo} alt="M2L.tv" />
                <h1 className="single-video__title">{post_title}</h1>
                <p className="single-video__cat">{m2l_cat?.name}</p>
                <CloseButton className="single-video__close" onClick={onClose} />
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
  ${fade}
  .single-video {
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

    &__info {
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
    }

    &__close {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
`;

export default VideoModal;
