import React, { useEffect } from 'react';
import { useVideo } from 'react-use';

const Video = ({ setControls, setRef, isolate, setFinished }) => {
  const { width, height, videopress } = isolate?.video;

  const [videoHTML, state, controls, ref] = useVideo(
    <video className="single-video__video" width={width} height={height} controls poster={videopress.poster}>
      <source src={videopress.original} type="video/mp4" />
    </video>
  );

  useEffect(() => {
    setFinished(state.duration && state.paused && state.time >= state.duration - 5);
  }, [state.playing, isolate]);

  useEffect(() => {
    setRef(ref);
    setControls(controls);
  }, []);

  return videoHTML;
};
export default Video;
