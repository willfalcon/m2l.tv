import React, { useEffect, useState } from 'react';

import VideoTrack from './VideoTrack';
import HoverStates from '../TrackSlide/HoverStates';
import { TrackContextProvider } from './TrackContext';

import useTracksData from './useTracksData';
import useViewportSizes from '../../lib/useViewportSizes';
import theme from '../theme';
import useSiteContext from '../SiteContext';

const Tracks = ({ topVideos }) => {
  const [width, height, update] = useViewportSizes();

  useEffect(() => {
    update();
  }, []);

  const { videos, favoriteVids, favsReady } = useTracksData();
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
    <TrackContextProvider data={{ hoverState, setHoverState, viewportSizes: { width, height }, allReady }}>
      <VideoTrack videos={topVideos.slice(1)} label="Top Videos" slug="top-videos" />
      {!!favoriteVids.length && <VideoTrack videos={favoriteVids} label="Favorites" slug="favorites" />}
      {videos.map((track, i) => (
        <VideoTrack key={track.term_id} {...track} triggerLoadTags={i >= videos.length - 2} />
      ))}
      {tags && tags.map(track => <VideoTrack key={track.term_id} {...track} />)}

      {width >= theme.sizes.break && <HoverStates />}
    </TrackContextProvider>
  );
};

export default Tracks;
