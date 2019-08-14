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

  gaugeIncrement = () => {
    const gaugeTimer = window.setInterval(() => {
      const currentPercent = this.state.percent;
      if (currentPercent !== 100) {
        const update = currentPercent + 15;
        this.setPercent(update);
      } else {
        window.clearInterval(gaugeTimer);
        this.props.isComplete();
      }
    }, 300);
  };

  componentDidUpdate(prevProps, prevState) {
    const { animateGauge } = this.props;
    if (prevProps.animateGauge !== animateGauge) {
      this.gaugeIncrement();
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
  isComplete: PropTypes.func,
  size: PropTypes.number
};

export default RadialGauge;
