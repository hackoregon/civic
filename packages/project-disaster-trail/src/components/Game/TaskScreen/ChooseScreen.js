/** @jsx jsx */
import { Component, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";

import {
  getTaskOrder,
  getActiveTask,
  getActiveEnvironment,
  getTasksForEnvironment,
  getCompletedTasks
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
    const { taskOrder, activeTask } = this.props;
    const { timeToVote } = this.state;
    const nextTask = taskOrder[activeTask];

    if (!nextTask) {
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
    const { goToTask } = this.props;
    this.clearVoteTimeout();
    goToTask(task);
  };

  chooseRandomTask = () => {
    const { goToTask } = this.props;
    const possibleTasks = this.getPossibleTasks();
    const randomIndex = Math.floor(Math.random() * possibleTasks.length);
    const randomTask = possibleTasks[randomIndex];
    goToTask(randomTask);
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
      activeTask,
      activeEnvironment,
      tasksForEnvironment,
      goToTask,
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
    const nextTask = taskOrder[activeTask];

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
          ${nextTask && screenWithInterfaceLayout}
        `}
      >
        <div>
          <h2>Task: Choose Screen</h2>
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

        {!nextTask && (
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
  activeTask: PropTypes.number,
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({}),
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  goToTask: PropTypes.func,
  interfaceHeight: PropTypes.number
};

const mapStateToProps = state => ({
  taskOrder: getTaskOrder(state),
  activeTask: getActiveTask(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state),
  completedTasks: getCompletedTasks(state),
  interfaceHeight: state.settings.screen.interfaceHeight
});

export default connect(mapStateToProps)(ChooseScreen);
