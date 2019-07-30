import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getTaskOrder,
  getActiveTask,
  getActiveEnvironment,
  getTasksForEnvironment,
  getCompletedTasks
} from "../../../state/tasks";

const ChooseScreen = ({
  taskOrder,
  activeTask,
  activeEnvironment,
  tasksForEnvironment,
  completedTasks,
  goToTask
}) => {
  const mapTasksToButton = task => (
    <button
      key={task}
      type="button"
      onClick={() => {
        goToTask(task);
      }}
    >
      {task}
    </button>
  );

  const tasksTodo = taskOrder.join(", ").toString();
  const nextTask = taskOrder[activeTask];

  // All possible tasks for the game environment
  const saveYourselfTasks = tasksForEnvironment[
    activeEnvironment
  ].saveYourself.map(mapTasksToButton);
  const saveOthersTasks = tasksForEnvironment[activeEnvironment].saveOthers.map(
    mapTasksToButton
  );
  const possibleTaskButtons = [].concat(saveYourselfTasks, saveOthersTasks);

  return (
    <div>
      <h2>Choose Screen</h2>
      {nextTask && (
        <h3>
          Tasks to be done first in {activeEnvironment} environment: [{" "}
          {tasksTodo} ]
        </h3>
      )}
      <h3>Have you saved yourself yet? {nextTask ? "nope" : "yep!"}</h3>
      <h3>Next Task: {nextTask || "vote below!"}</h3>
      {nextTask ? (
        <button
          type="button"
          onClick={() => {
            goToTask(nextTask);
          }}
        >
          Go to task
        </button>
      ) : (
        <Fragment>
          <h3>Choose next task for {activeEnvironment} environment:</h3>
          {possibleTaskButtons}
        </Fragment>
      )}
      <h3>Complete Tasks: [{completedTasks.join(", ").toString()} ]</h3>
    </div>
  );
};

ChooseScreen.propTypes = {
  taskOrder: PropTypes.arrayOf(PropTypes.string),
  activeTask: PropTypes.number,
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({}),
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  goToTask: PropTypes.func
};

const mapStateToProps = state => ({
  taskOrder: getTaskOrder(state),
  activeTask: getActiveTask(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state),
  completedTasks: getCompletedTasks(state)
});

export default connect(mapStateToProps)(ChooseScreen);
