import React, { useEffect, useState } from 'react';
import PrimaryVideo from '../components/PrimaryVideo';
import VideoTrack from '../components/VideoTrack';
import shuffle from '../lib/shuffle';

const index = ({ videos }) => {
  return (
    <>
      <PrimaryVideo {...videos[0]} />
      <VideoTrack videos={videos.slice(1)} label="Top Videos" />
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://movetolearnms.local/wp-json/m2l-video/v1/top-videos/all`);
  const data = await res.json();

  return {
    props: { videos: shuffle(data) },
  };
}

export default index;
