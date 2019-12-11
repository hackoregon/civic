/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect, memo, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  goToNextTaskPhase as _goToNextTaskPhase,
  getTaskPhase,
  getActiveTask,
  taskPhaseKeys
} from "../../../state/newTasks";
import MatchLockInterface from "../../atoms/MatchLockInterface";
import SolveScreen from "./SolveScreen";

const screenLayout = css`
  position: relative;
  height: 100%;
`;

const TaskScreenContainer = ({
  initializeTaskPhaseTimers,
  taskPhase,
  activeTask
}) => {
  const [solveScreenOpen, setSolveScreenOpen] = useState(true);
  const {
    SOLVING_SAVE_YOURSELF,
    SOLVING_SAVE_OTHERS
    // MODAL_SAVE_OTHERS_INTRO,
    // CHOOSE_TASK
    // MODAL_CHOSEN_TASK,
    // MODAL_SOLVED_TASK,
    // MODAL_UNSOLVED_TASK,
    // MODAL_NO_ITEM
  } = taskPhaseKeys;

  useEffect(initializeTaskPhaseTimers, []);

  /*
    Phase: Change to solving
      - open solving screen
  */
  useEffect(() => {
    const shouldBeOpen =
      taskPhase === SOLVING_SAVE_YOURSELF || taskPhase === SOLVING_SAVE_OTHERS;
    setSolveScreenOpen(shouldBeOpen);
  }, [SOLVING_SAVE_OTHERS, SOLVING_SAVE_YOURSELF, taskPhase]);

  const interfaceMessage = "interfaceMessage";
  const noInteractionCallback = () => {
    console.log("noInteractionCallback");
  };
  const showRestartModal = false;

  return (
    <Fragment>
      <div css={screenLayout}>
        <SolveScreen open={solveScreenOpen} activeTask={activeTask} />
        {/* <VoteMapScreen
          activeTask={activeTask}
          activeTaskIndex={activeTaskIndex}
          tasks={weightedTasks}
          taskVotes={taskVotes}
          mapTransitionDuration={mapTransitionDuration}
        /> */}
      </div>
      <MatchLockInterface
        interfaceMessage={interfaceMessage}
        noInteractionCallback={noInteractionCallback}
        restartNoInteractionTimer={!showRestartModal}
        noInteractionDuration={25}
      />
    </Fragment>
  );
};

TaskScreenContainer.propTypes = {
  initializeTaskPhaseTimers: PropTypes.func,
  taskPhase: PropTypes.oneOf([...Object.values(taskPhaseKeys)]),
  activeTask: PropTypes.shape({
    id: PropTypes.string,
    time: PropTypes.number,
    // audioInstruction: SFX_TYPES.rubbleInstructionBoy,
    // audioQuestion: sample([
    //   SFX_TYPES.rubbleQuestionGirl,
    //   SFX_TYPES.rubbleQuestionBoy
    // ]),
    requiredItem: PropTypes.string,
    numberItemsToSolve: PropTypes.number,
    peopleSavedRange: PropTypes.arrayOf(PropTypes.number),
    petsSaved: PropTypes.number,
    imageSVG: PropTypes.string,
    imageAlt: PropTypes.string,
    sceneSVG: PropTypes.string,
    sceneAlt: PropTypes.string,
    clue: PropTypes.string,
    saveYourselfClue: PropTypes.string,
    completed: PropTypes.bool,
    completedResults: PropTypes.shape({
      people: PropTypes.number,
      pets: PropTypes.number
    })
  })
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTask(state)
});

const mapDispatchToProps = dispatch => ({
  initializeTaskPhaseTimers: bindActionCreators(_goToNextTaskPhase, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreenContainer));
