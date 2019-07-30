/** @jsx jsx */
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";

import { doNextTask } from "../../../state/tasks";
import { XL } from "../../../constants/screens";
import DurationBar from "../DurationBar";

const SolveScreen = ({ currentTask, completeTask, interfaceHeight }) => {
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

  const taskDuration = 50000;

  return (
    <div css={screenLayout}>
      <div>
        <h2>Doing Task: {currentTask}</h2>
        <button
          type="button"
          onClick={() => {
            completeTask(null, currentTask);
          }}
        >
          Complete {currentTask} task
        </button>
      </div>

      <DurationBar step="Choose a task" durationLength={taskDuration / 1000} />
      <div css={GUIStyle} />
    </div>
  );
};

SolveScreen.propTypes = {
  currentTask: PropTypes.string,
  completeTask: PropTypes.func,
  interfaceHeight: PropTypes.number
};

const mapStateToProps = state => ({
  interfaceHeight: state.settings.screen.interfaceHeight
});

const mapDispatchToProps = dispatch => ({
  completeTask(taskChoice, currentTask) {
    dispatch(doNextTask(taskChoice, currentTask));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolveScreen);
