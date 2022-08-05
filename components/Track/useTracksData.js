import { useEffect, useState } from 'react';
import useSiteContext from '../SiteContext';

export default function useTracksData() {
  const [videos, setVideos] = useState([]);
  const [favoriteVids, setFavoriteVids] = useState([]);

  const { favorites } = useSiteContext();

  useEffect(() => {
    async function getVideos() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v2/all-videos`);
      const data = await res.json();

      setVideos(data);
    }
    getVideos();
  }, []);

  const [favsReady, setFavsReady] = useState(false);

  useEffect(() => {
    if (!!favorites.length && videos.length) {
      const favoriteVids = favorites.map(fav =>
        videos.filter(cat => cat.videos.some(video => video.id === fav))[0]?.videos?.find(video => video.id === fav)
      );
      setFavoriteVids(favoriteVids);
      setFavsReady(true);
    } else {
      setFavsReady(true);
    }
  }, [videos, favorites]);

  return { videos, favoriteVids, favsReady };
}
