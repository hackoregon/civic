/** @jsx jsx */
import { PureComponent } from "react";
import { PropTypes } from "prop-types";

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
  display: grid;
  align-items: center;
  justify-items: center;

  &:hover {
    opacity: 1;
  }

  &.circle-press-style {
    background-color: mediumAquamarine;
    transition: background-color 1000ms linear;
  }

  &.circle-bad-item-style {
    transition: filter 0.5s ease-in-out;
    filter: grayscale(100%);
  }
`;

const iconStyle = css`
  position: relative;
  width: 75%;
  height: 75%;
`;

const defaultState = {
  pressTimeout: null,
  pressedStart: null,
  isActive: false,
  isComplete: false,
  isCorrect: false,
  percent: 0
};

export default class Orb extends PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidUpdate(prevProps, prevState) {
    const { isComplete } = this.state;
    const { addOrbScore, orb, setOrbComplete } = this.props;

    if (!prevState.isComplete && isComplete) {
      addOrbScore(orb);
      setOrbComplete(orb);
    }
  }

  incrementGauge = percent => {
    return new Promise(resolve => {
      setTimeout(() => {
        const { isActive } = this.state;

        if (percent === 100) {
          this.setState({ isComplete: true }, resolve);
        } else if (percent < 100 && isActive) {
          const update = percent + 10;
          this.setState({ percent: update }, () => this.incrementGauge(update));
        } else if (percent < 100 && !isActive) {
          this.setState({ isActive: false, percent: 0 }, resolve);
        }
      }, 200);
    });
  };

  handleOrbPress = () => {
    const { isComplete, percent } = this.state;
    const { orb, setOrbTouched } = this.props;
    // if already pressed, do nothing
    if (isComplete) return;

    this.setState({ isActive: true }, () => {
      this.incrementGauge(percent);
    });
    setOrbTouched(orb, true);
  };

  handleOrbRelease = () => {
    this.setState({ isActive: false });
    const { orb, setOrbTouched } = this.props;
    setOrbTouched(orb, false);
  };

  render() {
    const { isActive, isComplete, percent } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { size, orb } = this.props;

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

    let orbClass = "";
    if (isActive) orbClass = "circle-press-style";
    if (isComplete) orbClass = "circle-bad-item-style";

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
          <RadialGauge percent={percent} isActive={isActive} size={size} />
        </div>
        <div
          css={css`
            ${circleDefaultStyle};
            ${sizeStyle};
            ${sizeStyle};
          `}
          className={orbClass}
        >
          <img src={orb.imageSVG} alt={orb.imgAlt} css={iconStyle} />
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

Orb.propTypes = {
  setOrbTouched: PropTypes.func,
  setOrbComplete: PropTypes.func,
  addOrbScore: PropTypes.func,
  orb: PropTypes.shape({}),
  size: PropTypes.number
};
