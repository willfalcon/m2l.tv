import React, { useEffect, useState } from 'react';
import PrimaryVideo from '../components/PrimaryVideo';
import useSiteContext from '../components/SiteContext';
import VideoModal from '../components/VideoModal';
import VideoTrack from '../components/VideoTrack';
import shuffle from '../lib/shuffle';

const index = ({ videos, allVideos, other }) => {
  const { isolate, setIsolate } = useSiteContext();

  return (
    <>
      <PrimaryVideo {...videos[0]} />
      <VideoTrack videos={videos.slice(1)} label="Top Videos" setIsolate={setIsolate} />
      {allVideos.map(track => (
        <VideoTrack key={track.term_id} {...track} setIsolate={setIsolate} />
      ))}
      <VideoModal isolate={!!isolate} {...isolate} onClose={() => setIsolate(null)} />
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_BASE}/wp-json/m2l-video/v1/top-videos/all`);
  const top = await res.json();

  const allVideosRes = await fetch(`${process.env.API_BASE}/wp-json/m2l-video/v1/videos`);
  const data = await allVideosRes.json();

  return {
    props: { videos: shuffle(top), allVideos: data.allVideos, other: data.other },
  };
}

export default index;
