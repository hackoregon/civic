/** @jsx jsx */
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";

import ChapterButtons from "../ChapterButtons";
import ChooseScreen from "./ChooseScreen";
import SolveScreen from "./SolveScreen";
import { getActiveTask, getActiveTaskData } from "../../../state/tasks";

const screenLayout = css`
  position: relative;
  display: grid;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  min-height: 650px;
  min-width: 800px;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  background: beige;
`;

const TaskScreen = ({ activeTask }) => {
  return (
    <div css={screenLayout}>
      <ChapterButtons />
      {activeTask ? <SolveScreen /> : <ChooseScreen />}
    </div>
  );
};

TaskScreen.propTypes = {
  activeTask: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeTaskId: getActiveTask(state),
  activeTask: getActiveTaskData(state)
});

export default connect(mapStateToProps)(TaskScreen);
