/** @jsx jsx */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { palette } from "../../constants/style";
import usePrevious from "../../state/hooks/usePrevious";

const RadialGauge = ({
  isActive,
  size,
  duration,
  isMultiTouchType,
  multiTouchMultiplier,
}) => {
  const [percent, setPercent] = useState(0);
  const prevIsActive = usePrevious(isActive);
  const prevIsMultiTouchType = usePrevious(isMultiTouchType);

  const progressBarStyle = {
    pathColor: palette.turqoise,
    trailColor: "transparent",
    // Whether to use rounded or flat corners on the ends
    strokeLinecap: "butt",
    // How long animation takes to go from one percent to another, in seconds
    pathTransitionDuration: duration
  };

  /*
    Start the dial by setting it to 100%. If the type is the matchlock type,
    first set it to the same percentage as the other matchlock items.
  */
  useEffect(() => {
    if (prevIsActive !== isActive) {
      if (isActive) {
        setPercent(100);
      } else {
        setPercent(0);
      }
    }
  }, [prevIsActive, isActive, isMultiTouchType, duration, prevIsMultiTouchType]);

  const gaugeDefaultStyle = css`
    transition: transform 1s;
    position: absolute;
    top: ${size / 2}px;
    left: ${size / 2}px;
    pointer-events: none;
    height: ${size}px;
    width: ${size}px;
    border-radius: ${size}px;

    &.gauge-animate-style {
      transform: scale(1.5);
    }
  `;

  const multiTouchScale = css`
    height: ${size * multiTouchMultiplier}px;
    width: ${size * multiTouchMultiplier}px;
    border-radius: ${size * multiTouchMultiplier}px;
  `;

  return (
    <CircularProgressbar
      value={percent}
      strokeWidth={isActive ? 20 : 4}
      css={css`
        ${gaugeDefaultStyle};
        ${isMultiTouchType && multiTouchScale}
      `}
      className={isActive ? "gauge-animate-style" : ""}
      styles={buildStyles(progressBarStyle)}
    />
  );
};

RadialGauge.propTypes = {
  isActive: PropTypes.bool,
  size: PropTypes.number,
  duration: PropTypes.number,
  isMultiTouchType: PropTypes.bool,
  multiTouchMultiplier: PropTypes.number,
};

export default RadialGauge;
