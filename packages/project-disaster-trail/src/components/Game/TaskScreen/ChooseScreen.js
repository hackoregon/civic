/** @jsx jsx */
import { PureComponent, Fragment } from "react";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  getWeightedTasks,
  addTask,
  getActiveEnvironment,
  getTasksForEnvironment,
  startTick as _startTick,
  stopTick as _stopTick
} from "../../../state/tasks";
import DurationBar from "../../atoms/DurationBar";
import Ticker from "../../atoms/Ticker";
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
  voteId: null,
  votingDuration: 20000,
  animationId: null,
  animationDuration: 2000,
  chooseTask: false,
  animateMap: false,
  voteTimer: null
};

class ChooseScreen extends PureComponent {
  state = defaultState;

  componentDidMount() {
    const { votingDuration } = this.state;
    const { weightedTasks, startTick } = this.props;
    const taskVotes = weightedTasks.reduce((result, taskData) => {
      // eslint-disable-next-line no-param-reassign
      result[taskData.type] = 0;
      return result;
    }, {});

    this.setState({
      voteId: setTimeout(this.goToTask, votingDuration),
      taskVotes
    });

    // when the component mounts, we want to start a timer
    // startTick(votingDuration);
  }

  componentDidUpdate(prevProps) {
    const { outOfTime } = this.props;
    const { animateMap } = this.state;

    // user ran out of time before 'completing' the task
    if (outOfTime && !prevProps.outOfTime) {
      if (!animateMap) {
        this.moveMap();
      } else {
        this.goToTask();
      }
    }
  }

  // cleanup
  componentWillUnmount() {
    const { animationId } = this.state;
    clearTimeout(animationId);
    this.clearVoteTimeout();

    const { stopTick } = this.props;
    stopTick();
  }

  clearVoteTimeout = () => {
    const { stopTick } = this.props;
    stopTick();

    const { voteId } = this.state;
    clearTimeout(voteId);
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

  moveMap = () => {
    console.log("moveMap");
    const { startTick } = this.props;
    const { animationDuration } = this.state;
    this.setState({
      // trigger pan and zoom...
      animateMap: true
    });

    const { animationId } = this.state;
    clearTimeout(animationId);
    // animationId = setTimeout(() => startTick(animationDuration), 100);
    this.setState({ animationId });
  };

  goToTask = () => {
    console.log("go to task");
    this.clearVoteTimeout();
    const { stopTick, startTick } = this.props;
    stopTick();

    const { addNextTask } = this.props;
    const voteResults = this.tallyVotes();

    // eslint-disable-next-line prefer-const
    let [mostVotesCount, mostVotesId] = voteResults;
    if (mostVotesCount < 1) {
      mostVotesId = this.chooseRandomTask();
    }

    addNextTask(mostVotesId);
    const { votingDuration } = this.state;

    let { animationId } = this.state;
    clearTimeout(animationId);
    animationId = setTimeout(() => startTick(votingDuration), 100);
    this.setState({ animationId });

    this.setState({ animateMap: false });
  };

  // render() {
  //   const { animateMap } = this.state;
  //   this.setState({
  //     // trigger pan and zoom...
  //     selectedTask: weightedTasks.find(task => task.type === mostVotesId),
  //     exampleTimeToAnimate
  //   });
  // };

  render() {
    const { selectedTask } = this.state;
    const { weightedTasks } = this.props;

    return (
      <div css={screenLayout}>
        <TaskMap
          activeTask={selectedTask || weightedTasks[0]}
          tasks={weightedTasks}
        />
      </div>
    );
  }
}

ChooseScreen.propTypes = {
  activeTask: PropTypes.shape({}),
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({})),
  addNextTask: PropTypes.func,
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({}),
  startTick: PropTypes.func,
  stopTick: PropTypes.func,
  outOfTime: PropTypes.bool
};

const mapStateToProps = state => ({
  weightedTasks: getWeightedTasks(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state),
  outOfTime: state.tasks.outOfTime
});

const mapDispatchToProps = dispatch => ({
  addNextTask(taskChoice, taskId) {
    dispatch(addTask(taskChoice, taskId));
  },
  startTick: bindActionCreators(_startTick, dispatch),
  stopTick: bindActionCreators(_stopTick, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseScreen);
