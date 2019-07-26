import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { map } from "lodash";
import {
  getTaskOrder,
  getActiveTask,
  getActiveEnvironment,
  getTasksForEnvironment,
  doNextTask,
  changeEnvironment
} from "../../state/tasks";

const TaskScreen = ({
  taskOrder,
  activeTask,
  activeEnvironment,
  tasksForEnvironment,
  addTask,
  updateEnvironment
}) => {
  const possibleTasks = [];
  map(tasksForEnvironment[activeEnvironment], tasks => {
    for (let i = 0; i < tasks.length; i += 1) {
      const taskOption = tasks[i];
      possibleTasks.push(
        <button
          key={taskOption}
          type="button"
          onClick={() => {
            addTask(taskOption);
          }}
        >
          {taskOption}
        </button>
      );
    }
  });

  const environments = Object.keys(tasksForEnvironment);
  const envButtons = [];
  for (let i = 0; i < environments.length; i += 1) {
    envButtons.push(
      <button
        key={environments[i]}
        type="button"
        onClick={() => {
          updateEnvironment(environments[i]);
        }}
      >
        {environments[i]}
      </button>
    );
  }

  return (
    <div style={{ flexDirection: "column" }}>
      <h1>Task Screen</h1>
      <h2>activeEnvironment: {activeEnvironment}</h2>
      <div>
        <h2>tasksForEnvironment</h2>
        <p>
          saveYourself: [
          {map(
            tasksForEnvironment[activeEnvironment].saveYourself,
            task => ` ${task}, `
          )}
          ]
        </p>
        <p>
          saveOthers: [
          {map(
            tasksForEnvironment[activeEnvironment].saveOthers,
            task => ` ${task}, `
          )}
          ]
        </p>
      </div>

      <h2>taskOrder: [{map(taskOrder, task => ` ${task}, `)}]</h2>

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

// export default TaskScreen;

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
