import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import logo from '../public/m2l-tv.png';

const SingleVideo = ({ video, m2l_cat, post_title }) => {
  return (
    <StyledVideo className="single-video">
      <div className="single-video__wrap">
        <video className="single-video__video" width={video.width} height={video.height} controls poster={video.videopress.poster}>
          <source src={video.videopress.original} type="video/mp4" />
        </video>
      </div>
      <div className="single-video__info">
        <Image className="single-video__logo" src={logo} alt="M2L.tv" />
        <h1 className="single-video__title">{post_title}</h1>
        <p className="single-video__cat">{m2l_cat?.name}</p>
      </div>
    </StyledVideo>
  );
};

const StyledVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => rgba(theme.black, 0.5)};
  padding: 6rem;
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
  }
`;

export default SingleVideo;
