import { useEffect, useRef, useState } from 'react';

export default function useOnEnter(callback) {
  const ref = useRef();
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(([entry]) => {
    setIntersecting(entry.isIntersecting);
  });

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setHasEntered(true);
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (hasEntered) {
      callback();
    }
  }, [hasEntered]);

  return ref;
}
