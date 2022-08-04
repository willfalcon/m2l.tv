import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useMeasure, useVideo } from 'react-use';

import CountdownTimer from './CountdownTimer';

const Video = ({ className, setControls, setRef, isolate }) => {
  const { width, height, videopress } = isolate?.video;

  const [videoHTML, state, controls, ref] = useVideo(
    <video className={classNames('video', className)} width={width} height={height} controls poster={videopress.poster}>
      <source src={videopress.original} type="video/mp4" />
    </video>
  );

  return (
    <>
      {videoHTML}
      <CountdownTimer controls={controls} videoRef={ref} name={isolate?.post_title} />
    </>
  );
};

export default Video;
