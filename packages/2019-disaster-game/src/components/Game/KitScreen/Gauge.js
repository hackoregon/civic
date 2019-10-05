import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PropTypes from "prop-types";
import { palette } from "../../../constants/style";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

/* eslint-disable */
const easeQuadInOut = t => ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;

const overshoot = 2.5;
const backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);
/* eslint-enable */

const Gauge = ({ duration, repeat, makeAnimate, halfFill }) => {
  return (
    <AnimatedProgressProvider
      duration={duration}
      easingFunction={halfFill ? backOut : easeQuadInOut}
      repeat={repeat}
      makeAnimate={makeAnimate}
      halfFill={halfFill}
    >
      {value => {
        return (
          <CircularProgressbar
            value={value}
            strokeWidth={20}
            /* This is important to include, because if you're fully managing the
            animation yourself, you'll want to disable the CSS animation. */
            styles={buildStyles({
              pathTransition: "none",
              fillOpacity: 1,
              pathColor: palette.lightBlue,
              trailColor: palette.blue,
              // Whether to use rounded or flat corners on the ends
              strokeLinecap: "butt"
            })}
          />
        );
      }}
    </AnimatedProgressProvider>
  );
};

Gauge.propTypes = {
  duration: PropTypes.number,
  repeat: PropTypes.bool,
  makeAnimate: PropTypes.bool,
  halfFill: PropTypes.bool
};

export default Gauge;
