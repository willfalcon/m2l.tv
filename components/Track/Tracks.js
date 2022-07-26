import React, { useEffect, useState } from 'react';

import VideoTrack from './VideoTrack';
import VideoModal from './VideoModal';
import HoverStates from './HoverStates';

import useSiteContext from '../SiteContext';
import useViewportSizes from '../../lib/useViewportSizes';
import theme from '../theme';

const Tracks = ({ topVideos, videoSlug }) => {
  const { setIsolate, toggleVideoModal } = useSiteContext();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v2/all-videos`);
      const data = await res.json();
      setVideos(data);

      if (videoSlug) {
        const openedVideo = videoSlug
          ? data
              .filter(cat => {
                return cat.videos.some(video => video.post_name === videoSlug);
              })[0]
              .videos.find(video => video.post_name === videoSlug)
          : null;

        setIsolate(openedVideo);
        toggleVideoModal(true);
      }
    }
    getVideos();
  }, []);

  const [hoverState, setHoverState] = useState([]);
  const [width, height, update] = useViewportSizes();

  useEffect(() => {
    update();
  }, []);

  return (
    <>
      <VideoTrack
        videos={topVideos.slice(1)}
        label="Top Videos"
        setHoverState={setHoverState}
        hoverState={hoverState}
        width={width}
        height={height}
      />
      {videos.map(track => (
        <VideoTrack key={track.term_id} {...track} setHoverState={setHoverState} hoverState={hoverState} width={width} height={height} />
      ))}
      <VideoModal />
      {width >= theme.sizes.break && <HoverStates hoverState={hoverState} setHoverState={setHoverState} />}
    </>
  );
};

export default Tracks;
