import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { getCompletedTasks } from "../../../state/tasks";
import TextContainer from "../../atoms/Containers/TextContainer";

const TaskMap = ({ completedTasks, animateMap }) => {
  return (
    <TextContainer>
      {animateMap ? (
        <h1>SUPER COOL MAP IS PANNING AND ZOOMING...</h1>
      ) : (
        <Fragment>
          <h2>THIS IS A SUPER COOL MAP</h2>
          <h3>Complete Tasks: [{completedTasks.join(", ").toString()} ]</h3>
        </Fragment>
      )}
    </TextContainer>
  );
};

TaskMap.propTypes = {
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  animateMap: PropTypes.bool
};

const mapStateToProps = state => ({
  completedTasks: getCompletedTasks(state)
});

export default connect(mapStateToProps)(TaskMap);
