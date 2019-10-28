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
import { addBadge, getAllBadges } from "../../../state/user";
import { getPlayerKitItems } from "../../../state/kit";
import usePrevious from "../../../state/hooks/usePrevious";
import { SOLVING, VOTING, MOVING_MAP } from "../../../constants/actions";
import NewBadge from "../../atoms/NewBadge";
import { chooseRandomTask } from "./voteUtils";
import TaskScreen from "./TaskScreen";
// Audio
import taskSong from "../../../../assets/audio/HappyTheme2fadeinout.mp3";
import audioVoteInstruction from "../../../../assets/audio/task_screen/boy/who_should_we_help_next.mp3";
import audioVoteMotivate from "../../../../assets/audio/task_screen/boy/lets_go_do_it_enthusiastic.mp3";
import Song from "../../atoms/Audio/Song";

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
  badges,
  addNextTask,
  tasksForEnvironment,
  activeEnvironment,
  addHeroBadge
}) => {
  const [shouldEndChapter, setShouldEndChapter] = useState(false);
  const [displayedFinalBadge, setDisplayedFinalBadge] = useState(false);
  const [displayBadge, setDisplayBadge] = useState(false);
  const [isAnimatingToNextPhase, setIsAnimatingToNextPhase] = useState(null);
  const [taskVotes, setTaskVotes] = useState(taskVotesDefault);
  const [correctItemsChosen, setCorrectItemsChosen] = useState(0);
  const [doVoteCallback, setDoVoteCallback] = useState(false);
  const [
    finishedTaskInstructionalAudio,
    setFinishedTaskInstructionalAudio
  ] = useState(false);
  const [finishedFinalSolvePhase, setFinishedFinalSolvePhase] = useState(false);
  const [chapterTimer] = useState(new Timer());
  const [phaseTimer] = useState(new Timer());
  const [animationTimer] = useState(new Timer());
  // Track previous values
  const prevActiveTaskIndex = usePrevious(activeTaskIndex);
  const prevTaskPhase = usePrevious(taskPhase);
  const prevBadgesAcquired = usePrevious(badges.badgesAcquired);

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
  const badgeEarnedAnimationDuration = 10;

  const onCompleteActiveTask = earnedBadge => {
    const animationDuration = earnedBadge
      ? badgeEarnedAnimationDuration
      : defaultCompleteSolvingAnimationDuration;

    setIsAnimatingToNextPhase(true);
    completeActiveTask(activeTask);
    phaseTimer.stop();
    // Allow time to complete the animation
    animationTimer.setDuration(animationDuration);
    animationTimer.addCompleteCallback(() => {
      setIsAnimatingToNextPhase(false);
      setCorrectItemsChosen(0);
      setDisplayBadge(false);
      animationTimer.reset();
      goToNextPhase(true);
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
    return () => {
      chapterTimer.stop();
      phaseTimer.stop();
      animationTimer.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer: on game phase change
  useEffect(() => {
    const onDifferentPhase = prevTaskPhase !== taskPhase;
    const onNextSaveYourself =
      !saveYourselfCompleted && activeTaskIndex > prevActiveTaskIndex;
    const switchedToSolving = onDifferentPhase && taskPhase === SOLVING;

    // Do same thing when going to next save yourself task or a new save others task
    if (onNextSaveYourself || switchedToSolving) {
      startTimer(activeTask.time, true, solveCallback);
    } else if (onDifferentPhase) {
      if (taskPhase === VOTING) {
        startTimer(votingDuration, false, () => {
          setDoVoteCallback(true);
        });
      }
      if (taskPhase === MOVING_MAP) {
        startTimer(mapTransitionDuration, false, moveMapCallback);
      }
    }
  }, [taskPhase, activeTaskIndex, prevActiveTaskIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // If the player just acquired a hero badge, delay ending the solve screen to show new badge
  useEffect(() => {
    const earnedNewBadge =
      badges.badgesAcquired &&
      prevBadgesAcquired !== badges.badgesAcquired &&
      !shouldEndChapter;
    const earnedFinalBadge = shouldEndChapter && finishedFinalSolvePhase;

    if (earnedNewBadge || earnedFinalBadge) {
      setDisplayBadge(true);
    }
    if (earnedFinalBadge) {
      setDisplayedFinalBadge(true);
      startTimer(5, false);
    }
  }, [
    badges,
    endChapter,
    finishedFinalSolvePhase,
    phaseTimer,
    prevBadgesAcquired,
    shouldEndChapter,
    startTimer,
    taskPhase
  ]);

  // Audio
  const playHowCanIHelp = () => {
    setFinishedTaskInstructionalAudio(true);
  };

  const resetQuestion = () => {
    setFinishedTaskInstructionalAudio(false);
  };

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
      />
      <Song songFile={taskSong} />
      {!shouldEndChapter && taskPhase === VOTING && (
        <Song songFile={audioVoteInstruction} shouldLoop={false} volume={1.0} />
      )}
      {taskPhase === MOVING_MAP && (
        <Song songFile={audioVoteMotivate} shouldLoop={false} volume={1.0} />
      )}
      {taskPhase === SOLVING && (
        <Song
          songFile={activeTask.audioInstruction}
          shouldLoop={false}
          volume={1.0}
          onend={playHowCanIHelp}
        />
      )}
      {/* Hack around to get audio for 2nd save yourself task. Can be done programatically but coding fast */}
      {activeTaskIndex === 1 && (
        <Song
          songFile={activeTask.audioInstruction}
          shouldLoop={false}
          volume={1.0}
          onend={playHowCanIHelp}
        />
      )}
      {/* Task question plays after instructional audio */}
      {!shouldEndChapter && finishedTaskInstructionalAudio && activeTask && (
        <Song
          songFile={activeTask.audioQuestion}
          shouldLoop={false}
          volume={1.0}
          onend={resetQuestion}
        />
      )}
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
  badges: PropTypes.shape({}),
  saveYourselfCompleted: PropTypes.bool,
  addHeroBadge: PropTypes.func
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTaskData(state),
  activeTaskIndex: getActiveTaskIndex(state),
  weightedTasks: getWeightedTasks(state),
  weightedPlayerKitItems: getPlayerKitItems(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state),
  badges: getAllBadges(state),
  saveYourselfCompleted: getSaveYourselfCompleted(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter: bindActionCreators(goToNextChapter, dispatch),
  goToNextPhase: bindActionCreators(goToNextTaskPhase, dispatch),
  addNextTask: bindActionCreators(addTask, dispatch),
  completeActiveTask: bindActionCreators(completeTask, dispatch),
  addHeroBadge: bindActionCreators(addBadge, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreenContainer));
