import { useEffect, useState } from 'react';

function useViewportSizes() {
  const [size, setSize] = useState({ width: undefined, height: undefined });
  function handleResize() {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return [size.width, size.height, handleResize];
}

export default useViewportSizes;
