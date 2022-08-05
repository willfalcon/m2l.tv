import React from 'react';

import useOnEnter from '../../lib/useOnEnter';

const ScrollWatcher = ({ onEnter }) => {
  const ref = useOnEnter(onEnter);

  return <div ref={ref} className="scroll-watcher"></div>;
};

export default ScrollWatcher;
