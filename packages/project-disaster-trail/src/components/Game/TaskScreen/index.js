import React, { memo } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import ChooseScreen from "./ChooseScreen";
import SolveScreen from "./SolveScreen";
import { getActiveTask, getActiveTaskData } from "../../../state/tasks";

const TaskScreen = ({ activeTask }) => {
  return activeTask ? <SolveScreen /> : <ChooseScreen />;
};

TaskScreen.propTypes = {
  activeTask: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeTaskId: getActiveTask(state),
  activeTask: getActiveTaskData(state)
});

export default connect(mapStateToProps)(memo(TaskScreen));
