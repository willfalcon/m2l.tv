import { useEffect, useState } from 'react';
import round from './round';

export default function useSpinEffect(duration = 2, startImmediately = false) {
  const interval = duration * 100;
  const [angle, setAngle] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  useEffect(() => {
    if (startImmediately) {
      let heldAngle = angle;
      const newInterval = setInterval(() => {
        heldAngle += 0.1;
        setAngle(round(heldAngle));
      }, interval);
      setIntervalID(newInterval);
    }
    return () => {
      if (intervalID) {
        clearInterval(intervalID);
      }
    };
  }, [startImmediately]);

  const handlers = {
    onMouseEnter: () => {
      let heldAngle = angle;
      const newInterval = setInterval(() => {
        heldAngle += 0.1;
        setAngle(round(heldAngle));
      }, interval);
      setIntervalID(newInterval);
    },
    onMouseLeave: () => {
      clearInterval(intervalID);
    },
  };

  const spinStyle = {
    '--angle': `rotate(${angle}turn)`,
    '--duration': `${duration * 0.1}s`,
  };

  return [spinStyle, handlers];
}
