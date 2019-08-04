import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import {
  getTaskOrder,
  getActiveTaskData,
  getActiveEnvironment,
  getTasksForEnvironment,
  getCompletedTasks,
  getHasSavedSelf,
  addTask
} from "../../../state/tasks";
import TextContainer from "../../atoms/Containers/TextContainer";

class TaskMap extends Component {
  componentDidUpdate(prevProps) {
    const { chooseTask, clearVoteTimeout } = this.props;

    if (chooseTask === true && !prevProps.chooseTask) {
      this.chooseRandomTask();
      clearVoteTimeout();
    }
  }

  chooseTask = task => {
    const { addNextTask, clearVoteTimeout } = this.props;
    clearVoteTimeout();
    addNextTask(task);
  };

  chooseRandomTask = () => {
    const { addNextTask } = this.props;
    const possibleTasks = this.getPossibleTasks();
    const randomIndex = Math.floor(Math.random() * possibleTasks.length);
    const randomTask = possibleTasks[randomIndex];
    addNextTask(randomTask);
  };

  getPossibleTasks = () => {
    const { activeEnvironment, tasksForEnvironment } = this.props;
    // All possible tasks for the game environment
    const saveYourselfTasks =
      tasksForEnvironment[activeEnvironment].saveYourself;
    const saveOthersTasks = tasksForEnvironment[activeEnvironment].saveOthers;
    return [].concat(saveYourselfTasks, saveOthersTasks);
  };

  render() {
    const {
      activeEnvironment,
      tasksForEnvironment,
      completedTasks
    } = this.props;

    const mapTasksToButton = task => (
      <button
        key={task}
        type="button"
        onClick={() => {
          this.chooseTask(task);
        }}
      >
        {task}
      </button>
    );

    // All possible tasks for the game environment
    const saveYourselfTasks = tasksForEnvironment[
      activeEnvironment
    ].saveYourself.map(mapTasksToButton);
    const saveOthersTasks = tasksForEnvironment[
      activeEnvironment
    ].saveOthers.map(mapTasksToButton);
    const possibleTaskButtons = [].concat(saveYourselfTasks, saveOthersTasks);

    // <h1>PANNING AND ZOOMING...</h1>

    return (
      <TextContainer>
        <h3>Choose next task for {activeEnvironment} environment:</h3>
        {possibleTaskButtons}
        <h3>Complete Tasks: [{completedTasks.join(", ").toString()} ]</h3>
      </TextContainer>
    );
  }
}

TaskMap.propTypes = {
  activeTask: PropTypes.shape({}),
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({}),
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  addNextTask: PropTypes.func,
  chooseTask: PropTypes.bool,
  clearVoteTimeout: PropTypes.func
};

const mapStateToProps = state => ({
  taskOrder: getTaskOrder(state),
  saveOthersMode: getHasSavedSelf(state),
  activeTask: getActiveTaskData(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state),
  completedTasks: getCompletedTasks(state)
});

const mapDispatchToProps = dispatch => ({
  addNextTask(taskChoice, taskId) {
    dispatch(addTask(taskChoice, taskId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskMap);
