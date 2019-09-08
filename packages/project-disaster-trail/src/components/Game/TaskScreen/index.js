import { memo, useEffect, useState, Fragment, useCallback } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { goToNextChapter } from "../../../state/chapters";
import {
  getActiveTaskData,
  completeTask,
  getWeightedTasks
} from "../../../state/tasks";
import { getPlayerKitItems } from "../../../state/kit";
import ChooseScreen from "./ChooseScreen";
import SolveScreen from "./SolveScreen";
import MatchLockInterface from "../../atoms/MatchLockInterface";
import TaskDebugger from "../../atoms/TaskDebugger";
import Timer from "../../../utils/timer";

import * as ACTIONS from "../../../constants/actions";
import usePrevious from "../../../state/hooks/usePrevious";

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
  activeTask,
  completeActiveTask,
  endChapter,
  debug = true,
  playerKitItems,
  weightedTasks
}) => {
  const [percentComplete, setPercentComplete] = useState(0);
  const [action, setAction] = useState(ACTIONS.SOLVING);
  const [timer] = useState(new Timer());
  const [chapterTimer] = useState(new Timer());
  const [votingComplete, setVotingComplete] = useState(false);
  const [movingMapComplete, setMovingMapComplete] = useState(false);
  const [numberCompletedTasks, setNumberCompletedTasks] = useState(0);

  const prevActiveTask = usePrevious(activeTask);
  const prevAction = usePrevious(action);

  const votingDuration = 20;
  const mapTransitionDuration = 5;
  const chapterDuration = 60;

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
          setMovingMapComplete(false);
          setAction(ACTIONS.MOVING_MAP);
        }
        break;
      case ACTIONS.MOVING_MAP:
        if (movingMapComplete) {
          setAction(ACTIONS.SOLVING);
        }
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn("Unknown action: ", action);
        break;
    }
  }, [prevActiveTask, activeTask, votingComplete, movingMapComplete, action]);

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

  const onItemSelection = item => {
    // eslint-disable-next-line no-console
    console.log("item ", item);
    // if (item.type === activeTask.requiredItem) {
    //   this.setState(state => ({
    //     correctItemsChosen: state.correctItemsChosen + 1
    //   }));
    // }
  };

  const onTaskSelection = task => {
    // eslint-disable-next-line no-console
    console.log("onTaskSelection ", task);
    // const { taskVotes } = this.state;
    // taskVotes[task.type] += 1;

    // this.setState({
    //   taskVotes
    // });
    // // Return true so Orb knows how to animate
    // return true;
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
        <SolveScreen activeTask={activeTask} open={isSolving} />
        <ChooseScreen
          activeTask={activeTask}
          votingComplete={votingComplete}
          movingMapComplete={movingMapComplete}
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
    </Fragment>
  );
};

TaskScreen.propTypes = {
  activeTask: PropTypes.shape({}),
  completeActiveTask: PropTypes.func,
  endChapter: PropTypes.func,
  debug: PropTypes.bool,
  playerKitItems: PropTypes.arrayOf(PropTypes.shape({})),
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = state => ({
  activeTask: getActiveTaskData(state),
  playerKitItems: getPlayerKitItems(state),
  weightedTasks: getWeightedTasks(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter() {
    dispatch(goToNextChapter());
  },
  completeActiveTask(taskChoice, taskId) {
    dispatch(completeTask(taskChoice, taskId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreen));
