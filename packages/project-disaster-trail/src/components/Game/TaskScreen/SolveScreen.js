/** @jsx jsx */
import { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";

import {
  completeTask,
  getActiveTaskData,
  startTick as _startTick,
  stopTick as _stopTick
} from "../../../state/tasks";
import { getPlayerKitItems } from "../../../state/kit";
import DurationBar from "../../atoms/DurationBar";
import Ticker from "../../atoms/Ticker";
import TextContainer from "../../atoms/Containers/TextContainer";
import OrbManager from "../OrbManager";

const defaultState = {
  taskTimer: null,
  correctItemsChosen: 0
};

class SolveScreen extends PureComponent {
  state = defaultState;

  componentDidMount() {
    const { activeTask, startTick } = this.props;
    startTick(activeTask.time);
  }

  componentDidUpdate(prevProps) {
    const { activeTask, startTick, stopTick, outOfTime } = this.props;
    const { correctItemsChosen } = this.state;

    if (activeTask.id !== prevProps.activeTask.id) {
      startTick(activeTask.time);
    }

    if (correctItemsChosen >= activeTask.numberItemsToSolve) {
      this.finishTask();
      stopTick();
    }

    // user ran out of time before 'completing' the task
    if (outOfTime && !prevProps.outOfTime) {
      this.finishTask();
      setTimeout(() => {
        startTick(activeTask.time);
      }, 500);
    }
  }

  componentWillUnmount() {
    const { stopTick } = this.props;
    stopTick();
  }

  finishTask = () => {
    const { completeActiveTask, activeTask, stopTick } = this.props;
    completeActiveTask(activeTask.id);
    stopTick();
  };

  onItemSelection = item => {
    const { activeTask } = this.props;

    if (item.type === activeTask.requiredItem) {
      this.setState(state => ({
        correctItemsChosen: state.correctItemsChosen + 1
      }));
    }
  };

  render() {
    const { completeActiveTask, activeTask, playerKitItems } = this.props;
    const { correctItemsChosen } = this.state;

    const screenLayout = css`
      position: relative;
      display: grid;
      overflow: hidden;
      width: 100%;
      height: 100%;
      grid-template-columns: 1fr;
      background: beige;
    `;

    return (
      <Fragment>
        <div css={screenLayout}>
          <TextContainer>
            <h2>{activeTask.text}</h2>
            <h3>
              Correct items chosen: {correctItemsChosen} of{" "}
              {activeTask.numberItemsToSolve}
            </h3>
            <button
              type="button"
              onClick={() => {
                completeActiveTask(activeTask.id);
              }}
            >
              Use {activeTask.requiredItem}
            </button>
          </TextContainer>
        </div>
        <DurationBar step="Choose a task" debug />
        <Ticker text="Ticker tape text that goes across the screen to give instructions" />
        <OrbManager
          possibleItems={playerKitItems}
          onOrbSelection={this.onItemSelection}
        />
      </Fragment>
    );
  }
}

SolveScreen.propTypes = {
  completeActiveTask: PropTypes.func,
  activeTask: PropTypes.shape({
    id: PropTypes.string
  }),
  playerKitItems: PropTypes.arrayOf(PropTypes.shape({})),
  startTick: PropTypes.func,
  stopTick: PropTypes.func,
  outOfTime: PropTypes.bool
};

const mapStateToProps = state => ({
  activeTask: getActiveTaskData(state),
  playerKitItems: getPlayerKitItems(state),
  outOfTime: state.tasks.outOfTime
});

const mapDispatchToProps = dispatch => ({
  startTick: bindActionCreators(_startTick, dispatch),
  stopTick: bindActionCreators(_stopTick, dispatch),
  completeActiveTask(taskChoice, taskId) {
    dispatch(completeTask(taskChoice, taskId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolveScreen);
