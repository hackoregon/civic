/** @jsx jsx */
import { PureComponent } from "react";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";

import {
  getWeightedTasks,
  addTask,
  getActiveEnvironment,
  getTasksForEnvironment
} from "../../../state/tasks";
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
  animationId: null,
  chooseTask: false,
  animateMap: false,
  voteTimer: null
};

class ChooseScreen extends PureComponent {
  state = defaultState;

  componentDidMount() {
    const { weightedTasks } = this.props;
    const taskVotes = weightedTasks.reduce((result, taskData) => {
      // eslint-disable-next-line no-param-reassign
      result[taskData.type] = 0;
      return result;
    }, {});

    this.setState({
      taskVotes
    });
  }

  componentDidUpdate(prevProps) {
    const { votingComplete } = this.props;

    if (votingComplete && !prevProps.votingComplete) {
      this.goToTask();
    }
  }

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
    const { addNextTask } = this.props;
    const voteResults = this.tallyVotes();

    // eslint-disable-next-line prefer-const
    let [mostVotesCount, mostVotesId] = voteResults;
    if (mostVotesCount < 1) {
      mostVotesId = this.chooseRandomTask();
    }

    addNextTask(mostVotesId);
  };

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
  votingComplete: PropTypes.bool
  // startTick: PropTypes.func,
  // stopTick: PropTypes.func,
};

const mapStateToProps = state => ({
  weightedTasks: getWeightedTasks(state),
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
