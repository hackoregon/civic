import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { TweenMax, Power2 } from "gsap/TweenMax";

import RadialGauge from "./RadialGauge";

const orbContainerStyle = css`
  position: relative;
  opacity: 0;
`;

const circleDefaultStyle = css`
  z-index: 10;
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-items: center;

  &:hover {
    opacity: 1;
  }

  &.circle-press-style {
    transition: background-color 1000ms linear;
  }

  &.circle-bad-item-style {
    transition: filter 0.5s ease-in-out;
    filter: grayscale(100%);
  }
`;

const iconStyle = css`
  position: relative;
  transition: width 0.5s, height 0.5s;
`;

const defaultState = {
  pressTimeout: null,
  pressedStart: null,
  isActive: false,
  isComplete: false,
  isCorrect: false,
  hasAnimated: false
};

const pressSuccessDuration = 1;
const multiTouchMultiplier = 1.5;

export default class Orb extends PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.orbRef = React.createRef();
    this.timer = null;
  }

  componentDidMount() {
    // If this is the first render
    const { hasAnimated } = this.state;
    const { delay } = this.props;

    if (!hasAnimated) {
      // make the component 0 alpha, smaller, and slightly lower on the screen
      // and animate it to full opacity, regular size, and to it's correct coordinates
      TweenMax.fromTo(
        this.orbRef.current,
        1,
        { autoAlpha: 0, y: 25, scale: 0 },
        { autoAlpha: 1, ease: Power2.easeOut, delay, y: 0, scale: 1 }
      );
      // eslint-disable-next-line no-did-update-set-state
      this.setState({ hasAnimated: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isComplete } = this.state;
    const { addOrbScore, orbModel, setOrbComplete } = this.props;

    if (!prevState.isComplete && isComplete) {
      this.handleOrbRelease();
      addOrbScore(orbModel.orbId);
      setOrbComplete(orbModel.orbId);
    }
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearTimeout(timer);
  }

  incrementGauge = () => {
    const { timer } = this.state;
    const gaugeTimer = setTimeout(() => {
      const { isActive } = this.state;
      if (isActive) {
        this.setState({ isComplete: true });
        clearTimeout(timer);
      } else {
        this.setState({ isActive: false });
        clearTimeout(timer);
      }
    }, pressSuccessDuration * 1000);
    this.setState({ timer: gaugeTimer });
  };

  handleOrbPress = () => {
    const { isComplete } = this.state;
    const { orbModel, setOrbTouched } = this.props;
    // if already pressed, do nothing
    if (isComplete) return;

    this.setState({ isActive: true }, () => {
      this.incrementGauge();
    });
    setOrbTouched(orbModel, true);
  };

  handleOrbRelease = () => {
    this.setState({ isActive: false });
    const { orbModel, setOrbTouched } = this.props;
    setOrbTouched(orbModel, false);
  };

  render() {
    const { isActive, isComplete } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { size, imageSVG, imgAlt, isMultiTouchType } = this.props;

    const sizeStyle = css`
      height: ${size}px;
      width: ${size}px;
      border-radius: ${size}px;
      transition: width 0.5s, height 0.5s;
    `;

    const absoluteStyle = css`
      position: absolute;
      top: -${size / 2}px;
      left: -${size / 2}px;
    `;

    const multiTouchScale = css`
      height: ${size * multiTouchMultiplier}px;
      width: ${size * multiTouchMultiplier}px;
      border-radius: ${size * multiTouchMultiplier}px;
      top: -${size / 4}px;
      left: -${size / 4}px;
    `;

    let orbClass = "";
    if (isActive) orbClass = "circle-press-style";
    if (isComplete) orbClass = "circle-bad-item-style";

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        ref={this.orbRef}
        css={css`
          ${orbContainerStyle};
          ${sizeStyle};
          ${isMultiTouchType && multiTouchScale};
        `}
        onMouseDown={this.handleOrbPress}
        onMouseUp={this.handleOrbRelease}
        onMouseLeave={this.handleOrbRelease}
        onTouchStart={this.handleOrbPress}
        onTouchEnd={this.handleOrbRelease}
      >
        <div css={absoluteStyle}>
          <RadialGauge
            isActive={isActive}
            size={size}
            duration={pressSuccessDuration}
            scaleForMultiTouch={isMultiTouchType}
            multiTouchMultiplier={multiTouchMultiplier}
          />
        </div>
        <div
          css={css`
            ${circleDefaultStyle};
            ${sizeStyle};
            ${isMultiTouchType && multiTouchScale};
          `}
          className={orbClass}
        >
          <img src={imageSVG} alt={imgAlt} css={iconStyle} />
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

Orb.propTypes = {
  orbModel: PropTypes.shape({}),
  setOrbTouched: PropTypes.func,
  setOrbComplete: PropTypes.func,
  addOrbScore: PropTypes.func,
  imageSVG: PropTypes.string,
  imgAlt: PropTypes.string,
  size: PropTypes.number,
  delay: PropTypes.number,
  isMultiTouchType: PropTypes.bool
};
