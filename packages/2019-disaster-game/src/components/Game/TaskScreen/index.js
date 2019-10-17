/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect, useCallback, memo, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

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
  completeTask
} from "../../../state/tasks";
import { getPlayerKitItems } from "../../../state/kit";
import usePrevious from "../../../state/hooks/usePrevious";
import { SOLVING, VOTING, MOVING_MAP } from "../../../constants/actions";
import { chooseRandomTask } from "./voteUtils";

import taskSong from "../../../../assets/audio/HappyTheme2fadeinout.mp3";
import audioVoteInstruction from "../../../../assets/audio/task_screen/boy/who_should_we_help_next.mp3";
import audioVoteMotivate from "../../../../assets/audio/task_screen/boy/lets_go_do_it_enthusiastic.mp3";
import Song from "../../atoms/Audio/Song";

import MatchLockInterface from "../../atoms/MatchLockInterface";
import SolveScreen from "./SolveScreen";
import VoteMapScreen from "./VoteMapScreen";

const screenLayout = css`
  position: relative;
  height: 100%;
`;

const chapterDuration = 120;
const votingDuration = 15;
const mapTransitionDuration = 3;
const taskVotesDefault = {
  mostVotesId: null,
  mostVotesTotal: 0,
  totalVotes: 0
};

