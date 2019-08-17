/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const progressBarStyle = {
  pathColor: "gold",
  trailColor: "transparent",
  // Whether to use rounded or flat corners on the ends
  strokeLinecap: "butt",
  // How long animation takes to go from one percent to another, in seconds
  pathTransitionDuration: 0.5
};

const RadialGauge = ({ isActive, size, percent }) => {
  const gaugeDefaultStyle = css`
    transition: transform 1s;
    position: absolute;
    top: ${size / 2}px;
    left: ${size / 2}px;
    height: ${size}px;
    width: ${size}px;
    pointer-events: none;

    &.gauge-animate-style {
      transform: scale(1.5);
    }
  `;

  const gaugeSizeStyle = css`
    height: ${size}px;
    width: ${size}px;
    border-radius: ${size}px;
  `;

  return (
    <CircularProgressbar
      value={percent}
      strokeWidth={isActive ? 20 : 4}
      css={css`
        ${gaugeDefaultStyle}, ${gaugeSizeStyle}
      `}
      className={isActive ? "gauge-animate-style" : ""}
      styles={buildStyles(progressBarStyle)}
    />
  );
};

RadialGauge.propTypes = {
  isActive: PropTypes.bool,
  size: PropTypes.number,
  percent: PropTypes.number
};

export default RadialGauge;
