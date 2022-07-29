import React, { useEffect, useRef } from 'react';
import useOnEnter from '../../lib/useOnEnter';
import useSiteContext from '../SiteContext';

const ScrollWatcher = ({ onEnter }) => {
  const ref = useOnEnter(onEnter);

  return <div ref={ref} className="scroll-watcher"></div>;
};

export default ScrollWatcher;
