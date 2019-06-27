/** @jsx jsx */
import { Component } from "react";
import { jsx, css } from "@emotion/core";

const orbContainerStyle = css`
  height: 80px;
  width: 80px;
  border-radius: 80px;
`;

const circleDefaultStyle = css`
  height: 100%;
  width: 100%;
  border-radius: 80px;
  background-color: blue;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const circlePressStyle = css`
  background-color: #000;
  -webkit-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear;
  transition: background-color 1000ms linear;
`;

const defaultState = {
  durationRequired: 1000,
  animationState: null,
  pressTimeout: null,
  pressedStart: null,
  animationFrame: null
};

// Note: onTouchStart and onTouchEnd are not tested
class Orb extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleOrbPress = () => {
    this.doPressAnimation();
  };

  handleOrbRelease = () => {
    const { pressedStart, durationRequired } = this.state;

    if (pressedStart) {
      const pressedDuration = new Date() - pressedStart;
      if (pressedDuration >= durationRequired) {
        this.doFullDurationAnimation();
      }
    }

    this.refreshOrbState();
  };

  refreshOrbState = () => {
    const { animationFrame, pressTimeout } = this.state;
    // We can use any default null value for the press animation here
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
      clearTimeout(pressTimeout);
      /* We keep setState() in a conditional in case of a mouseLeave when the orb had not been pressed to avoid unnecessary setState() calls */
      this.setState(() => defaultState);
    }
  };

  doPressAnimation = () => {
    const { animationState, durationRequired } = this.state;
    const newAnimationFrame = window.requestAnimationFrame(() => {
      console.log("Do press animation");
    });
    const pressTimeout = setTimeout(this.handleOrbRelease, durationRequired);

    this.setState(() => ({
      animationState: "pressing",
      pressedStart: new Date(),
      animationFrame: newAnimationFrame,
      pressTimeout
    }));
  };

  doFullDurationAnimation = () => {
    console.log("Do full duration animation");
  };

  render() {
    const { animationState } = this.state;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        css={css`
          ${orbContainerStyle}
        `}
      >
        <div
          onMouseDown={this.handleOrbPress}
          onMouseUp={this.handleOrbRelease}
          onMouseLeave={this.handleOrbRelease}
          onTouchStart={this.handleOrbPress}
          onTouchEnd={this.handleOrbRelease}
          css={css`
            ${circleDefaultStyle};
            ${animationState === "pressing" && circlePressStyle}
          `}
        />
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

export default Orb;
