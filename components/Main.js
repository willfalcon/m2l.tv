import React from 'react';

import PrimaryVideo from './PrimaryVideo';
import VideoModal from './VideoModal/VideoModal';

const Main = ({ topVideos }) => {
  return (
    <>
      <PrimaryVideo {...topVideos[0]} />
      <VideoModal />
    </>
  );
};

export default Main;
