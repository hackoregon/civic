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
  showEndChapterSequence as _showEndChapterSequence,
  choseCorrectItemForTask as _choseCorrectItemForTask,
  chooseTask as _chooseTask,
  getTaskPhase,
  getActiveTask,
  taskPhaseKeys,
  getEndingChapter,
  getFinalBadgeShown,
  getActiveTaskIndex,
  getWeightedTasks
} from "../../../state/tasks";
import {
  playAudio as _playAudio,
  stopAudio as _stopAudio,
  stopAllTaskAudio as _stopAllTaskAudio
} from "../../../state/sfx";
import { TYPES as SFX_TYPES } from "../../../constants/sfx";
import { getPlayerKit, getPlayerKitItems } from "../../../state/kit";
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
  endChapter,
  showEndChapterSequence,
  finalBadgeShown,
  playAudio,
  stopAudio,
  stopAllTaskAudio,
  activeTaskIndex,
  weightedPlayerKitItems,
  weightedTasks,
  choseCorrectItemForTask,
  chooseTask
}) => {
  const [solveScreenOpen, setSolveScreenOpen] = useState(true);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [shouldEndChapter, setShouldEndChapter] = useState(false);
  const prevShowRestart = usePrevious(showRestartModal);
  const prevTaskPhase = usePrevious(taskPhase);
  const prevActiveTaskIndex = usePrevious(activeTaskIndex);
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
  const [audioDelay] = useState(new Timer());

  // Start chapter timer and phase timer
  useEffect(() => {
    init();
    playAudio(SFX_TYPES.THEME_TASKS);

    return () => {
      audioDelay.stop();
      stopAudio(SFX_TYPES.THEME_TASKS);
      stopAudio(SFX_TYPES.TASKS_VOTE_INSTRUCTION);
      stopAudio(SFX_TYPES.TASKS_MOTIVATE);
      stopAllTaskAudio();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // End chapter
  useEffect(() => {
    if (endingChapter) {
      setShouldEndChapter(true);
    }
  }, [endingChapter, endChapter]);

  useEffect(() => {
    const hasSeenSolvingResults = taskPhase === CHOOSE_TASK;
    if (finalBadgeShown) {
      stopAllTaskAudio();
      endChapter();
    } else if (hasSeenSolvingResults && shouldEndChapter) {
      showEndChapterSequence();
    }
  }, [
    CHOOSE_TASK,
    endChapter,
    finalBadgeShown,
    shouldEndChapter,
    showEndChapterSequence,
    stopAllTaskAudio,
    taskPhase
  ]);

  // Sounds
  const startQuestionAudioDelay = useCallback(() => {
    audioDelay.reset();
    audioDelay.setDuration(4);
    audioDelay.addCompleteCallback(() => {
      if (!finalBadgeShown) playAudio(SFX_TYPES[activeTask.audioQuestion]);
    });
    audioDelay.start();
  }, [activeTask, audioDelay, finalBadgeShown, playAudio]);

  /*
    Phase: Change to solving
      - play audio
  */
  useEffect(() => {
    const onDifferentPhase = prevTaskPhase !== taskPhase;
    const isSolvingPhase =
      taskPhase === SOLVING_SAVE_YOURSELF || taskPhase === SOLVING_SAVE_OTHERS;
    const onNextSaveYourself = activeTaskIndex > prevActiveTaskIndex;

    if (!finalBadgeShown) {
      if (isSolvingPhase && onNextSaveYourself) {
        playAudio(SFX_TYPES[activeTask.audioInstruction]);
        startQuestionAudioDelay();
      } else if (onDifferentPhase) {
        if (taskPhase === CHOOSE_TASK && !endingChapter) {
          playAudio(SFX_TYPES.TASKS_VOTE_INSTRUCTION);
        } else if (taskPhase === MODAL_CHOSEN_TASK) {
          playAudio(SFX_TYPES.TASKS_MOTIVATE);
        }
      }
    }
  }, [
    CHOOSE_TASK,
    MODAL_CHOSEN_TASK,
    SOLVING_SAVE_OTHERS,
    SOLVING_SAVE_YOURSELF,
    activeTask,
    activeTaskIndex,
    endingChapter,
    finalBadgeShown,
    playAudio,
    prevActiveTaskIndex,
    prevTaskPhase,
    startQuestionAudioDelay,
    taskPhase
  ]);

  /*
    Phase: Change to solving or related modal
      - open solving screen & leave open
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
      if (!shouldEndChapter) {
        restartGame();
      }
    });
    restartTimer.start();
  }, [restartGame, restartTimer, shouldEndChapter]);

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

  const onTaskSelection = orbModel => {
    chooseTask(orbModel.type);
    // Return true so Orb knows how to animate
    return true;
  };

  const onItemSelection = orbModel => {
    if (orbModel.type === activeTask.requiredItem) {
      choseCorrectItemForTask(activeTask);
      return true;
    }
    return false;
  };

  const showHelpOthersIntroModal = taskPhase === MODAL_SAVE_OTHERS_INTRO;
  const showChosenTaskModal = taskPhase === MODAL_CHOSEN_TASK;
  const showSuccessfulCompleteTaskModal = taskPhase === MODAL_SOLVED_TASK;
  const showNeedRequiredItemModal = taskPhase === MODAL_NO_ITEM;
  const showShowCorrectItemModal = taskPhase === MODAL_UNSOLVED_TASK;
  const showBadgeEarned = taskPhase === MODAL_BADGE_EARNED;

  let interfaceMessage = "";
  let possibleItems = [];
  let onOrbSelection = onItemSelection;
  let checkItemIsCorrect = orbModel =>
    !!activeTask && activeTask.requiredItem === orbModel.type;

  /* eslint-disable no-return-assign */
  if (taskPhase === SOLVING_SAVE_YOURSELF && activeTask) {
    interfaceMessage = activeTask.saveYourselfClue;
    possibleItems = weightedPlayerKitItems.map(
      // eslint-disable-next-line no-param-reassign
      item => ({
        ...item,
        good: activeTask.requiredItem === item.id
      })
    );
  } else if (taskPhase === SOLVING_SAVE_OTHERS && activeTask) {
    interfaceMessage = activeTask.clue;
    possibleItems = weightedPlayerKitItems.map(
      // eslint-disable-next-line no-param-reassign
      item => {
        return {
          ...item,
          good: activeTask.requiredItem === item.id
        };
      }
    );
  } else if (taskPhase === CHOOSE_TASK) {
    interfaceMessage = "Who should we help next?";
    possibleItems = weightedTasks;
    onOrbSelection = onTaskSelection;
    checkItemIsCorrect = () => {
      return true;
    };
  }
  /* eslint-enable no-return-assign */

  return (
    <Fragment>
      {showHelpOthersIntroModal && <HelpOthersIntroModal />}
      {showChosenTaskModal && <ChosenTaskModal />}
      {showSuccessfulCompleteTaskModal && <SuccessfulCompleteTaskModal />}
      {showNeedRequiredItemModal && <NeedRequiredItemModal />}
      {showShowCorrectItemModal && <ShowCorrectItemModal />}
      {showRestartModal && !shouldEndChapter && (
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
        requiredItem={activeTask ? activeTask.requiredItem : null}
        possibleItems={possibleItems}
        onOrbSelection={onOrbSelection}
        checkItemIsCorrect={checkItemIsCorrect}
        activeScreen={taskPhase}
        screensForOrbDisplay={[
          SOLVING_SAVE_YOURSELF,
          SOLVING_SAVE_OTHERS,
          CHOOSE_TASK
        ]}
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
    audioInstruction: PropTypes.string,
    audioQuestion: PropTypes.string,
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
  endChapter: PropTypes.func,
  showEndChapterSequence: PropTypes.func,
  finalBadgeShown: PropTypes.bool,
  playAudio: PropTypes.func,
  stopAudio: PropTypes.func,
  stopAllTaskAudio: PropTypes.func,
  activeTaskIndex: PropTypes.number,
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({})),
  weightedPlayerKitItems: PropTypes.arrayOf(PropTypes.shape({})),
  choseCorrectItemForTask: PropTypes.func,
  chooseTask: PropTypes.func
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTask(state),
  playerKit: getPlayerKit(state),
  endingChapter: getEndingChapter(state),
  finalBadgeShown: getFinalBadgeShown(state),
  activeTaskIndex: getActiveTaskIndex(state),
  weightedTasks: getWeightedTasks(state),
  weightedPlayerKitItems: getPlayerKitItems(state)
});

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(startChapterAndPhaseTimers, dispatch),
  finishSolveTaskEarly: bindActionCreators(_finishSolveTaskEarly, dispatch),
  showEndChapterSequence: bindActionCreators(_showEndChapterSequence, dispatch),
  endChapter: bindActionCreators(goToNextChapter, dispatch),
  playAudio: bindActionCreators(_playAudio, dispatch),
  stopAudio: bindActionCreators(_stopAudio, dispatch),
  stopAllTaskAudio: bindActionCreators(_stopAllTaskAudio, dispatch),
  choseCorrectItemForTask: bindActionCreators(
    _choseCorrectItemForTask,
    dispatch
  ),
  chooseTask: bindActionCreators(_chooseTask, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreenContainer));
