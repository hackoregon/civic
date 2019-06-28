/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { jsx, css } from "@emotion/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const gaugeDefaultStyle = css`
  transition: transform 1s;
  position: absolute;
  top: 10px;
  left: 10px;
  height: 60px;
  width: 60px;

  &.gauge-animate-style {
    transform: scale(1.5);
  }
`;

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
    this.setState(() => ({
      percent
    }));
  };

  render() {
    const { animateGauge } = this.props;
    const { percent } = this.state;

    return (
      <CircularProgressbar
        value={percent}
        strokeWidth={animateGauge ? 20 : 4}
        css={gaugeDefaultStyle}
        className={animateGauge ? "gauge-animate-style" : ""}
        styles={buildStyles({
          pathColor: "gold",
          trailColor: "transparent",
          // Whether to use rounded or flat corners on the ends
          strokeLinecap: "butt",
          // How long animation takes to go from one percent to another, in seconds
          pathTransitionDuration: 1
        })}
      />
    );
  }
}

RadialGauge.propTypes = {
  animateGauge: PropTypes.bool
};

export default RadialGauge;
