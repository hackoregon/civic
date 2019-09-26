import { useRef, useEffect, useLayoutEffect, useCallback } from "react";

const useAnimationFrame = callback => {
  const callbackRef = useRef(callback);
  const frameRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = useCallback(() => {
    frameRef.current = window.requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  }, []);

  useLayoutEffect(() => {
    frameRef.current = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frameRef.current);
  }, [loop]);
};

export default useAnimationFrame;
