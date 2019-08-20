/** @jsx jsx */
import { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";

import { completeTask, getActiveTaskData } from "../../../state/tasks";
import { getKitCreationItems } from "../../../state/kit";
import DurationBar from "../../atoms/DurationBar";
import TextContainer from "../../atoms/Containers/TextContainer";
import OrbManager from "../OrbManager";
import { GUIStyle } from "../index";

const defaultState = {
  taskTimer: null,
  correctItemsChosen: 0
};

class SolveScreen extends PureComponent {
  state = defaultState;

  componentDidMount() {
    this.createTaskTimeout();
  }

  componentDidUpdate(prevProps) {
    const { activeTask } = this.props;
    const { correctItemsChosen } = this.state;

    if (activeTask.id !== prevProps.activeTask.id) {
      this.clearTaskTimeout();
      this.createTaskTimeout();
    }

    if (correctItemsChosen >= activeTask.numberItemsToSolve) {
      this.finishTask();
    }
  }

  componentWillUnmount() {
    this.clearTaskTimeout();
  }

  createTaskTimeout = () => {
    const { activeTask } = this.props;

    this.setState({
      taskTimer: setTimeout(this.finishTask, activeTask.time)
    });
  };

  clearTaskTimeout = () => {
    const { taskTimer } = this.state;
    clearTimeout(taskTimer);
  };

  finishTask = () => {
    const { completeActiveTask, activeTask } = this.props;
    completeActiveTask(activeTask.id);
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
    const { completeActiveTask, activeTask, possibleItems } = this.props;
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

    const taskImage = css`
      background-image: url(${activeTask.imageSVG});
      background-repeat: no-repeat;
      background-size: cover;
      margin: 15px;
      height: 150px;
      width: 150px;
    `;

    const taskDuration = activeTask.time;

    return (
      <Fragment>
        <div css={screenLayout}>
          <TextContainer>
            <h2>{activeTask.text}</h2>
            <h3>
              Correct items chosen: {correctItemsChosen} of{" "}
              {activeTask.numberItemsToSolve}
            </h3>
            <div css={taskImage} />
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
        <DurationBar
          step="Choose a task"
          durationLength={taskDuration / 1000}
        />
        <GUIStyle>
          <OrbManager
            possibleItems={possibleItems}
            onOrbSelection={this.onKitItemSelection}
          />
        </GUIStyle>
      </Fragment>
    );
  }
}

SolveScreen.propTypes = {
  completeActiveTask: PropTypes.func,
  activeTask: PropTypes.shape({
    id: PropTypes.string,
    imageSVG: PropTypes.string
  }),
  possibleItems: PropTypes.arrayOf(
    PropTypes.shape({
      imageSVG: PropTypes.string,
      good: PropTypes.bool,
      onSelection: PropTypes.func,
      weighting: PropTypes.number
    })
  )
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
