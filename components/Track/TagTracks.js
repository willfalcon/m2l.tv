import React, { useEffect, useState } from 'react';

import VideoTrack from './VideoTrack';
import VideoModal from '../VideoModal';
import HoverStates from '../TrackSlide/HoverStates';
import { TrackContextProvider } from './TrackContext';
import useSiteContext from '../SiteContext';
import useViewportSizes from '../../lib/useViewportSizes';
import theme from '../theme';

const TagTracks = ({ topVideos, videoSlug }) => {
  const { setIsolate, toggleVideoModal, favorites } = useSiteContext();

  const [videos, setVideos] = useState([]);
  const [favoriteVids, setFavoriteVids] = useState([]);

  const [width, height, update] = useViewportSizes();

  useEffect(() => {
    update();
    async function getVideos() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v2/videos-by-tag`);
      const data = await res.json();

      setVideos(data);
    }
    getVideos();
  }, []);

  const [hoverState, setHoverState] = useState([]);
  return (
    <TrackContextProvider data={{ hoverState, setHoverState, viewportSizes: { width, height } }}>
      <VideoTrack videos={topVideos.slice(1)} label="Top Videos" />
      {videos.map(track => (
        <VideoTrack key={track.term_id} {...track} />
      ))}
      <VideoModal />
      {width >= theme.sizes.break && <HoverStates />}
    </TrackContextProvider>
  );
};

export default TagTracks;