const TaskScreen = ({
  endChapter,
  activeTask,
  activeTaskIndex,
  taskPhase,
  goToNextPhase,
  tasksForEnvironment,
  activeEnvironment,
  addNextTask,
  weightedPlayerKitItems,
  weightedTasks,
  completeActiveTask
}) => {
  const [chapterTimer] = useState(new Timer());
  const [phaseTimer] = useState(new Timer());
  const [possibleItems, setPossibleItems] = useState(weightedPlayerKitItems);
  const [taskVotes, setTaskVotes] = useState(taskVotesDefault);
  const [correctItemsChosen, setCorrectItemsChosen] = useState(0);
  const [
    finishedTaskInstructionalAudio,
    setFinishedTaskInstructionalAudio
  ] = useState(false);
  const [solvingTransitionTimeout, setSolvingTransitionTimeout] = useState(
    null
  );
  const [animatingTaskTransition, setAnimatingTaskTransition] = useState(false);
  const prevTaskPhase = usePrevious(taskPhase);

  const goToTask = () => {
    const mostVotes = taskVotes.mostVotesTotal;
    let { mostVotesId } = taskVotes;
    if (mostVotes < 1) {
      mostVotesId = chooseRandomTask(tasksForEnvironment, activeEnvironment);
    }
    addNextTask(mostVotesId);
  };

  const startTimer = useCallback(
    (duration, callback, wasTaskCompleted, items) => {
      phaseTimer.reset();
      phaseTimer.setDuration(duration);
      phaseTimer.addCompleteCallback(() => {
        setPossibleItems(items);
        if (callback) {
          callback();
        }
        if (!animatingTaskTransition) {
          goToNextPhase(wasTaskCompleted);
        }
      });
      phaseTimer.start();
    },
    [phaseTimer, animatingTaskTransition, goToNextPhase]
  );

  // Timer: on chapter start
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const solvingCallback = () => {
    setCorrectItemsChosen(0); // reset chosen items
  };

  const movingMapCallback = () => {
    goToTask();
    setTaskVotes(taskVotesDefault); // reset chosen tasks
  };

  // Timer: on game phase change
  useEffect(() => {
    if (prevTaskPhase !== taskPhase) {
      if (taskPhase === SOLVING) {
        startTimer(activeTask.time, solvingCallback, true, weightedTasks);
      }
      if (taskPhase === VOTING) {
        const newTimeout = setTimeout(() => {
          startTimer(votingDuration, null, null, []);
        }, 1000);
        setSolvingTransitionTimeout(newTimeout);
      }
      if (taskPhase === MOVING_MAP) {
        startTimer(
          mapTransitionDuration,
          movingMapCallback,
          null,
          weightedPlayerKitItems
        );
      }
    }

    return () => {
      phaseTimer.stop();
    };
  }, [taskPhase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer: on switch from one solve task to another solve task (triggers for sequential tasks — save yourself tasks in this case)
  useEffect(() => {
    if (taskPhase === SOLVING && activeTaskIndex === 1) {
      setCorrectItemsChosen(0);
      startTimer(activeTask.time, null, true, weightedTasks);
    }

    return () => {
      phaseTimer.stop();
    };
  }, [activeTaskIndex, taskPhase]); // eslint-disable-line react-hooks/exhaustive-deps

  const setEndSolvingChapterAnimationTimeouts = () => {
    const newTimeout = setTimeout(() => {
      setCorrectItemsChosen(0);
      setAnimatingTaskTransition(false);
      phaseTimer.stopEarly();
    }, 1000);
    setSolvingTransitionTimeout(newTimeout);
  };

  const onItemSelection = orbModel => {
    if (orbModel.type === activeTask.requiredItem) {
      const itemsNowChosen = correctItemsChosen + 1;
      setCorrectItemsChosen(itemsNowChosen);
      if (itemsNowChosen >= activeTask.numberItemsToSolve) {
        setAnimatingTaskTransition(true);
        completeActiveTask(activeTask);
        if (solvingTransitionTimeout) clearTimeout(solvingTransitionTimeout);
        setEndSolvingChapterAnimationTimeouts();
      }
      return true;
    }
    return false;
  };

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

  const checkVoteIsCorrect = () => true;

  const checkSolutionIsCorrect = currentOrb =>
    activeTask.requiredItem === currentOrb.type;

  const playHowCanIHelp = () => {
    setFinishedTaskInstructionalAudio(true);
  };

  const resetQuestion = () => {
    setFinishedTaskInstructionalAudio(false);
  };

  /* RENDER CONDITIONS */
  const isSolving = taskPhase === SOLVING;
  const isVoting = taskPhase === VOTING;
  const movingMap = taskPhase === MOVING_MAP;
  const onOrbSelection = isSolving ? onItemSelection : onTaskSelection;
  const checkItemIsCorrect = isSolving
    ? checkSolutionIsCorrect
    : checkVoteIsCorrect;
  const activeScreen = taskPhase;
  // Save yourself message
  let interfaceMessage = "Help yourself first!";
  if (isSolving && activeTaskIndex > 1) {
    // Save others message
    interfaceMessage = "How can I help?";
  } else if (isVoting) {
    // Choose next task message
    interfaceMessage = "Who should we help next?";
  } else if (movingMap) {
    // Going to next task message...
    interfaceMessage = "Let's go do it!";
  }

  return (
    <Fragment>
      <div css={screenLayout}>
        <SolveScreen
          open={taskPhase === SOLVING}
          activeTask={activeTask}
          activeTaskIndex={activeTaskIndex}
          correctItemsChosen={correctItemsChosen}
        />
        <VoteMapScreen
          activeTask={activeTask}
          activeTaskIndex={activeTaskIndex}
          tasks={weightedTasks}
          taskVotes={taskVotes}
          mapTransitionDuration={mapTransitionDuration}
        />
      </div>
      <MatchLockInterface
        possibleItems={possibleItems}
        onOrbSelection={onOrbSelection}
        checkItemIsCorrect={checkItemIsCorrect}
        activeScreen={activeScreen}
        interfaceMessage={interfaceMessage}
      />
      <Song songFile={taskSong} />
      {taskPhase === VOTING && (
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
      {finishedTaskInstructionalAudio && activeTask && (
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

TaskScreen.propTypes = {
  taskPhase: PropTypes.oneOf([SOLVING, VOTING, MOVING_MAP]),
  activeTask: PropTypes.shape({}),
  activeTaskIndex: PropTypes.number,
  endChapter: PropTypes.func,
  goToNextPhase: PropTypes.func,
  addNextTask: PropTypes.func,
  completeActiveTask: PropTypes.func,
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({})),
  weightedPlayerKitItems: PropTypes.arrayOf(PropTypes.shape({})),
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({})
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTaskData(state),
  activeTaskIndex: getActiveTaskIndex(state),
  weightedTasks: getWeightedTasks(state),
  weightedPlayerKitItems: getPlayerKitItems(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter() {
    dispatch(goToNextChapter());
  },
  goToNextPhase(taskToComplete) {
    dispatch(goToNextTaskPhase(taskToComplete));
  },
  addNextTask(taskChoice) {
    dispatch(addTask(taskChoice));
  },
  completeActiveTask(activeTask) {
    dispatch(completeTask(activeTask));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreen));
