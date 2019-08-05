/** @jsx jsx */
import { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { jsx, css } from "@emotion/core";
import RadialGauge from "./RadialGauge";

import { addPoints } from "../../state/user";
import { getOrbTouched, setOrbTouched, setOrbComplete } from "../../state/orbs";

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

  &.circle-bad-item-style {
    transition: filter 0.5s ease-in-out;
    filter: grayscale(100%);
  }
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
    const { id, setOrbTouched } = this.props;
    setOrbTouched(id, true);
  };

  handleOrbRelease = () => {
    this.setState({ isActive: false });
    const { id, setOrbTouched } = this.props;
    setOrbTouched(id, false);
  };

  checkComplete = () => {
    const { pressedStart, durationRequired, isActive } = this.state;

    if (isActive && pressedStart) {
      const pressedDuration = new Date() - pressedStart;
      if (pressedDuration >= durationRequired) {
        const { id, setOrbComplete, addPoints } = this.props;
        // before final logic is added assume all orbs are bad
        // eslint-disable-next-line react/no-unused-state
        this.setState({ isComplete: true, isCorrect: false });

        setOrbComplete(id, true);

        addPoints(1);
      }
    }
  };

  render() {
    const { isActive, isComplete } = this.state;
    const { id, size, isTouched } = this.props;

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
          {/* debug */}
          {/* <p>
            {isTouched ? "touching" : "not touching"}-{id}
          </p> */}
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

const mapStateToProps = (state, ownProps) => ({
  isTouched: getOrbTouched({ ...state, id: ownProps.id })
});

const mapDispatchToProps = dispatch => ({
  addPoints: bindActionCreators(addPoints, dispatch),
  setOrbTouched: bindActionCreators(setOrbTouched, dispatch),
  setOrbComplete: bindActionCreators(setOrbComplete, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orb);
