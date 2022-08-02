import React from 'react';

import PrimaryVideo from './PrimaryVideo';

const Main = ({ topVideos }) => {
  return <PrimaryVideo {...topVideos[0]} />;
};

export default Main;
