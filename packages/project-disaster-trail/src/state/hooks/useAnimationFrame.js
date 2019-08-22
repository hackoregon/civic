import { useRef, useEffect, useLayoutEffect } from "react";

const useAnimationFrame = callback => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  const loop = () => {
    frameRef.current = window.requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  };
  const frameRef = useRef();
  useLayoutEffect(() => {
    frameRef.current = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frameRef.current);
  }, []);
};

export default useAnimationFrame;
