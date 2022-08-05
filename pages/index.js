import React from 'react';

import dynamic from 'next/dynamic';

const Tracks = dynamic(() => import('../components/Track/Tracks'), {
  ssr: false,
});

const index = ({ topVideos }) => {
  return <Tracks topVideos={topVideos} />;
};

export default index;
