import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Animate } from "react-move";

const AnimatedProgressProvider = ({
  repeat,
  duration,
  valueStart = 0,
  valueEnd,
  easingFunction,
  makeAnimate,
  children
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

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
        value: valueStart
      })}
      update={() => ({
        value: [isAnimated ? valueEnd : valueStart],
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
  valueStart: PropTypes.number,
  valueEnd: PropTypes.number,
  easingFunction: PropTypes.func,
  makeAnimate: PropTypes.bool,
  children: PropTypes.node
};

export default AnimatedProgressProvider;
