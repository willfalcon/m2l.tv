import React, { useEffect, useState } from 'react';

import VideoTrack from './VideoTrack';
import VideoModal from '../VideoModal/VideoModal';
import HoverStates from './HoverStates';
import { TrackContextProvider } from './TrackContext';

import useViewportSizes from '../../lib/useViewportSizes';
import theme from '../theme';
import useTracksData from './useTracksData';
import useSiteContext from '../SiteContext';
import mockHoverState from './TrackSlide/mockHoverState';

const Tracks = ({ topVideos, videoSlug }) => {
  const [width, height, updateViewportSizes] = useViewportSizes();

  useEffect(() => {
    updateViewportSizes();
  }, []);

  const { videos, favoriteVids, favsReady } = useTracksData(videoSlug);
  const [hoverState, setHoverState] = useState([]);

  const [tags, setTags] = useState(null);

  const { tagSlug, loadingTags } = useSiteContext();

  useEffect(() => {
    if (loadingTags || tagSlug) {
      async function getTags() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v2/videos-by-tag`);
        const data = await res.json();
        setTags(data);
      }
      getTags();
    }
  }, [loadingTags, tagSlug]);

  const [allReady, setAllReady] = useState(false);

  useEffect(() => {
    if (!!tags?.length && !!videos.length && favsReady) {
      setAllReady(true);
    }
  }, [tags, videos, favsReady]);

  return (
    <TrackContextProvider data={{ setHoverState, viewportSizes: { width, height }, allReady, videos }}>
      <VideoTrack videos={topVideos.slice(1)} label="Top Videos" slug="top-videos" />
      {!!favoriteVids.length && <VideoTrack videos={favoriteVids} label="Favorites" slug="favorites" />}
      {videos.map((track, i) => (
        <VideoTrack key={track.term_id} {...track} triggerLoadTags={i >= videos.length - 2} />
      ))}
      {tags && tags.map(track => <VideoTrack key={track.term_id} {...track} />)}
      <VideoModal />
      {width >= theme.sizes.break && <HoverStates hoverState={hoverState} />}
    </TrackContextProvider>
  );
};

export default Tracks;
