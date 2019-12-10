/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getActiveTask } from "../../../state/newTasks";
import RequiredItemsOrbs from "./RequiredItemsOrbs";

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
  transition: transform 1s;
`;

const onScreenStyle = css`
  transform: translateY(0%);
`;

const requiredItemsStyle = css`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const SolveScreen = ({ activeTask, open }) => {
  const taskImageGenerator = currentTask => {
    if (currentTask) {
      return css`
        background-image: url(${currentTask.sceneSVG});
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
        width: 100%;
      `;
    }
    return null;
  };

  const [taskImageCSS, setTaskImageCss] = useState(
    taskImageGenerator(activeTask)
  );

  // When the task changes, update the image
  useEffect(() => {
    if (activeTask) {
      setTaskImageCss(taskImageGenerator(activeTask));
    }
  }, [activeTask]);

  return (
    <div
      css={css`
        ${screenLayout}
        ${open ? onScreenStyle : {}}
      `}
    >
      <div css={taskImageCSS} />
      {activeTask && (
        <RequiredItemsOrbs
          css={requiredItemsStyle}
          numberRequiredItems={activeTask.numberItemsToSolve}
          correctItemsChosen={activeTask.numberCorrectChosen} // TODO
          requiredItem={activeTask.requiredItem}
        />
      )}
    </div>
  );
};

SolveScreen.propTypes = {
  activeTask: PropTypes.shape({}),
  open: PropTypes.bool
};

const mapStateToProps = state => ({
  activeTask: getActiveTask(state)
});

export default connect(mapStateToProps)(SolveScreen);
