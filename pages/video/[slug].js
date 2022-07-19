import React from 'react';
import PrimaryVideo from '../../components/PrimaryVideo';
import VideoTrack from '../../components/VideoTrack';

const video = props => {
  return (
    <>
      <PrimaryVideo {...props} />
      <VideoTrack videos={props.related} label={props.m2l_cat?.name} description={props.m2l_cat?.description} />
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_BASE}/wp-json/m2l-video/v1/video-paths`);
  const paths = await res.json();

  return {
    paths: paths.map(path => ({
      params: { slug: path.slug, id: path.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.API_BASE}/wp-json/m2l-video/v1/video?slug=${context.params.slug}`);
  const video = await res.json();

  return {
    props: video,
  };
}

export default video;
