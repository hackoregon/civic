/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getActiveTaskData } from "../../../state/tasks";

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

const SolveScreen = ({ activeTask, activeTaskIndex, open }) => {
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
  }, [activeTaskIndex, activeTask]);

  return (
    <div
      css={css`
        ${screenLayout}
        ${open ? onScreenStyle : {}}
      `}
    >
      <div css={taskImageCSS} />
    </div>
  );
};

SolveScreen.propTypes = {
  activeTaskIndex: PropTypes.number,
  activeTask: PropTypes.shape({}),
  open: PropTypes.bool
};

const mapStateToProps = state => ({
  activeTask: getActiveTaskData(state)
});

export default connect(mapStateToProps)(SolveScreen);
