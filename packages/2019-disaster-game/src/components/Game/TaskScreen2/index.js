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
  addTask
} from "../../../state/tasks";
import { getPlayerKitItems } from "../../../state/kit";
import usePrevious from "../../../state/hooks/usePrevious";
import { SOLVING, VOTING } from "../../../constants/actions";
import { chooseRandomTask } from "./voteUtils";

import taskSong from "../../../../assets/audio/HappyTheme2fadeinout.mp3";
import Song from "../../atoms/Audio/Song";

import MatchLockInterface from "../../atoms/MatchLockInterface";
import SolveScreen from "./SolveScreen";
import VoteMapScreen from "./VoteMapScreen";

const screenLayout = css`
  position: relative;
  height: 100%;
`;

const chapterDuration = 300;
const votingDuration = 5;
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
  weightedTasks
}) => {
  const [chapterTimer] = useState(new Timer());
  const [phaseTimer] = useState(new Timer());
  const [possibleItems, setPossibleItems] = useState(weightedPlayerKitItems);
  const [taskVotes, setTaskVotes] = useState(taskVotesDefault);
  const [correctItemsChosen, setCorrectItemsChosen] = useState(0);
  const prevTaskPhase = usePrevious(taskPhase);

  const goToTask = useCallback(() => {
    const mostVotes = taskVotes.mostVotesTotal;
    let { mostVotesId } = taskVotes;
    if (mostVotes < 1) {
      mostVotesId = chooseRandomTask(tasksForEnvironment, activeEnvironment);
    }
    addNextTask(mostVotesId);
  }, [taskVotes, tasksForEnvironment, activeEnvironment, addNextTask]);

  const startTimer = useCallback(
    (duration, callback, completeTask, items) => {
      phaseTimer.reset();
      phaseTimer.setDuration(duration);
      phaseTimer.addCompleteCallback(() => {
        setPossibleItems(items);
        if (callback) {
          callback();
        }
        goToNextPhase(completeTask);
      });
      phaseTimer.start();
    },
    [phaseTimer, goToNextPhase]
  );

  // Timer: on chapter start
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterTimer, endChapter]);

  // Timer: on game phase change
  useEffect(() => {
    if (prevTaskPhase !== taskPhase) {
      if (taskPhase === SOLVING) {
        setCorrectItemsChosen(0); // reset chosen items
        startTimer(activeTask.time, null, true, weightedTasks);
      }
      if (taskPhase === VOTING) {
        setTaskVotes(taskVotesDefault); // reset chosen tasks
        startTimer(votingDuration, goToTask, null, weightedPlayerKitItems);
      }
    }
    // TODO: Currently broken. This should not execute when a task is chosen...
    return () => {
      phaseTimer.stop();
    };
  }, [
    activeTask,
    goToTask,
    phaseTimer,
    prevTaskPhase,
    startTimer,
    taskPhase,
    weightedPlayerKitItems,
    weightedTasks,
    setCorrectItemsChosen,
    setTaskVotes
  ]);

  // Timer: on switch from one solve task to another solve task (triggers for sequential tasks — save yourself tasks in this case)
  useEffect(() => {
    if (taskPhase === SOLVING && activeTaskIndex === 1) {
      setCorrectItemsChosen(0);
      startTimer(activeTask.time, null, true, weightedTasks);
    }

    return () => {
      phaseTimer.stop();
    };
  }, [
    activeTask,
    activeTaskIndex,
    phaseTimer,
    startTimer,
    taskPhase,
    weightedTasks
  ]);

  const onItemSelection = orbModel => {
    console.log("item selected");
    if (orbModel.type === activeTask.requiredItem) {
      setCorrectItemsChosen(correctItemsChosen + 1);
      if (correctItemsChosen >= activeTask.numberItemsToSolve) {
        phaseTimer.stopEarly();
      }
      return true;
    }
    return false;
  };

  const onTaskSelection = orbModel => {
    console.log("task selected");
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

  /* RENDER CONDITIONS */
  const isSolving = taskPhase === SOLVING;
  const isVoting = taskPhase === VOTING;
  const onOrbSelection = isSolving ? onItemSelection : onTaskSelection;
  const checkItemIsCorrect = isSolving
    ? checkSolutionIsCorrect
    : checkVoteIsCorrect;
  const activeScreen = taskPhase;
  let tickerTapeText = "";
  if (isSolving) {
    tickerTapeText = "How can we help this person?";
  } else if (isVoting) {
    tickerTapeText = "Who should we help next?";
  }

  return (
    <Fragment>
      <div css={screenLayout}>
        <SolveScreen
          open={taskPhase === SOLVING}
          activeTask={activeTask}
          activeTaskIndex={activeTaskIndex}
        />
        <VoteMapScreen
          activeTask={activeTask}
          activeTaskIndex={activeTaskIndex}
          tasks={weightedTasks}
        />
      </div>
      <MatchLockInterface
        possibleItems={possibleItems}
        onOrbSelection={onOrbSelection}
        checkItemIsCorrect={checkItemIsCorrect}
        activeScreen={activeScreen}
        tickerTapeText={tickerTapeText}
      />
      <Song songFile={taskSong} />
    </Fragment>
  );
};

TaskScreen.propTypes = {
  taskPhase: PropTypes.oneOf([SOLVING, VOTING]),
  activeTask: PropTypes.shape({}),
  activeTaskIndex: PropTypes.number,
  endChapter: PropTypes.func,
  goToNextPhase: PropTypes.func,
  addNextTask: PropTypes.func,
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
  goToNextPhase(completeTask) {
    dispatch(goToNextTaskPhase(completeTask));
  },
  addNextTask(taskChoice) {
    dispatch(addTask(taskChoice));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreen));
