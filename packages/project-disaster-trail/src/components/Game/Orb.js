/** @jsx jsx */
import { PureComponent } from "react";
import { PropTypes } from "prop-types";
import { jsx, css } from "@emotion/core";

import { palette } from "../../constants/style";
import RadialGauge from "./RadialGauge";

const orbContainerStyle = css`
  position: relative;
`;

const circleDefaultStyle = css`
  transition: transform 1s;
  z-index: 10;
  background-color: ${palette.gold};
  transition: background-color 1000ms linear;
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-items: center;

  &:hover {
    opacity: 1;
  }

  &.circle-press-style {
    background-color: ${palette.lightGreen};
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
    // What properties have changed?
    // useful for debugging
    // for (const i in prevProps) {
    //   if (this.props[i] !== prevProps[i]) {
    //     console.log(
    //       i,
    //       prevProps[i],
    //       this.props[i],
    //       this.props[i] === prevProps[i]
    //     );
    //   }
    // }

    const { isComplete } = this.state;
    const { addOrbScore, orbId, setOrbComplete } = this.props;

    if (!prevState.isComplete && isComplete) {
      addOrbScore(orbId);
      setOrbComplete(orbId);
    }
  }

  incrementGauge = () => {
    const timer = setInterval(() => {
      const { isActive, percent } = this.state;
      if (percent === 100) {
        this.setState({ isComplete: true });
        clearInterval(timer);
      } else if (percent < 100 && isActive) {
        const update = percent + 10;
        this.setState({ percent: update });
      } else if (percent < 100 && !isActive) {
        this.setState({ isActive: false, percent: 0 });
        clearInterval(timer);
      }
    }, 200);
  };

  handleOrbPress = () => {
    const { isComplete } = this.state;
    const { orbId, setOrbTouched } = this.props;
    // if already pressed, do nothing
    if (isComplete) return;

    this.setState({ isActive: true }, () => {
      this.incrementGauge();
    });
    setOrbTouched(orbId, true);
  };

  handleOrbRelease = () => {
    this.setState({ isActive: false });
    const { orbId, setOrbTouched } = this.props;
    setOrbTouched(orbId, false);
  };

  render() {
    const { isActive, isComplete, percent } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { size, imageSVG, imgAlt } = this.props;

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
          <img src={imageSVG} alt={imgAlt} css={iconStyle} />
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

Orb.propTypes = {
  orbId: PropTypes.string,
  setOrbTouched: PropTypes.func,
  setOrbComplete: PropTypes.func,
  addOrbScore: PropTypes.func,
  imageSVG: PropTypes.string,
  imgAlt: PropTypes.string,
  size: PropTypes.number
};
