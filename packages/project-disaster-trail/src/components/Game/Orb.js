/** @jsx jsx */
import { PureComponent } from "react";
import { jsx, css } from "@emotion/core";
import RadialGauge from "./RadialGauge";

const orbContainerStyle = css`
  position: relative;
`;

const circleDefaultStyle = css`
  transition: transform 1s;
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
  animationState: null,
  pressTimeout: null,
  pressedStart: null,
  animationFrame: null
};

class Orb extends PureComponent {
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
      this.setState(defaultState);
    }
  };

  doPressAnimation = () => {
    // eslint-disable-next-line no-unused-vars
    const { durationRequired } = this.state;
    const newAnimationFrame = window.requestAnimationFrame(() => {
      console.log("Do press animation");
    });
    const pressTimeout = setTimeout(this.handleOrbRelease, durationRequired);

    this.setState({
      animationState: "pressing",
      pressedStart: new Date(),
      animationFrame: newAnimationFrame,
      pressTimeout
    });
  };

  doFullDurationAnimation = () => {
    console.log("Do full duration animation");
  };

  render() {
    const { animationState } = this.state;
    const { size } = this.props;

    const sizeStyle = css`
      height: ${size}px;
      width: ${size}px;
      border-radius: ${size}px;
    `;

    const absoluteStyle = css`
      position: absolute;
      top: -${size / 2}px;
      left: -${size / 2}px;
    `;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        css={css`
          ${orbContainerStyle};
          ${sizeStyle};
        `}
        onMouseDown={this.handleOrbPress}
        onMouseUp={this.handleOrbRelease}
        onMouseLeave={this.handleOrbRelease}
        onTouchStart={this.handleOrbPress}
        onTouchEnd={this.handleOrbRelease}
      >
        <div css={absoluteStyle}>
          <RadialGauge
            animateGauge={animationState === "pressing"}
            size={size}
          />
        </div>
        <div
          css={css`
            ${circleDefaultStyle};
            ${sizeStyle};
          `}
          className={animationState ? "circle-press-style" : ""}
        />
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

export default Orb;
