import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function useMeasure() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const ref = useRef();

  function handleResize() {
    if (ref.current) {
      setSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    if (ref.current) {
      handleResize();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [ref.current]);
  console.log(size);
  return [ref, size, handleResize];
}
