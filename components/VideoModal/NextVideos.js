import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import BigPlayButton from '../BigPlayButton';
import CountdownTimer from '../CountdownTimer';
import useSiteContext from '../SiteContext';
import theme, { media } from '../theme';
import useTrackContext, { TrackContext } from '../Tracks/TrackContext';
import TrackSlide from '../Tracks/TrackSlide/TrackSlide';

const NextVideos = ({ finished, setFinished }) => {
  const { isolate, setIsolate, toggleVideoModal } = useSiteContext();
  const { videos } = useTrackContext();
  const router = useRouter();

  const track = videos.find(track => track.slug === isolate.m2l_cat.slug);
  const currentIndex = track.videos.findIndex(video => video.post_name === isolate.post_name);
  // console.log(currentIndex);
  const nextIndex = currentIndex === track.videos.length - 1 ? 0 : currentIndex + 1;
  const next = track.videos[nextIndex];

  const plus2 = nextIndex === track.videos.length - 1 ? 0 : nextIndex + 1;
  const plus3 = plus2 === track.videos.length - 1 ? 0 : plus2 + 1;
  const plus4 = plus3 === track.videos.length - 1 ? 0 : plus3 + 1;

  const nextFew = [track.videos[plus2], track.videos[plus3], track.videos[plus4]];

  return (
    <NextVideosWrapper>
      <h2>Up Next:</h2>
      <div className="next-video">
        <TrackSlide className="next-video__video-slide" {...next} noHover />
        <CountdownTimer
          time={10}
          onFinish={() => {
            toggleVideoModal(false);
            setIsolate(next);
            router.push(`?video=${next.post_name}`, `/video/${next.post_name}`, { shallow: true });
            toggleVideoModal(true);
          }}
          startImmediately
        />
      </div>
      {/* <h3>More {track.name} videos: </h3> */}
      {/* <div className="next-few">
        {nextFew.map(video => (
          <div className="next-few__slide">
            <TrackSlide className="next-video__video-slide" {...video} noHover />
          </div>
        ))}
      </div> */}
    </NextVideosWrapper>
  );
};

const NextVideosWrapper = styled.div`
  background: ${({ theme }) => theme.black};

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 3fr auto 2fr;

  position: relative;

  ${media.break`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  `}

  h2 {
    margin-top: 0;
  }
  .next-video {
    position: relative;
    max-width: 100%;
    ${media.break`
    width: 500px;
    `}
    &__play-button {
      pointer-events: none;
    }
  }

  .next-few {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
    &__slide {
      position: relative;
    }
    .slide-video {
      display: grid;
      grid-template-rows: 1fr auto;
      img {
        /* height: 100%; */
      }
    }
  }
`;

export default NextVideos;
