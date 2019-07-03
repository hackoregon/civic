/** @jsx jsx */
import { Component } from "react";
import { jsx, css } from "@emotion/core";
import RadialGauge from "./RadialGauge";

const orbContainerStyle = css`
  position: relative;
`;

const circleDefaultStyle = css`
  transition: transform 1s;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  background-color: mediumSeaGreen;
  transition: background-color 1000ms linear;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  &.circle-press-style {
    background-color: mediumAquamarine;
    transition: background-color 1000ms linear;
  }
`;

const defaultState = {
  durationRequired: 1000,
  orbSize: 60,
  animationState: null,
  pressTimeout: null,
  pressedStart: null,
  animationFrame: null
};

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
    // eslint-disable-next-line no-unused-vars
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
    const { animationState, orbSize } = this.state;

    const circleSizeStyle = css`
      height: ${orbSize}px;
      width: ${orbSize}px;
      border-radius: ${orbSize}px;
    `;

    const orbSizeStyle = css`
      height: ${orbSize + 20}px;
      width: ${orbSize + 20}px;
      border-radius: ${orbSize + 20}px;
    `;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        css={css`
          ${orbContainerStyle};
          ${orbSizeStyle}
        `}
        onMouseDown={this.handleOrbPress}
        onMouseUp={this.handleOrbRelease}
        onMouseLeave={this.handleOrbRelease}
        onTouchStart={this.handleOrbPress}
        onTouchEnd={this.handleOrbRelease}
      >
        <RadialGauge
          animateGauge={animationState === "pressing"}
          orbSize={orbSize}
        />
        <div
          css={css`
            ${circleDefaultStyle};
            ${circleSizeStyle}
          `}
          className={animationState ? "circle-press-style" : ""}
        />
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

export default Orb;
