/** @jsx jsx */
import { PureComponent, Fragment } from "react";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";

import { getPossibleTasks, getActiveTaskData } from "../../../state/tasks";
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
    const { activeTask } = this.props;
    const { timeToVote } = this.state;

    if (!activeTask) {
      // multiple first saveyourself issue root
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

  chooseRandomTask = () => {
    this.setState({ chooseTask: true });
  };

  render() {
    const { timeToVote, chooseTask } = this.state;
    const { possibleTasks } = this.props;

    return (
      <Fragment>
        <div css={screenLayout}>
          <TaskMap
            chooseTask={chooseTask}
            clearVoteTimeout={this.clearVoteTimeout}
          />
        </div>

        <DurationBar step="Choose a task" durationLength={timeToVote / 1000} />
        <OrbManager possibleItems={possibleTasks} />
      </Fragment>
    );
  }
}

ChooseScreen.propTypes = {
  activeTask: PropTypes.shape({}),
  possibleTasks: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = state => ({
  possibleTasks: getPossibleTasks(state),
  activeTask: getActiveTaskData(state)
});

export default connect(mapStateToProps)(ChooseScreen);
