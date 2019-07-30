import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import ChooseScreen from "./ChooseScreen";
import SolveScreen from "./SolveScreen";
import { getActiveTask } from "../../../state/tasks";

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
      <div>
        <h1>Task Screen</h1>
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
