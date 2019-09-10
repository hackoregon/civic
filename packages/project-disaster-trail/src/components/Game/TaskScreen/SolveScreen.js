/** @jsx jsx */
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { css, jsx } from "@emotion/core";

import { completeTask, getActiveTaskData } from "../../../state/tasks";
import { getKitCreationItems } from "../../../state/kit";

const SolveScreen = ({
  correctItemsChosen,
  completeActiveTask,
  activeTask,
  open
}) => {
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
    background-image: url(${activeTask ? activeTask.sceneSVG : null});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
  `;

  return (
    <div
      css={css`
        ${screenLayout}
        ${open ? onScreenStyle : {}}
      `}
    >
      {activeTask && (
        <div css={taskImage}>
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
        </div>
      )}
    </div>
  );
};

SolveScreen.propTypes = {
  completeActiveTask: PropTypes.func,
  activeTask: PropTypes.shape({
    id: PropTypes.string,
    imageSVG: PropTypes.string
  }),
  open: PropTypes.bool,
  correctItemsChosen: PropTypes.number
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
