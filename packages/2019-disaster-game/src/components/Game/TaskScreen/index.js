/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { useState, useEffect, useCallback, memo, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Timer from "../../../utils/timer";
import { goToNextChapter } from "../../../state/chapters";
import {
  startChapterAndPhaseTimers,
  finishSolveTaskEarly as _finishSolveTaskEarly,
  getTaskPhase,
  getActiveTask,
  taskPhaseKeys,
  getEndingChapter
} from "../../../state/tasks";
import { getPlayerKit } from "../../../state/kit";
import usePrevious from "../../../state/hooks/usePrevious";
import { palette } from "../../../constants/style";
import MatchLockInterface from "../../atoms/MatchLockInterface";
import RestartModal from "../../atoms/RestartModal";
import HelpOthersIntroModal from "./modals/HelpOthersIntroModal";
import ChosenTaskModal from "./modals/ChosenTaskModal";
import SuccessfulCompleteTaskModal from "./modals/SuccessfulCompleteTaskModal";
import NeedRequiredItemModal from "./modals/NeedRequiredItemModal";
import ShowCorrectItemModal from "./modals/ShowCorrectItemModal";
import SolveScreen from "./SolveScreen";
import ChooseTaskScreen from "./ChooseTaskScreen";
import NewBadge from "../../atoms/NewBadge";

const screenLayout = css`
  position: relative;
  height: 100%;
`;

const slide = keyframes`
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
`;

const bg = css`
  animation: ${slide} 6s ease-in-out infinite alternate;
  background-image: linear-gradient(
    -60deg,
    ${palette.lightLime} 50%,
    ${palette.lemon} 50%
  );
  bottom: 0;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
`;

const bg2 = css`
  animation-direction: alternate-reverse;
  animation-duration: 8s;
`;

const bg3 = css`
  animation-duration: 10s;
`;

const TaskScreenContainer = ({
  init,
  finishSolveTaskEarly,
  taskPhase,
  activeTask,
  playerKit,
  restartGame,
  endingChapter,
  endChapter
}) => {
  const [solveScreenOpen, setSolveScreenOpen] = useState(true);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [shouldEndChapter, setShouldEndChapter] = useState(false);
  const prevShowRestart = usePrevious(showRestartModal);
  const {
    SOLVING_SAVE_YOURSELF,
    SOLVING_SAVE_OTHERS,
    MODAL_SAVE_OTHERS_INTRO,
    CHOOSE_TASK,
    MODAL_CHOSEN_TASK,
    MODAL_SOLVED_TASK,
    MODAL_UNSOLVED_TASK,
    MODAL_NO_ITEM,
    MODAL_BADGE_EARNED
  } = taskPhaseKeys;
  const [restartTimer] = useState(new Timer());

  // Start chapter timer and phase timer
  useEffect(init, []);

  // End chapter
  useEffect(() => {
    if (endingChapter) {
      setShouldEndChapter(true);
    }
  }, [endingChapter, endChapter]);

  useEffect(() => {
    const hasSeenSolvingResults = taskPhase === CHOOSE_TASK;
    if (hasSeenSolvingResults && shouldEndChapter) {
      endChapter();
    }
  }, [CHOOSE_TASK, endChapter, shouldEndChapter, taskPhase]);

  /*
    Phase: Change to solving
      - open solving screen
  */
  useEffect(() => {
    const phasesToBeOpenFor = [
      SOLVING_SAVE_YOURSELF,
      SOLVING_SAVE_OTHERS,
      MODAL_SOLVED_TASK,
      MODAL_UNSOLVED_TASK,
      MODAL_NO_ITEM
    ];
    const shouldBeOpen = phasesToBeOpenFor.indexOf(taskPhase) > -1;
    setSolveScreenOpen(shouldBeOpen);
  }, [
    MODAL_NO_ITEM,
    MODAL_SOLVED_TASK,
    MODAL_UNSOLVED_TASK,
    SOLVING_SAVE_OTHERS,
    SOLVING_SAVE_YOURSELF,
    taskPhase
  ]);

  /*
    Phase: Change to solving save others, but don't have required item
      - finish task early
  */
  useEffect(() => {
    if (taskPhase === SOLVING_SAVE_OTHERS) {
      const requiredItemId = activeTask.requiredItem;
      const hasRequiredItem = !!playerKit[requiredItemId];
      if (!hasRequiredItem) {
        finishSolveTaskEarly(10);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SOLVING_SAVE_OTHERS, finishSolveTaskEarly, playerKit, taskPhase]);

  /* RESTART MODAL TIMER
    After 10s, restart the game unless the cancel callback is called in the RestartModal
  */
  const startRestartTimer = useCallback(() => {
    restartTimer.setDuration(10);
    restartTimer.addCompleteCallback(() => {
      restartGame();
    });
    restartTimer.start();
  }, [restartGame, restartTimer]);

  // Auto restart when showing modal after x time passed
  useEffect(() => {
    if (showRestartModal && prevShowRestart !== showRestartModal) {
      startRestartTimer();
    }
  }, [prevShowRestart, showRestartModal, startRestartTimer]);

  const cancelRestart = () => {
    restartTimer.reset();
    setShowRestartModal(false);
  };

  const noInteractionCallback = () => {
    setShowRestartModal(true);
  };

  const showHelpOthersIntroModal = taskPhase === MODAL_SAVE_OTHERS_INTRO;
  const showChosenTaskModal = taskPhase === MODAL_CHOSEN_TASK;
  const showSuccessfulCompleteTaskModal = taskPhase === MODAL_SOLVED_TASK;
  const showNeedRequiredItemModal = taskPhase === MODAL_NO_ITEM;
  const showShowCorrectItemModal = taskPhase === MODAL_UNSOLVED_TASK;
  const showBadgeEarned = taskPhase === MODAL_BADGE_EARNED;

  let interfaceMessage = "";

  if (taskPhase === SOLVING_SAVE_YOURSELF && activeTask) {
    interfaceMessage = activeTask.saveYourselfClue;
  } else if (taskPhase === SOLVING_SAVE_OTHERS && activeTask) {
    interfaceMessage = activeTask.clue;
  } else if (taskPhase === CHOOSE_TASK) {
    interfaceMessage = "Who should we help next?";
  }

  return (
    <Fragment>
      {showHelpOthersIntroModal && <HelpOthersIntroModal />}
      {showChosenTaskModal && <ChosenTaskModal />}
      {showSuccessfulCompleteTaskModal && <SuccessfulCompleteTaskModal />}
      {showNeedRequiredItemModal && <NeedRequiredItemModal />}
      {showShowCorrectItemModal && <ShowCorrectItemModal />}
      {showRestartModal && (
        <RestartModal cancelRestart={cancelRestart} restartGame={restartGame} />
      )}
      {showBadgeEarned && <NewBadge />}
      <div css={screenLayout}>
        <SolveScreen open={solveScreenOpen} activeTask={activeTask} />
        <ChooseTaskScreen />
        <div css={bg} />
        <div css={[bg, bg2]} />
        <div css={[bg, bg3]} />
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
  init: PropTypes.func,
  finishSolveTaskEarly: PropTypes.func,
  taskPhase: PropTypes.oneOf([...Object.values(taskPhaseKeys)]),
  playerKit: PropTypes.shape({}),
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
  }),
  restartGame: PropTypes.func,
  endingChapter: PropTypes.bool,
  endChapter: PropTypes.func
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTask(state),
  playerKit: getPlayerKit(state),
  endingChapter: getEndingChapter(state)
});

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(startChapterAndPhaseTimers, dispatch),
  finishSolveTaskEarly: bindActionCreators(_finishSolveTaskEarly, dispatch),
  endChapter: bindActionCreators(goToNextChapter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreenContainer));
