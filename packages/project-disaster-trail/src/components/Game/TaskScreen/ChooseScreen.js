/** @jsx jsx */
import { Component, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";

import {
  getTaskOrder,
  getActiveTaskData,
  getActiveEnvironment,
  getTasksForEnvironment,
  getCompletedTasks,
  getHasSavedSelf,
  addTask,
  increaseActiveTask
} from "../../../state/tasks";
import { XL } from "../../../constants/screens";
import DurationBar from "../DurationBar";

const screenLayout = css`
  position: relative;
  display: grid;
  overflow: hidden;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  background: beige;
`;

const defaultState = {
  voteTimer: null,
  timeToVote: 7000
};

class ChooseScreen extends Component {
  state = defaultState;

  componentDidMount() {
    const { activeTask } = this.props;
    const { timeToVote } = this.state;

    if (!activeTask) {
      this.setState({
        voteTimer: setTimeout(this.chooseRandomTask, timeToVote)
      });
    }
  }

  componentWillUnmount() {
    this.clearVoteTimeout();
  }

  clearVoteTimeout = () => {
    const { voteTimer } = this.state;
    clearTimeout(voteTimer);
  };

  chooseTask = task => {
    const { addNextTask } = this.props;
    this.clearVoteTimeout();
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
      taskOrder,
      saveOthersMode,
      goToNextTask,
      activeEnvironment,
      tasksForEnvironment,
      completedTasks,
      interfaceHeight
    } = this.props;
    const { timeToVote } = this.state;

    const screenWithInterfaceLayout = css`
      grid-template-rows: 1fr 40px ${interfaceHeight}px;
    `;

    const GUIStyle = css`
      background: pink;
      height: ${interfaceHeight}px;

      @media (min-height: ${XL.height}px) {
        height: ${interfaceHeight}px;
      }
    `;

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

    const tasksTodo = taskOrder.join(", ").toString();

    // All possible tasks for the game environment
    const saveYourselfTasks = tasksForEnvironment[
      activeEnvironment
    ].saveYourself.map(mapTasksToButton);
    const saveOthersTasks = tasksForEnvironment[
      activeEnvironment
    ].saveOthers.map(mapTasksToButton);
    const possibleTaskButtons = [].concat(saveYourselfTasks, saveOthersTasks);

    return (
      <div
        css={css`
          ${screenLayout};
          ${saveOthersMode && screenWithInterfaceLayout}
        `}
      >
        <div>
          <h2>Task: Choose Screen</h2>
          {!saveOthersMode && (
            <h3>
              Tasks to be done first in {activeEnvironment} environment: [{" "}
              {tasksTodo} ]
            </h3>
          )}
          <h3>
            Have you saved yourself yet? {saveOthersMode ? "yep!" : "nope"}
          </h3>
          {saveOthersMode ? (
            <Fragment>
              <h3>Choose next task for {activeEnvironment} environment:</h3>
              {possibleTaskButtons}
            </Fragment>
          ) : (
            <button
              type="button"
              onClick={() => {
                goToNextTask();
              }}
            >
              Save Yourself!
            </button>
          )}
          <h3>Complete Tasks: [{completedTasks.join(", ").toString()} ]</h3>
        </div>

        {saveOthersMode && (
          <Fragment>
            <DurationBar
              step="Choose a task"
              durationLength={timeToVote / 1000}
            />
            <div css={GUIStyle} />
          </Fragment>
        )}
      </div>
    );
  }
}

ChooseScreen.propTypes = {
  taskOrder: PropTypes.arrayOf(PropTypes.string),
  activeTask: PropTypes.shape({}),
  saveOthersMode: PropTypes.bool,
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({}),
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  addNextTask: PropTypes.func,
  goToNextTask: PropTypes.func,
  interfaceHeight: PropTypes.number
};

const mapStateToProps = state => ({
  taskOrder: getTaskOrder(state),
  saveOthersMode: getHasSavedSelf(state),
  activeTask: getActiveTaskData(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state),
  completedTasks: getCompletedTasks(state),
  interfaceHeight: state.settings.screen.interfaceHeight
});

const mapDispatchToProps = dispatch => ({
  addNextTask(taskChoice, taskId) {
    dispatch(addTask(taskChoice, taskId));
  },
  goToNextTask() {
    dispatch(increaseActiveTask());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseScreen);
