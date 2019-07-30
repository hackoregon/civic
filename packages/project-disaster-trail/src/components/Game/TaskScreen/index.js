/** @jsx jsx */
import { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";

import ChapterButtons from "../ChapterButtons";
import ChooseScreen from "./ChooseScreen";
import SolveScreen from "./SolveScreen";
import { getActiveTask } from "../../../state/tasks";

const screenLayout = css`
  position: relative;
  display: grid;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  min-height: 650px;
  min-width: 800px;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  background: beige;
`;

const defaultState = {
  currentTask: null
};

class TaskScreen extends Component {
  state = defaultState;

  componentDidUpdate(prevProps) {
    const { activeTask } = this.props;
    const taskHasBeenCompleted = prevProps.activeTask !== activeTask;
    if (taskHasBeenCompleted) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(defaultState);
    }
  }

  goToTask = task => {
    this.setState({
      currentTask: task
    });
  };

  render() {
    const { currentTask } = this.state;

    return (
      <div css={screenLayout}>
        <ChapterButtons />
        {currentTask ? (
          <SolveScreen currentTask={currentTask} />
        ) : (
          <ChooseScreen goToTask={this.goToTask} />
        )}
      </div>
    );
  }
}

TaskScreen.propTypes = {
  activeTask: PropTypes.number
};

const mapStateToProps = state => ({
  activeTask: getActiveTask(state)
});

export default connect(mapStateToProps)(TaskScreen);
