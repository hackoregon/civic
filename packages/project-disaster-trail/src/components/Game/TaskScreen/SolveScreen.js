/** @jsx jsx */
import { PureComponent } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";

import { completeTask, getActiveTaskData } from "../../../state/tasks";
import { getKitCreationItems } from "../../../state/kit";
import div from "../../atoms/Containers/TextContainer";

const defaultState = {
  correctItemsChosen: 0
};

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

  onKitItemSelection = kitItem => {
    const { activeTask } = this.props;

    if (activeTask.requiredItem === kitItem.type) {
      this.setState(state => ({
        correctItemsChosen: state.correctItemsChosen + 1
      }));
    }
  };

  render() {
    const { completeActiveTask, activeTask, open } = this.props;
    const { correctItemsChosen } = this.state;

    // eslint-disable-next-line react/destructuring-assignment
    const activeTaskInState = this.state.activeTask;
    const taskToRender = activeTask || activeTaskInState;

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

    const taskImage = css`
      background-image: url(${taskToRender ? taskToRender.sceneSVG : null});
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      width: 100%;
    `;

    // const taskDuration = taskToRender.time;

    return (
      <div
        css={css`
          ${screenLayout}
          ${open ? onScreenStyle : {}}
        `}
      >
        {taskToRender && (
          <div css={taskImage}>
            <h2>{taskToRender.text}</h2>
            <h3>
              Correct items chosen: {correctItemsChosen} of{" "}
              {taskToRender.numberItemsToSolve}
            </h3>
            <button
              type="button"
              onClick={() => {
                completeActiveTask(taskToRender.id);
              }}
            >
              Use {taskToRender.requiredItem}
            </button>
          </div>
        )}
      </div>
    );
  }
}

SolveScreen.propTypes = {
  completeActiveTask: PropTypes.func,
  activeTask: PropTypes.shape({
    id: PropTypes.string,
    imageSVG: PropTypes.string
  }),
  // leaving this commented as it will likely be needed post merge
  // possibleItems: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     imageSVG: PropTypes.string,
  //     good: PropTypes.bool,
  //     onSelection: PropTypes.func,
  //     weighting: PropTypes.number
  //   })
  // ),
  open: PropTypes.bool
};

const mapStateToProps = state => ({
  activeTask: getActiveTaskData(state),
  possibleItems: getKitCreationItems(state)
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
