import React, { useState, useEffect, useCallback, memo, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Timer from "../../../utils/timer";
import { goToNextChapter } from "../../../state/chapters";
import {
  getTaskPhase,
  getActiveTaskData,
  getActiveTaskIndex,
  getWeightedTasks,
  goToNextTaskPhase,
  getActiveEnvironment,
  getTasksForEnvironment,
  addTask,
  completeTask,
  getSaveYourselfCompleted
} from "../../../state/tasks";
import { addBadge, getHeroBadge, addSaved } from "../../../state/user";
import { getPlayerKit } from "../../../state/kit";
import usePrevious from "../../../state/hooks/usePrevious";
import {
  playTheme as _playTheme,
  stopTheme as _stopTheme,
  stopAllTaskAudio as _stopAllTaskAudio
} from "../../../state/sfx";
import { SOLVING, VOTING, MOVING_MAP } from "../../../constants/actions";
import { TYPES as SFX_TYPES } from "../../../constants/sfx";
import NewBadge from "../../atoms/NewBadge";
import { chooseRandomTask } from "./voteUtils";
import TaskScreen from "./TaskScreen";

const chapterDuration = 120;
const votingDuration = 15;
const mapTransitionDuration = 3;

const taskVotesDefault = {
  mostVotesId: null,
  mostVotesTotal: 0,
  totalVotes: 0
};

const TaskScreenContainer = ({
  activeTaskIndex,
  taskPhase,
  activeTask,
  goToNextPhase,
  saveYourselfCompleted,
  endChapter,
  completeActiveTask,
  latestHeroBadge,
  addNextTask,
  tasksForEnvironment,
  activeEnvironment,
  addHeroBadge,
  addToSaved,
  playerKit,
  restartGame,
  playTheme,
  stopTheme,
  stopAllTaskAudio
}) => {
  const [shouldEndChapter, setShouldEndChapter] = useState(false);
  const [displayedFinalBadge, setDisplayedFinalBadge] = useState(false);
  const [displayBadge, setDisplayBadge] = useState(false);
  const [isAnimatingToNextPhase, setIsAnimatingToNextPhase] = useState(null);
  const [taskVotes, setTaskVotes] = useState(taskVotesDefault);
  const [correctItemsChosen, setCorrectItemsChosen] = useState(0);
  const [doVoteCallback, setDoVoteCallback] = useState(false);
  const [finishedFinalSolvePhase, setFinishedFinalSolvePhase] = useState(false);
  const [audioDelay] = useState(new Timer());
  const [chapterTimer] = useState(new Timer());
  const [phaseTimer] = useState(new Timer());
  const [animationTimer] = useState(new Timer());
  // Track previous values
  const prevActiveTaskIndex = usePrevious(activeTaskIndex);
  const prevTaskPhase = usePrevious(taskPhase);
  const prevHeroBadgeAcquired = usePrevious(latestHeroBadge);

  const onTaskSelection = orbModel => {
    const voteCount = taskVotes[orbModel.type]
      ? taskVotes[orbModel.type] + 1
      : 1;
    const newVotes = {
      ...taskVotes,
      totalVotes: taskVotes.totalVotes + 1,
      [orbModel.type]: voteCount
    };
    if (voteCount > taskVotes.mostVotesTotal) {
      newVotes.mostVotesId = orbModel.type;
      newVotes.mostVotesTotal = voteCount;
    }
    setTaskVotes(newVotes);
    // Return true so Orb knows how to animate
    return true;
  };

  /* METHODS */
  const votingCallback = useCallback(() => {
    const mostVotes = taskVotes.mostVotesTotal;
    let { mostVotesId } = taskVotes;
    if (mostVotes < 1) {
      mostVotesId = chooseRandomTask(tasksForEnvironment, activeEnvironment);
    }
    addNextTask(mostVotesId);
  }, [activeEnvironment, addNextTask, taskVotes, tasksForEnvironment]);

  const solveCallback = () => {
    setCorrectItemsChosen(0);
    setDisplayBadge(false);
    if (shouldEndChapter && taskPhase === SOLVING) {
      setFinishedFinalSolvePhase(true);
    }
  };

  const moveMapCallback = () => {
    setTaskVotes(taskVotesDefault);
  };

  const defaultCompleteSolvingAnimationDuration = 1;
  const badgeEarnedAnimationDuration = 5;

  const earlyFinishTask = () => {
    setIsAnimatingToNextPhase(false);
    solveCallback();
    animationTimer.reset();
    goToNextPhase(true);
  };

  const onCompleteActiveTask = earnedBadge => {
    const animationDuration = earnedBadge
      ? badgeEarnedAnimationDuration
      : defaultCompleteSolvingAnimationDuration;

    setIsAnimatingToNextPhase(true);
    completeActiveTask(activeTask);
    if (saveYourselfCompleted) {
      addToSaved(activeTask, saveYourselfCompleted);
    }
    phaseTimer.stop();
    // Allow time to complete the animation
    animationTimer.setDuration(animationDuration);
    animationTimer.addCompleteCallback(() => {
      earlyFinishTask();
    });
    animationTimer.start();
  };

  /* TIMERS */
  const startTimer = useCallback(
    (duration, taskWasCompleted, callback) => {
      phaseTimer.reset();
      phaseTimer.setDuration(duration);
      phaseTimer.addCompleteCallback(() => {
        if (displayedFinalBadge) {
          endChapter();
        }
        if (shouldEndChapter && taskPhase === SOLVING) {
          setFinishedFinalSolvePhase(true);
        } else if (!isAnimatingToNextPhase) {
          if (callback) callback();
          goToNextPhase(taskWasCompleted);
        }
      });
      phaseTimer.start();
    },
    [
      displayedFinalBadge,
      endChapter,
      goToNextPhase,
      isAnimatingToNextPhase,
      phaseTimer,
      shouldEndChapter,
      taskPhase
    ]
  );

  // Callback must be triggered after state update
  useEffect(() => {
    if (doVoteCallback === true) {
      votingCallback();
      setDoVoteCallback(false);
    }
  }, [doVoteCallback, votingCallback]);

  // Timer: For whole task chapter
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => {
      setShouldEndChapter(true);
      addHeroBadge("hero", "earthquakeHeroBadge");
    });
    chapterTimer.start();
    playTheme(SFX_TYPES.THEME_TASKS);

    return () => {
      chapterTimer.stop();
      phaseTimer.stop();
      animationTimer.stop();
      audioDelay.stop();
      stopTheme(SFX_TYPES.THEME_TASKS);
      stopTheme(SFX_TYPES.TASKS_VOTE_INSTRUCTION);
      stopTheme(SFX_TYPES.TASKS_MOTIVATE);
      stopAllTaskAudio();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startQuestionAudioDelay = () => {
    audioDelay.reset();
    audioDelay.setDuration(4);
    audioDelay.addCompleteCallback(() => {
      playTheme(SFX_TYPES[activeTask.audioQuestion]);
    });
    audioDelay.start();
  };

  // Timer: on game phase change
  useEffect(() => {
    const onDifferentPhase = prevTaskPhase !== taskPhase;
    const onNextSaveYourself =
      !saveYourselfCompleted && activeTaskIndex > prevActiveTaskIndex;
    const switchedToSolving = onDifferentPhase && taskPhase === SOLVING;

    // Do same thing when going to next save yourself task or a new save others task
    if (onNextSaveYourself || switchedToSolving) {
      startTimer(activeTask.time, true, solveCallback);
      playTheme(SFX_TYPES[activeTask.audioInstruction]);
      startQuestionAudioDelay();
    } else if (onDifferentPhase) {
      if (taskPhase === VOTING) {
        startTimer(votingDuration, false, () => {
          setDoVoteCallback(true);
        });
        playTheme(SFX_TYPES.TASKS_VOTE_INSTRUCTION);
      }
      if (taskPhase === MOVING_MAP) {
        startTimer(mapTransitionDuration, false, moveMapCallback);
        playTheme(SFX_TYPES.TASKS_MOTIVATE);
      }
    }
  }, [taskPhase, activeTaskIndex, prevActiveTaskIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // If the player just acquired a hero badge, delay ending the solve screen to show new badge
  useEffect(() => {
    const earnedNewHeroBadge =
      latestHeroBadge &&
      prevHeroBadgeAcquired !== latestHeroBadge &&
      !shouldEndChapter;
    const earnedFinalBadge = shouldEndChapter && finishedFinalSolvePhase;

    if (earnedNewHeroBadge || earnedFinalBadge) {
      setDisplayBadge(true);
    }
    if (earnedFinalBadge) {
      setDisplayedFinalBadge(true);
      startTimer(8, false);
    }
  }, [
    endChapter,
    finishedFinalSolvePhase,
    phaseTimer,
    shouldEndChapter,
    startTimer,
    taskPhase,
    latestHeroBadge,
    prevHeroBadgeAcquired
  ]);

  const correctItem = activeTask && activeTask.requiredItem;
  const playerHasCorrectItemInKit = !!(activeTask && playerKit[correctItem]);

  return (
    <Fragment>
      {displayBadge && <NewBadge type="hero" />}
      <TaskScreen
        mapTransitionDuration={mapTransitionDuration}
        completeActiveTask={onCompleteActiveTask}
        correctItemsChosen={correctItemsChosen}
        setCorrectItemsChosen={setCorrectItemsChosen}
        taskVotes={taskVotes}
        onTaskSelection={onTaskSelection}
        playerHasCorrectItemInKit={playerHasCorrectItemInKit}
        earlyFinishTask={earlyFinishTask}
        restartGame={restartGame}
        isDisplayingBadge={displayBadge}
      />
    </Fragment>
  );
};

TaskScreenContainer.propTypes = {
  taskPhase: PropTypes.oneOf([SOLVING, VOTING, MOVING_MAP]),
  activeTask: PropTypes.shape({}),
  activeTaskIndex: PropTypes.number,
  endChapter: PropTypes.func,
  goToNextPhase: PropTypes.func,
  addNextTask: PropTypes.func,
  completeActiveTask: PropTypes.func,
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({}),
  saveYourselfCompleted: PropTypes.bool,
  addHeroBadge: PropTypes.func,
  addToSaved: PropTypes.func,
  playerKit: PropTypes.shape({}),
  latestHeroBadge: PropTypes.oneOf([PropTypes.shape({}), null]),
  restartGame: PropTypes.func,
  playTheme: PropTypes.func,
  stopTheme: PropTypes.func,
  stopAllTaskAudio: PropTypes.func
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTaskData(state),
  activeTaskIndex: getActiveTaskIndex(state),
  weightedTasks: getWeightedTasks(state),
  playerKit: getPlayerKit(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state),
  latestHeroBadge: getHeroBadge(state),
  saveYourselfCompleted: getSaveYourselfCompleted(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter: bindActionCreators(goToNextChapter, dispatch),
  goToNextPhase: bindActionCreators(goToNextTaskPhase, dispatch),
  addNextTask: bindActionCreators(addTask, dispatch),
  completeActiveTask: bindActionCreators(completeTask, dispatch),
  addHeroBadge: bindActionCreators(addBadge, dispatch),
  addToSaved: bindActionCreators(addSaved, dispatch),
  playTheme: bindActionCreators(_playTheme, dispatch),
  stopTheme: bindActionCreators(_stopTheme, dispatch),
  stopAllTaskAudio: bindActionCreators(_stopAllTaskAudio, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreenContainer));
