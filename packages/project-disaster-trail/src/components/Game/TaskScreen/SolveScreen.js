import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { doNextTask } from "../../../state/tasks";

const SolveScreen = ({ currentTask, completeTask }) => {
  return (
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
  );
};

SolveScreen.propTypes = {
  currentTask: PropTypes.string,
  completeTask: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  completeTask(taskChoice, currentTask) {
    dispatch(doNextTask(taskChoice, currentTask));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SolveScreen);
