/** @jsx jsx */
import { PureComponent, Fragment } from "react";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";

import { getWeightedTasks, getActiveTaskData } from "../../../state/tasks";
import DurationBar from "../../atoms/DurationBar";
import OrbManager from "../OrbManager";
import TaskMap from "./TaskMap";

const screenLayout = css`
  position: relative;
  display: grid;
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
  chooseTask: false
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
      voteTimer: setTimeout(this.chooseRandomTask, timeToVote),
      taskVotes
    });
  }

  componentWillUnmount() {
    this.clearVoteTimeout();
  }

  clearVoteTimeout = () => {
    const { voteTimer } = this.state;
    clearTimeout(voteTimer);
  };

  chooseRandomTask = () => {
    this.setState({ chooseTask: true });
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

  render() {
    const { timeToVote, chooseTask } = this.state;
    const { weightedTasks } = this.props;

    return (
      <Fragment>
        <div css={screenLayout}>
          <TaskMap
            chooseTask={chooseTask}
            clearVoteTimeout={this.clearVoteTimeout}
          />
        </div>

        <DurationBar step="Choose a task" durationLength={timeToVote / 1000} />
        <OrbManager
          possibleItems={weightedTasks}
          onOrbSelection={this.onTaskSelection}
        />
      </Fragment>
    );
  }
}

ChooseScreen.propTypes = {
  activeTask: PropTypes.shape({}),
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = state => ({
  weightedTasks: getWeightedTasks(state),
  activeTask: getActiveTaskData(state)
});

export default connect(mapStateToProps)(ChooseScreen);
