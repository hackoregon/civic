import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getTaskOrder,
  getActiveTask,
  getCompletedTasks
} from "../../../state/tasks";

const ChooseScreen = ({ taskOrder, activeTask, completedTasks, goToTask }) => {
  let nextTask = taskOrder[activeTask];
  if (!nextTask) {
    nextTask = "fire";
  }

  return (
    <div>
      <h2>Choose Screen</h2>
      <h3>Tasks to be done: [ {taskOrder.join(", ").toString()} ]</h3>
      <h3>Next Task: {nextTask}</h3>
      <h3>Complete Tasks: [{completedTasks.join(", ").toString()} ]</h3>

      <button
        type="button"
        onClick={() => {
          goToTask(nextTask);
        }}
      >
        Go to task
      </button>
    </div>
  );
};

ChooseScreen.propTypes = {
  taskOrder: PropTypes.arrayOf(PropTypes.string),
  activeTask: PropTypes.number,
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  goToTask: PropTypes.func
};

const mapStateToProps = state => ({
  taskOrder: getTaskOrder(state),
  activeTask: getActiveTask(state),
  completedTasks: getCompletedTasks(state)
});

export default connect(mapStateToProps)(ChooseScreen);
