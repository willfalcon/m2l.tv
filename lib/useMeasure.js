import { useEffect, useRef, useState } from 'react';

export default function useMeasure() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  }, []);

  return [ref, size];
}
