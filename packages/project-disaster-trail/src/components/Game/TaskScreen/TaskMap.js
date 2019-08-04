import React, { Component, Fragment } from "react";
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
  state = {
    taskChosen: false,
    exampleTimeToAnimate: null
  };

  componentDidUpdate(prevProps) {
    const { chooseTask, clearVoteTimeout } = this.props;

    if (chooseTask === true && !prevProps.chooseTask) {
      this.chooseRandomTask();
      clearVoteTimeout();
    }
  }

  componentWillUnmount() {
    const { exampleTimeToAnimate } = this.state;
    clearTimeout(exampleTimeToAnimate);
  }

  chooseTask = task => {
    const { addNextTask, clearVoteTimeout } = this.props;
    clearVoteTimeout();

    this.panAndZoom();
    // addNextTask(task);

    // As an example of the time to pan and zoom, use a timeout... otherwise it would be the line above
    const exampleTimeToAnimate = setTimeout(() => {
      addNextTask(task);
    }, 2000);
    this.setState({
      exampleTimeToAnimate
    });
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

  panAndZoom = () => {
    this.setState({ taskChosen: true });
  };

  render() {
    const {
      activeEnvironment,
      tasksForEnvironment,
      completedTasks
    } = this.props;
    const { taskChosen } = this.state;

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

    return (
      <TextContainer>
        {taskChosen ? (
          <h1>SUPER COOL MAP IS PANNING AND ZOOMING...</h1>
        ) : (
          <Fragment>
            <h2>THIS IS A SUPER COOL MAP</h2>
            <h3>Choose next task for {activeEnvironment} environment:</h3>
            {possibleTaskButtons}
            <h3>Complete Tasks: [{completedTasks.join(", ").toString()} ]</h3>
          </Fragment>
        )}
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
