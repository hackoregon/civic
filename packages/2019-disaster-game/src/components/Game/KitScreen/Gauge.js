import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PropTypes from "prop-types";
import { palette } from "../../../constants/style";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

/* eslint-disable */
const easeQuadInOut = t => ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
/* eslint-enable */

const Gauge = ({ valueStart, valueEnd, duration, repeat, makeAnimate }) => {
  return (
    <AnimatedProgressProvider
      valueStart={valueStart}
      valueEnd={valueEnd}
      duration={duration}
      easingFunction={easeQuadInOut}
      repeat={repeat}
      makeAnimate={makeAnimate}
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
  valueStart: PropTypes.number,
  valueEnd: PropTypes.number,
  duration: PropTypes.number,
  repeat: PropTypes.bool,
  makeAnimate: PropTypes.bool
};

export default Gauge;
