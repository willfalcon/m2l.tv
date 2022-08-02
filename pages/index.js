import React from 'react';

import dynamic from 'next/dynamic';

const Tracks = dynamic(() => import('../components/Tracks/Tracks'), {
  ssr: false,
});

const index = ({ topVideos, videoSlug }) => {
  return <Tracks topVideos={topVideos} videoSlug={videoSlug} />;
};

export default index;
