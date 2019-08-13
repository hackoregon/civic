/** @jsx jsx */
import { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PropTypes } from "prop-types";
import { jsx, css } from "@emotion/core";

import { palette } from "../../constants/style";
import { getOrbTouched, setOrbTouched, setOrbComplete } from "../../state/orbs";
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
  durationRequired: 1000,
  pressTimeout: null,
  pressedStart: null,
  isActive: false,
  isComplete: false,
  isCorrect: false
};

class Orb extends PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentWillUnmount() {
    const { timeoutId } = this.state;
    if (timeoutId) window.clearTimeout(timeoutId);
  }

  handleOrbPress = () => {
    const { isActive, isComplete, timeoutId } = this.state;
    // if already pressed, do nothing
    if (isActive || isComplete) return;

    // start a timer. In n seconds, we check to see if we are complete
    // complete means isActive is true
    if (timeoutId) window.clearTimeout(timeoutId);

    const { durationRequired } = this.state;
    // set timer
    const newTimeoutId = setTimeout(() => {
      this.checkComplete();
    }, durationRequired);

    this.setState({
      isActive: true,
      pressedStart: new Date(),
      timeoutId: newTimeoutId
    });

    // callbacks
    const { id, setOrbTouchedInState } = this.props;
    setOrbTouchedInState(id, true);
  };

  handleOrbRelease = () => {
    this.setState({ isActive: false });
    const { id, setOrbTouchedInState } = this.props;
    setOrbTouchedInState(id, false);
  };

  checkComplete = () => {
    const { pressedStart, durationRequired, isActive } = this.state;
    const { onOrbSelection, model } = this.props;

    if (isActive && pressedStart) {
      const pressedDuration = new Date() - pressedStart;
      if (pressedDuration >= durationRequired) {
        const { id, setOrbCompleteInState } = this.props;
        // before final logic is added assume all orbs are bad
        // eslint-disable-next-line react/no-unused-state
        this.setState({ isComplete: true, isCorrect: false });

        setOrbCompleteInState(id, true);
        onOrbSelection(model);
      }
    }
  };

  render() {
    const { isActive, isComplete } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { id, size, isTouched, model } = this.props;

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
          <RadialGauge animateGauge={isActive || isComplete} size={size} />
        </div>
        <div
          css={css`
            ${circleDefaultStyle};
            ${sizeStyle};
          `}
          className={orbClass}
        >
          <img src={model.imageSVG} alt={model.imgAlt} css={iconStyle} />
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

Orb.propTypes = {
  id: PropTypes.number,
  setOrbTouchedInState: PropTypes.func,
  setOrbCompleteInState: PropTypes.func,
  isTouched: PropTypes.bool,
  onOrbSelection: PropTypes.func,
  model: PropTypes.shape({}),
  size: PropTypes.number
};

const mapStateToProps = (state, ownProps) => ({
  isTouched: getOrbTouched({ ...state, id: ownProps.id })
});

const mapDispatchToProps = dispatch => ({
  setOrbTouchedInState: bindActionCreators(setOrbTouched, dispatch),
  setOrbCompleteInState: bindActionCreators(setOrbComplete, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orb);
