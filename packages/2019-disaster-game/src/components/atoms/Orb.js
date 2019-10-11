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

export default class Orb extends PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.orbRef = React.createRef();
  }

  componentDidMount() {
    // If this is the first render
    const { hasAnimated } = this.state;
    const { orbModel } = this.props;
    const { delay } = orbModel;

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
    const { orbId } = orbModel;

    if (!prevState.isComplete && isComplete) {
      addOrbScore(orbId);
      setOrbComplete(orbModel);
    }
  }

  incrementGauge = () => {
    const timer = setTimeout(() => {
      const { isActive } = this.state;
      if (isActive) {
        this.setState({ isComplete: true });
        clearTimeout(timer);
      } else {
        this.setState({ isActive: false });
        clearTimeout(timer);
      }
    }, pressSuccessDuration * 1000);
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
    const { size, orbModel } = this.props;
    const { imageSVG, imgAlt, good } = orbModel;

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
    if (isComplete && !good) orbClass = "circle-bad-item-style";

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        ref={this.orbRef}
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
            isActive={isActive}
            size={size}
            duration={pressSuccessDuration}
          />
        </div>
        <div
          css={css`
            ${circleDefaultStyle};
            ${sizeStyle};
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
  orbModel: PropTypes.shape({
    orbId: PropTypes.string,
    imageSVG: PropTypes.string,
    imgAlt: PropTypes.string,
    delay: PropTypes.number
  }),
  setOrbTouched: PropTypes.func,
  setOrbComplete: PropTypes.func,
  addOrbScore: PropTypes.func,
  size: PropTypes.number
};
