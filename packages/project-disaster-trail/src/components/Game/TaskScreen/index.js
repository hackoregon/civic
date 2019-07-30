import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getTaskOrder,
  getActiveTask,
  getActiveEnvironment,
  getTasksForEnvironment,
  doNextTask,
  changeEnvironment
} from "../../../state/tasks";

const TaskScreen = ({
  taskOrder,
  activeTask,
  activeEnvironment,
  tasksForEnvironment,
  addTask,
  updateEnvironment
}) => {
  const mapTasksToButton = task => (
    <button
      key={task}
      type="button"
      onClick={() => {
        addTask(task);
      }}
    >
      {task}
    </button>
  );

  // All possible tasks for the game environment
  const saveYourselfTasks = tasksForEnvironment[
    activeEnvironment
  ].saveYourself.map(mapTasksToButton);
  const saveOthersTasks = tasksForEnvironment[activeEnvironment].saveOthers.map(
    mapTasksToButton
  );
  const possibleTasks = [].concat(saveYourselfTasks, saveOthersTasks);

  // All types of environment
  const environments = Object.keys(tasksForEnvironment);
  const envButtons = environments.map(environment => (
    <button
      key={environment}
      type="button"
      onClick={() => {
        updateEnvironment(environment);
      }}
    >
      {environment}
    </button>
  ));

  return (
    <div style={{ flexDirection: "column" }}>
      <h1>Task Screen</h1>
      <h2>activeEnvironment: {activeEnvironment}</h2>
      <div>
        <h2>tasksForEnvironment</h2>
        <p>
          saveYourself: [
          {tasksForEnvironment[activeEnvironment].saveYourself.map(
            task => ` ${task}, `
          )}
          ]
        </p>
        <p>
          saveOthers: [
          {tasksForEnvironment[activeEnvironment].saveOthers.map(
            task => ` ${task}, `
          )}
          ]
        </p>
      </div>

      <h2>taskOrder: [{taskOrder.map(task => ` ${task}, `)}]</h2>

      <h2>activeTask: {taskOrder[activeTask]}</h2>
      <h3>Change activeTask</h3>
      {possibleTasks}
      <h3>Change activeEnvironment</h3>
      {envButtons}
    </div>
  );
};

TaskScreen.propTypes = {
  taskOrder: PropTypes.arrayOf(PropTypes.string),
  activeTask: PropTypes.number,
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({}),
  addTask: PropTypes.func,
  updateEnvironment: PropTypes.func
};

const mapStateToProps = state => ({
  taskOrder: getTaskOrder(state),
  activeTask: getActiveTask(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state)
});

const mapDispatchToProps = dispatch => ({
  addTask(chosenTask) {
    dispatch(doNextTask(chosenTask));
  },
  updateEnvironment(chosenEnv) {
    dispatch(changeEnvironment(chosenEnv));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskScreen);
