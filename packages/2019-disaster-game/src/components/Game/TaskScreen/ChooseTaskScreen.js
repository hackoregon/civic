/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAllTasks } from "../../../state/tasks";
import { palette } from "../../../constants/style";

const screenLayout = css`
  position: absolute;
  left: 0;
  display: grid;
  overflow: hidden;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  z-index: 1;
  align-items: center;
  justify-items: center;
  padding-top: 110px;
`;

const imageHeight = 235;

const tasksGrid = css`
  display: grid;
  grid-template-columns: repeat(5, ${160 + imageHeight}px);
  justify-items: center;
  height: fit-content;
  grid-row-gap: 80px;
`;

const taskImage = css`
  height: ${imageHeight}px;
`;

const taskLabel = css`
  font-size: 58px;
  line-height: 80px;
  font-weight: bold;
  margin: 0;
  max-width: 250px;
  text-align: center;
  margin-top: 20px;
  font-family: "Akkurat", sans-serif;
  color: ${palette.darkGrey};
`;

const createTaskRows = tasks => {
  const taskKeys = Object.keys(tasks);

  return (
    <div css={tasksGrid}>
      {taskKeys.map(key => {
        const task = tasks[key];
        return (
          <div key={task.id}>
            <img src={task.imageSVG} alt={task.imageAlt} css={taskImage} />
            <p css={taskLabel}>{task.imageLabel}</p>
          </div>
        );
      })}
    </div>
  );
};

const ChooseTaskScreen = ({ tasks }) => {
  return <div css={screenLayout}>{createTaskRows(tasks)}</div>;
};

ChooseTaskScreen.propTypes = {
  tasks: PropTypes.shape({})
};

const mapStateToProps = state => ({
  tasks: getAllTasks(state)
});

export default connect(mapStateToProps)(ChooseTaskScreen);
