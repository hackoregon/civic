import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Animate } from "react-move";

const AnimatedProgressProvider = ({
  repeat,
  duration,
  easingFunction,
  makeAnimate,
  halfFill,
  children
}) => {
  const [isAnimated, setIsAnimated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [modifiedValueEnd, setModifiedValueEnd] = useState(halfFill ? 50 : 100);

  useEffect(() => {
    let interval = null;
    if (repeat) {
      interval = window.setInterval(() => {
        setIsAnimated(prevIsAnimated => !prevIsAnimated);
      }, duration * 1000);
    } else if (makeAnimate === true) {
      setIsAnimated(prevIsAnimated => !prevIsAnimated);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [repeat, duration, makeAnimate]);

  return (
    <Animate
      start={() => ({
        value: 0
      })}
      update={() => ({
        value: [isAnimated ? modifiedValueEnd : 0],
        timing: {
          duration: duration * 1000,
          ease: easingFunction
        }
      })}
    >
      {({ value }) => children(value)}
    </Animate>
  );
};

AnimatedProgressProvider.propTypes = {
  repeat: PropTypes.bool,
  duration: PropTypes.number,
  easingFunction: PropTypes.func,
  makeAnimate: PropTypes.bool,
  halfFill: PropTypes.bool,
  children: PropTypes.func
};

export default AnimatedProgressProvider;
