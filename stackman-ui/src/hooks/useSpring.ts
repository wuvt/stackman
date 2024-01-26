import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import { Spring } from 'wobble';

const useSpring = (
  value: boolean,
  mass: number,
  stiffness: number,
  damping: number,
  callback: (s: Spring) => void,
) => {
  const springRef = useRef<Spring>(new Spring({ fromValue: value ? 1 : 0 }));

  useLayoutEffect(() => {
    callback(springRef.current);
    springRef.current.onUpdate(callback);

    return () => springRef.current.removeAllListeners();
  }, [callback]);

  useEffect(() => {
    springRef.current.updateConfig({ toValue: value ? 1 : 0 }).start();
  }, [value]);

  useEffect(() => {
    springRef.current.updateConfig({ mass, stiffness, damping });
  }, [mass, stiffness, damping]);
};

export default useSpring;
