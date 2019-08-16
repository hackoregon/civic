import React, { memo, useEffect, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { goToNextChapter } from "../../../state/chapters";
import { getActiveTaskData } from "../../../state/tasks";
import ChooseScreen from "./ChooseScreen";
import SolveScreen from "./SolveScreen";
import DurationBar from "../../atoms/DurationBar";
import Ticker from "../../atoms/Ticker";

const mapAndInfoStyle = css`
  position: relative;
  display: grid;
  overflow: hidden;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  background: beige;
`;

const TaskScreen = ({ activeTask, endChapter }) => {
  // Prevent calling useEffect again with 2nd argument so timer isn't deleted
  // useEffect(() => {
  //   const taskChapterTimer = setTimeout(
  //     endChapter,
  //     60 * 1000 /* end chapter after 1 minute */
  //   );

  //   return () => {
  //     clearTimeout(taskChapterTimer);
  //   };
  // }, []);

  // return activeTask ? <SolveScreen /> : <ChooseScreen />;

  // const possibleItems = activeTask ? playerKitItems : weightedTasks;
  // const frozenOrbInterface = !activeTask;
  // const onOrbSelection = activeTask ? this.onItemSelection : this.onTaskSelection;

  return (
    <Fragment>
      <div css={mapAndInfoStyle}>
        <SolveScreen activeTask={activeTask} open={!!activeTask} />
        <ChooseScreen
          activeTask={activeTask}
          interactive={!activeTask}
        />
      </div>
      <DurationBar step="Choose a task" debug />
      <Ticker text="Ticker tape text that goes across the screen to give instructions" />
      {/* <OrbManager
        possibleItems={possibleItems}
        onOrbSelection={onOrbSelection}
        frozenOrbInterface={frozenOrbInterface}
      /> */}
    </Fragment>
  );
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
