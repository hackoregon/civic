/** @jsx jsx */
import { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";

import {
  completeTask,
  getActiveTaskData
  // startTick as _startTick,
  // stopTick as _stopTick
} from "../../../state/tasks";
import { getPlayerKitItems } from "../../../state/kit";
import TextContainer from "../../atoms/Containers/TextContainer";

const defaultState = {
  taskTimer: null,
  correctItemsChosen: 0
};

const screenLayout = css`
  position: absolute;
  left: 0;
  display: grid;
  overflow: hidden;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  background: beige;
  z-index: 101;
  transform: translateY(-100%);
  transition: transform 0.5s;
`;

const onScreenStyle = css`
  transform: translateY(0%);
`;

class SolveScreen extends PureComponent {
  state = defaultState;

  componentDidMount() {
    // const { activeTask, startTick } = this.props;
    // startTick(activeTask.time);
  }

  componentDidUpdate(prevProps) {
    const { activeTask, outOfTime } = this.props;
    const { correctItemsChosen } = this.state;

    // if (
    //   activeTask &&
    //   prevProps.activeTask &&
    //   activeTask.id !== prevProps.activeTask.id
    // ) {
    //   startTick(activeTask.time);
    // }

    // if (activeTask && correctItemsChosen >= activeTask.numberItemsToSolve) {
    //   this.finishTask();
    // }

    // // user ran out of time before 'completing' the task
    // if (
    //   (outOfTime && !prevProps.outOfTime) ||
    //   (!activeTask && prevProps.activeTask)
    // ) {
    //   this.finishTask();

    //   // start the next task
    //   if (activeTask) {
    //     setTimeout(() => {
    //       startTick(activeTask.time);
    //     }, 500);
    //   }
    // }

    // // store the last active task
    // // to avoid activeTask text disappearing
    // // when the activeTask property is null
    // if (activeTask && activeTask !== this.state.activeTask) {
    //   this.setState({ activeTask });
    // }
  }

  componentWillUnmount() {
    const { stopTick } = this.props;
    stopTick();
  }

  finishTask = () => {
    const { completeActiveTask, activeTask, stopTick } = this.props;
    if (activeTask) {
      stopTick();
      completeActiveTask(activeTask.id);
    }
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
    const { completeActiveTask, playerKitItems, open } = this.props;
    const { correctItemsChosen } = this.state;

    // we've stored the activeTask in state
    // to avoid the activeTask text disappearing
    // while the component animates out
    const activeTask = this.props.activeTask
      ? this.props.activeTask
      : this.state.activeTask;

    return (
      <div
        css={css`
          ${screenLayout}
          ${open ? onScreenStyle : {}}
        `}
      >
        {activeTask && (
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
        )}
      </div>
    );
  }
}

SolveScreen.propTypes = {
  completeActiveTask: PropTypes.func,
  activeTask: PropTypes.shape({
    id: PropTypes.string
  }),
  playerKitItems: PropTypes.arrayOf(PropTypes.shape({})),
  // startTick: PropTypes.func,
  // stopTick: PropTypes.func,
  outOfTime: PropTypes.bool
};

const mapStateToProps = state => ({
  activeTask: getActiveTaskData(state),
  playerKitItems: getPlayerKitItems(state),
  outOfTime: state.tasks.outOfTime
});

const mapDispatchToProps = dispatch => ({
  // startTick: bindActionCreators(_startTick, dispatch),
  // stopTick: bindActionCreators(_stopTick, dispatch),
  completeActiveTask(taskChoice, taskId) {
    dispatch(completeTask(taskChoice, taskId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolveScreen);
