import { useLayoutEffect, useCallback, useState } from "react";

const useBounds = ref => {
  const getRect = element => {
    if (!element) {
      return {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0
      };
    }

    return element.getBoundingClientRect();
  };

  const [rect, setRect] = useState(getRect(ref ? ref.current : null));

  const handleResize = useCallback(() => {
    if (!ref.current) {
      return;
    }

    // Update client rect
    setRect(getRect(ref.current));
  }, [ref]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    handleResize();

    if (typeof ResizeObserver === "function") {
      /* eslint-disable no-undef */
      let resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);

      /* eslint-disable consistent-return */
      return () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
          resizeObserver = null;
        }
      };
    }
    // Browser support, remove freely
    window.addEventListener("resize", handleResize);

    /* eslint-disable consistent-return */
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, ref]);

  return rect;
};

export default useBounds;
