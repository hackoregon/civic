/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { jsx, css } from "@emotion/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const progressBarStyle = {
  pathColor: "gold",
  trailColor: "transparent",
  // Whether to use rounded or flat corners on the ends
  strokeLinecap: "butt",
  // How long animation takes to go from one percent to another, in seconds
  pathTransitionDuration: 1
};

class RadialGauge extends Component {
  state = {
    percent: 0
  };

  componentDidUpdate(prevProps) {
    const { animateGauge } = this.props;
    if (prevProps.animateGauge !== animateGauge) {
      if (animateGauge) {
        this.setPercent(100);
      } else {
        this.setPercent(0);
      }
    }
  }

  setPercent = percent => {
    this.setState({ percent });
  };

  render() {
    const { animateGauge, size } = this.props;
    const { percent } = this.state;

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
        strokeWidth={animateGauge ? 20 : 4}
        css={css`
          ${gaugeDefaultStyle}, ${gaugeSizeStyle}
        `}
        className={animateGauge ? "gauge-animate-style" : ""}
        styles={buildStyles(progressBarStyle)}
      />
    );
  }
}

RadialGauge.propTypes = {
  animateGauge: PropTypes.bool,
  size: PropTypes.number
};

export default RadialGauge;
