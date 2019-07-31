/** @jsx jsx */
import { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";

import { completeTask, getActiveTaskData } from "../../../state/tasks";
import { XL } from "../../../constants/screens";
import DurationBar from "../DurationBar";

const defaultState = {
  taskTimer: null
};

class SolveScreen extends Component {
  state = defaultState;

  componentDidMount() {
    const { activeTask } = this.props;

    this.setState({
      taskTimer: setTimeout(this.finishTask, activeTask.time)
    });
  }

  componentWillUnmount() {
    this.clearTaskTimeout();
  }

  clearTaskTimeout = () => {
    const { taskTimer } = this.state;
    clearTimeout(taskTimer);
  };

  finishTask = () => {
    const { completeActiveTask, activeTask } = this.props;
    completeActiveTask(activeTask.id);
  };

  render() {
    const { completeActiveTask, interfaceHeight, activeTask } = this.props;
    const screenLayout = css`
      position: relative;
      display: grid;
      overflow: hidden;
      width: 100%;
      height: 100%;
      grid-template-rows: 1fr 40px ${interfaceHeight}px;
      grid-template-columns: 1fr;
      background: beige;
    `;

    const GUIStyle = css`
      background: pink;
      height: ${interfaceHeight}px;

      @media (min-height: ${XL.height}px) {
        height: ${interfaceHeight}px;
      }
    `;

    const taskDuration = activeTask.time;

    return (
      <div css={screenLayout}>
        <div>
          <h2>{activeTask.text}</h2>
          <button
            type="button"
            onClick={() => {
              completeActiveTask(activeTask.id);
            }}
          >
            Use {activeTask.requiredItems[0]}
          </button>
        </div>

        <DurationBar
          step="Choose a task"
          durationLength={taskDuration / 1000}
        />
        <div css={GUIStyle} />
      </div>
    );
  }
}

SolveScreen.propTypes = {
  completeActiveTask: PropTypes.func,
  interfaceHeight: PropTypes.number,
  activeTask: PropTypes.shape({})
};

const mapStateToProps = state => ({
  interfaceHeight: state.settings.screen.interfaceHeight,
  activeTask: getActiveTaskData(state)
});

const mapDispatchToProps = dispatch => ({
  completeActiveTask(taskChoice, taskId) {
    dispatch(completeTask(taskChoice, taskId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolveScreen);
