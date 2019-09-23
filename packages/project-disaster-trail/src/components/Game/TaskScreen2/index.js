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
import { SOLVING, VOTING } from "../../../constants/actions";
import { chooseRandomTask } from "./voteUtils";

import MatchLockInterface from "../../atoms/MatchLockInterface";
import SolveScreen from "./SolveScreen";
import VoteMapScreen from "./VoteMapScreen";

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
  weightedTasks,
}) => {
  const [chapterTimer] = useState(new Timer());
  const [possibleItems, setPossibleItems] = useState(weightedPlayerKitItems);
  const [phaseTimer] = useState(new Timer());
  const [taskVotes, setTaskVotes] = useState(taskVotesDefault);

  const goToTask = useCallback(() => {
    const mostVotes = taskVotes.mostVotesTotal;
    let { mostVotesId } = taskVotes;
    if (mostVotes < 1) {
      mostVotesId = chooseRandomTask(tasksForEnvironment, activeEnvironment);
    }
    addNextTask(mostVotesId);
  }, [taskVotes, chooseRandomTask, tasksForEnvironment, activeEnvironment, addNextTask]);

  const startTimer = useCallback((duration, callback, completeTask, items) => {
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
  }, [phaseTimer, goToNextPhase]);

  // Timer: chapter duration
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterTimer, endChapter]);

  // Timer: game phase
  useEffect(() => {
    if (taskPhase === SOLVING) startTimer(activeTask.time, null, true, weightedTasks);
    if (taskPhase === VOTING) startTimer(votingDuration, goToTask, null,weightedPlayerKitItems );

    return () => {
      phaseTimer.stop();
    };
  }, [activeTask, goToTask, phaseTimer, startTimer, taskPhase, weightedPlayerKitItems, weightedTasks]);

  // Timer: trigger timer when switching between tasks, not gameplay phases
  useEffect(() => {
    if (taskPhase === SOLVING && activeTaskIndex === 1) {
      startTimer(activeTask.time, null, true, weightedTasks);
    }

    return () => {
      phaseTimer.stop();
    };
  }, [activeTask, activeTaskIndex, phaseTimer, startTimer, taskPhase, weightedTasks]);

  const onItemSelection = () => {
    console.log('item selected')
  }

  const onTaskSelection = orbModel => {
    console.log('task selected')
  }

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
    // activeScreen = `solve_${numberCompletedTasks}`;
    tickerTapeText = "How can we help this person?";
  } else if (isVoting) {
    tickerTapeText = "Who should we help next?";
  }

  return (
    <Fragment>
      <div
        css={css`
          position: relative;
          height: 100%;
        `}
      >
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
    </Fragment>
  );
};

TaskScreen.propTypes = {
  taskPhase: PropTypes.oneOf([
    SOLVING,
    VOTING
  ]),
  activeTask: PropTypes.shape({}),
  activeTaskIndex: PropTypes.number,
  endChapter: PropTypes.func,
  goToNextPhase: PropTypes.func,
  addNextTask: PropTypes.func,
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({})),
  weightedPlayerKitItems: PropTypes.arrayOf(PropTypes.shape({})),
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTaskData(state),
  activeTaskIndex: getActiveTaskIndex(state),
  weightedTasks: getWeightedTasks(state),
  weightedPlayerKitItems: getPlayerKitItems(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state),
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
