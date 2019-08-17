/** @jsx jsx */
import { PureComponent } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";

import {
  completeTask,
  getActiveTaskData
  // startTick as _startTick,
  // stopTick as _stopTick
} from "../../../state/tasks";
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
  padding-top: 100px;
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

  componentDidUpdate() {
    const { activeTask } = this.props;

    // store the last active task
    // to avoid activeTask text disappearing
    // when the activeTask property is null
    // eslint-disable-next-line react/destructuring-assignment
    const activeTaskInState = this.state.activeTask;
    if (activeTask && activeTask !== activeTaskInState) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ activeTask });
    }
  }

  finishTask = () => {
    const { completeActiveTask, activeTask } = this.props;
    if (activeTask) {
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
    const { completeActiveTask, open, activeTask } = this.props;
    const { correctItemsChosen } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    const activeTaskInState = this.state.activeTask;

    // we've stored the activeTask in state
    // to avoid the activeTask text disappearing
    // while the component animates out
    const activeTaskToRender = activeTask || activeTaskInState;

    return (
      <div
        css={css`
          ${screenLayout}
          ${open ? onScreenStyle : {}}
        `}
      >
        {activeTaskToRender && (
          <TextContainer>
            <h2>{activeTaskToRender.text}</h2>
            <h3>
              Correct items chosen: {correctItemsChosen} of{" "}
              {activeTaskToRender.numberItemsToSolve}
            </h3>
            <button
              type="button"
              onClick={() => {
                completeActiveTask(activeTaskToRender.id);
              }}
            >
              Use {activeTaskToRender.requiredItem}
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
  open: PropTypes.bool
};

const mapStateToProps = state => ({
  activeTask: getActiveTaskData(state),
  outOfTime: state.tasks.outOfTime
});

const mapDispatchToProps = dispatch => ({
  completeActiveTask(taskChoice, taskId) {
    dispatch(completeTask(taskChoice, taskId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolveScreen);
