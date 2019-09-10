import { memo, useEffect, useState, Fragment, useCallback } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { goToNextChapter } from "../../../state/chapters";
import {
  getActiveTaskData,
  getWeightedTasks,
  getActiveEnvironment,
  getTasksForEnvironment,
  completeTask,
  addTask
} from "../../../state/tasks";
import { getPlayerKitItems } from "../../../state/kit";
import usePrevious from "../../../state/hooks/usePrevious";

import Timer from "../../../utils/timer";
import * as ACTIONS from "../../../constants/actions";
import taskSong from "../../../../assets/audio/PWolfAfter_Earthquake1fadeinout.mp3";

import MatchLockInterface from "../../atoms/MatchLockInterface";
import TaskDebugger from "../../atoms/TaskDebugger";
import Song from "../../atoms/Audio/Song";

import { tallyVotes, chooseRandomTask } from "./voteUtils";
import TaskMap from "./TaskMap";
import SolveScreen from "./SolveScreen";

const mapAndInfoStyle = css`
  position: relative;
  display: grid;
  overflow: hidden;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  background: beige;
`;

const TaskScreen = ({
  addNextTask,
  activeTask,
  completeActiveTask,
  endChapter,
  debug = true,
  playerKitItems,
  weightedTasks,
  tasksForEnvironment,
  activeEnvironment
}) => {
  const [percentComplete, setPercentComplete] = useState(0);
  const [action, setAction] = useState(ACTIONS.SOLVING);
  const [timer] = useState(new Timer());
  const [chapterTimer] = useState(new Timer());
  const [votingComplete, setVotingComplete] = useState(false);
  const [movingMapComplete, setMovingMapComplete] = useState(false);
  const [numberCompletedTasks, setNumberCompletedTasks] = useState(0);
  const [taskVotes, setTaskVotes] = useState({});
  const [correctItemsChosen, setCorrectItemsChosen] = useState(0);

  const prevActiveTask = usePrevious(activeTask);
  const prevAction = usePrevious(action);

  const votingDuration = 20;
  const mapTransitionDuration = 5;
  const chapterDuration = 60;

  const goToTask = useCallback(() => {
    const voteResults = tallyVotes(taskVotes);
    // eslint-disable-next-line prefer-const
    let [mostVotesCount, mostVotesId] = voteResults;
    if (mostVotesCount < 1) {
      mostVotesId = chooseRandomTask(tasksForEnvironment, activeEnvironment);
    }
    addNextTask(mostVotesId);
  }, [activeEnvironment, addNextTask, taskVotes, tasksForEnvironment]);

  // 1) Solve Screen
  // 2) Vote
  // 3) Move Map
  // 4) Go to step 1
  const onTimerComplete = useCallback(() => {
    switch (action) {
      case ACTIONS.SOLVING:
        if (activeTask) {
          completeActiveTask(activeTask.id);
          setNumberCompletedTasks(tasksCompleted => tasksCompleted + 1);
        }
        break;
      case ACTIONS.VOTING:
        setVotingComplete(true);
        break;
      case ACTIONS.MOVING_MAP:
        setMovingMapComplete(true);
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn("Unknown action in onTimerComplete ", action);
        break;
    }
  }, [action, activeTask, completeActiveTask]);

  const startTimer = useCallback(
    duration => {
      timer.setDuration(duration);
      timer.reset();
      timer.addCallback((t, p) => {
        setPercentComplete(p);
      });
      timer.addCompleteCallback(() => onTimerComplete());
      timer.start();
    },
    [onTimerComplete, timer]
  );

  // when the component mounts, start a timer of the active task's time
  useEffect(() => {
    if (timer && activeTask && action === ACTIONS.SOLVING) {
      setCorrectItemsChosen(0);
      startTimer(activeTask.time);
    }

    return () => {
      timer.stop();
    };
  }, [timer, activeTask, action, startTimer]);

  // start a timer for the _entire_ chapter
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterTimer, endChapter]);

  // when an action is complete, what should happen next?
  useEffect(() => {
    switch (action) {
      case ACTIONS.SOLVING:
        if (prevActiveTask && !activeTask) {
          setVotingComplete(false);
          setAction(ACTIONS.VOTING);
        }
        break;
      case ACTIONS.VOTING:
        if (votingComplete) {
          goToTask();
          setMovingMapComplete(false);
          setAction(ACTIONS.MOVING_MAP);
        }
        break;
      case ACTIONS.MOVING_MAP:
        if (movingMapComplete) {
          setTaskVotes({}); // reset for next vote
          setCorrectItemsChosen(0); // reset for next task
          setAction(ACTIONS.SOLVING);
        }
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn("Unknown action: ", action);
        break;
    }
  }, [
    prevActiveTask,
    activeTask,
    votingComplete,
    movingMapComplete,
    action,
    goToTask
  ]);

  // when the user transitions from one action to another,
  // start a timer
  useEffect(() => {
    if (action !== prevAction) {
      switch (action) {
        case ACTIONS.SOLVING:
          break;
        case ACTIONS.VOTING:
          startTimer(votingDuration);
          break;
        case ACTIONS.MOVING_MAP:
          startTimer(mapTransitionDuration);
          break;
        default:
          // eslint-disable-next-line no-console
          console.log("unknown action ", action);
      }
    }
  }, [action, prevAction, startTimer]);

  const onTaskSelection = orbModel => {
    const voteCount = taskVotes[orbModel.type]
      ? taskVotes[orbModel.type] + 1
      : 1;
    const newVotes = {
      ...taskVotes,
      [orbModel.type]: voteCount
    };
    setTaskVotes(newVotes);
    // Return true so Orb knows how to animate
    return true;
  };

  const onItemSelection = orbModel => {
    if (orbModel.type === activeTask.requiredItem) {
      setCorrectItemsChosen(correctItemsChosen + 1);
      if (correctItemsChosen >= activeTask.numberItemsToSolve) {
        timer.stopEarly();
      }
      return true;
    }
    return false;
  };

  const checkVoteIsCorrect = () => true;

  const checkSolutionIsCorrect = currentOrb =>
    activeTask && activeTask.requiredItem === currentOrb.type;

  const isSolving = action === ACTIONS.SOLVING;
  const possibleItems = isSolving ? playerKitItems : weightedTasks;
  const frozenOrbInterface = !isSolving;
  const onOrbSelection = isSolving ? onItemSelection : onTaskSelection;
  const checkItemIsCorrect = isSolving
    ? checkSolutionIsCorrect
    : checkVoteIsCorrect;
  // "solve" screen needs unique identifier to trigger orb refresh in orbManager between sequential tasks
  const activeScreen = isSolving ? `solve_${numberCompletedTasks}` : "vote";

  return (
    <Fragment>
      <div css={mapAndInfoStyle}>
        <SolveScreen
          activeTask={activeTask}
          open={isSolving}
          correctItemsChosen={correctItemsChosen}
        />
        <TaskMap
          activeTask={activeTask}
          votingComplete={votingComplete}
          movingMapComplete={movingMapComplete}
          tasks={weightedTasks}
        />
        {debug && <TaskDebugger activeTask={activeTask} action={action} />}
      </div>
      <MatchLockInterface
        possibleItems={possibleItems}
        onOrbSelection={onOrbSelection}
        frozenOrbInterface={frozenOrbInterface}
        checkItemIsCorrect={checkItemIsCorrect}
        activeScreen={activeScreen}
        debug
        percentComplete={percentComplete}
      />
      <Song songFile={taskSong} />
    </Fragment>
  );
};

TaskScreen.propTypes = {
  addNextTask: PropTypes.func,
  activeTask: PropTypes.shape({}),
  completeActiveTask: PropTypes.func,
  endChapter: PropTypes.func,
  debug: PropTypes.bool,
  playerKitItems: PropTypes.arrayOf(PropTypes.shape({})),
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({})),
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeTask: getActiveTaskData(state),
  playerKitItems: getPlayerKitItems(state),
  weightedTasks: getWeightedTasks(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter() {
    dispatch(goToNextChapter());
  },
  completeActiveTask(taskChoice) {
    dispatch(completeTask(taskChoice));
  },
  addNextTask(taskChoice) {
    dispatch(addTask(taskChoice));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreen));
