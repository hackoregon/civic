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
  pressTimeout: null,
  pressedStart: null,
  isActive: false,
  isComplete: false
};

class Orb extends PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentWillUnmount() {
    if (this.state.timeoutId) window.clearTimeout(this.state.timeoutId);
  }

  handleOrbPress = () => {
    // if already pressed, do nothing
    if (this.state.isActive || this.state.isComplete) return;

    // start a timer. In n seconds, we check to see if we are complete
    // complete means isActive is true
    if (this.state.timeoutId) window.clearTimeout(this.state.timeoutId);

    const { durationRequired } = this.state;
    // set timer
    const timeoutId = setTimeout(() => {
      this.checkComplete();
    }, durationRequired);

    this.setState({ isActive: true, pressedStart: new Date(), timeoutId });

    // callbacks
    const { id, onOrbTouch } = this.props;
    onOrbTouch(id);
  };

  handleOrbRelease = () => {
    this.setState({ isActive: false });
  };

  checkComplete = () => {
    const { pressedStart, durationRequired, isActive } = this.state;

    if (isActive && pressedStart) {
      const pressedDuration = new Date() - pressedStart;
      if (pressedDuration >= durationRequired) {
        const { id, onComplete } = this.props;
        this.setState({ isComplete: true });
        onComplete(id);
      }
    }
  };

  render() {
    const { isActive, isComplete } = this.state;
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
          <RadialGauge animateGauge={isActive || isComplete} size={size} />
        </div>
        <div
          css={css`
            ${circleDefaultStyle};
            ${sizeStyle};
          `}
          className={isActive ? "circle-press-style" : ""}
        />
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

export default Orb;
