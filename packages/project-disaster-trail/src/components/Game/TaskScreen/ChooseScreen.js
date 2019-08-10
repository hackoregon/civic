/** @jsx jsx */
import { PureComponent, Fragment } from "react";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";

import {
  getWeightedTasks,
  getActiveTaskData,
  addTask,
  getActiveEnvironment,
  getTasksForEnvironment
} from "../../../state/tasks";
import DurationBar from "../../atoms/DurationBar";
import OrbManager from "../OrbManager";
import TaskMap from "./TaskMap";

const screenLayout = css`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: beige;
`;

const defaultState = {
  voteTimer: null,
  timeToVote: 20000,
  chooseTask: false,
  animateMap: false
};

class ChooseScreen extends PureComponent {
  state = defaultState;

  componentDidMount() {
    const { timeToVote } = this.state;
    const { weightedTasks } = this.props;
    const taskVotes = weightedTasks.reduce((result, taskData) => {
      // eslint-disable-next-line no-param-reassign
      result[taskData.type] = 0;
      return result;
    }, {});

    this.setState({
      voteTimer: setTimeout(this.goToTask, timeToVote),
      taskVotes
    });
  }

  componentWillUnmount() {
    const { exampleTimeToAnimate } = this.state;
    clearTimeout(exampleTimeToAnimate);
    this.clearVoteTimeout();
  }

  clearVoteTimeout = () => {
    const { voteTimer } = this.state;
    clearTimeout(voteTimer);
  };

  getPossibleTasks = () => {
    const { activeEnvironment, tasksForEnvironment } = this.props;
    // All possible tasks for the game environment
    const saveYourselfTasks =
      tasksForEnvironment[activeEnvironment].saveYourself;
    const saveOthersTasks = tasksForEnvironment[activeEnvironment].saveOthers;
    return [].concat(saveYourselfTasks, saveOthersTasks);
  };

  chooseRandomTask = () => {
    const possibleTasks = this.getPossibleTasks();
    const randomIndex = Math.floor(Math.random() * possibleTasks.length);
    const randomTask = possibleTasks[randomIndex];
    return randomTask;
  };

  onTaskSelection = task => {
    const { taskVotes } = this.state;
    taskVotes[task.type] += 1;

    this.setState({
      taskVotes
    });
    // Return true so Orb knows how to animate
    return true;
  };

  // returns [ {vote count}, {task id} ]
  tallyVotes = () => {
    const { taskVotes } = this.state;
    const taskIds = Object.keys(taskVotes);

    return taskIds.reduce(
      (accumulator, id) => {
        const votesForTask = taskVotes[id];
        const [mostVotesCount] = accumulator;
        if (votesForTask > mostVotesCount) {
          // eslint-disable-next-line no-param-reassign
          accumulator = [votesForTask, id];
        }
        return accumulator;
      },
      [0, null]
    );
  };

  goToTask = () => {
    this.clearVoteTimeout();

    const { addNextTask } = this.props;
    const voteResults = this.tallyVotes();

    // eslint-disable-next-line prefer-const
    let [mostVotesCount, mostVotesId] = voteResults;
    if (mostVotesCount < 1) {
      mostVotesId = this.chooseRandomTask();
    }

    // As an example of the time to pan and zoom, use a timeout
    const exampleTimeToAnimate = setTimeout(() => {
      addNextTask(mostVotesId);
    }, 2000);

    this.setState({
      // trigger pan and zoom...
      animateMap: true,
      exampleTimeToAnimate
    });
  };

  render() {
    const { timeToVote, animateMap } = this.state;
    const { weightedTasks } = this.props;

    return (
      <Fragment>
        <div css={screenLayout}>
          <TaskMap animateMap={animateMap} />
        </div>

        <DurationBar step="Choose a task" durationLength={timeToVote / 1000} />
        <OrbManager
          possibleItems={weightedTasks}
          onOrbSelection={this.onTaskSelection}
          frozenOrbInterface
        />
      </Fragment>
    );
  }
}

ChooseScreen.propTypes = {
  activeTask: PropTypes.shape({}),
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({})),
  addNextTask: PropTypes.func,
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({})
};

const mapStateToProps = state => ({
  weightedTasks: getWeightedTasks(state),
  activeTask: getActiveTaskData(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state)
});

const mapDispatchToProps = dispatch => ({
  addNextTask(taskChoice, taskId) {
    dispatch(addTask(taskChoice, taskId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseScreen);
