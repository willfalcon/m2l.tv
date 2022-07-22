import React from 'react';
import PrimaryVideo from '../../components/PrimaryVideo';
import VideoTrack from '../../components/Track/VideoTrack';
import VideoModal from '../../components/VideoModal';

export default props => {
  const { allVideos, slug } = props;
  // console.log(allVideos);
  const video = allVideos
    .filter(cat => {
      return cat.videos.some(video => video.post_name === slug);
    })[0]
    .videos.find(video => video.post_name === slug);
  console.log(video);

  // return <></>;
  return <VideoModal {...video} isolate={true} />;
};

export async function getServerSideProps(context) {
  return {
    props: { ...context.query },
  };
}
