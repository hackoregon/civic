import React, { memo, useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { goToNextChapter } from "../../../state/chapters";
import { getActiveTaskData } from "../../../state/tasks";
import ChooseScreen from "./ChooseScreen";
import SolveScreen from "./SolveScreen";

const TaskScreen = ({ activeTask, endChapter }) => {
  // Prevent calling useEffect again with 2nd argument so timer isn't deleted
  useEffect(() => {
    const taskChapterTimer = setTimeout(
      endChapter,
      60 * 1000 /* end chapter after 1 minute */
    );

    return () => {
      clearTimeout(taskChapterTimer);
    };
  }, []);

  return activeTask ? <SolveScreen /> : <ChooseScreen />;
};

TaskScreen.propTypes = {
  activeTask: PropTypes.shape({}),
  endChapter: PropTypes.func
};

const mapStateToProps = state => ({
  activeTask: getActiveTaskData(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter() {
    dispatch(goToNextChapter());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreen));
