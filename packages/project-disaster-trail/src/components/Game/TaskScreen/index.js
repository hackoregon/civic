import { memo, useEffect, useState, Fragment } from "react";
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
import OrbManager from "../OrbManager";
import ChooseScreen from "./ChooseScreen";
import SolveScreen from "./SolveScreen";
import DurationBar from "../../atoms/DurationBar";
import Ticker from "../../atoms/Ticker";
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

  const prevActiveTask = usePrevious(activeTask);
  const prevAction = usePrevious(action);

  const votingDuration = 20;
  const mapTransitionDuration = 5;
  const chapterDuration = 60;

  // 1) Solve Screen
  // 2) Vote
  // 3) Move Map
  // 4) Go to step 1
  const onTimerComplete = () => {
    switch (action) {
      case ACTIONS.SOLVING:
        if (activeTask) {
          completeActiveTask(activeTask.id);
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
  };

  const startTimer = duration => {
    timer.setDuration(duration);
    timer.reset();
    timer.addCallback((t, p) => {
      setPercentComplete(p);
    });
    timer.addCompleteCallback(() => onTimerComplete());
    timer.start();
  };

  // when the component mounts, start a timer of the active task's time
  useEffect(() => {
    if (timer && activeTask && action === ACTIONS.SOLVING) {
      startTimer(activeTask.time);
    }

    return () => {
      timer.stop();
    };
  }, [timer, activeTask, action]);

  // start a timer for the _entire_ chapter
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterTimer]);

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
  }, [prevActiveTask, activeTask, votingComplete, movingMapComplete]);

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
  }, [action, prevAction]);

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

  const isSolving = action === ACTIONS.SOLVING;
  const possibleItems = isSolving ? playerKitItems : weightedTasks;
  const frozenOrbInterface = !isSolving;
  const onOrbSelection = isSolving ? onItemSelection : onTaskSelection;

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
      <DurationBar
        step="Choose a task"
        debug
        percentComplete={percentComplete}
      />
      <Ticker text="Ticker tape text that goes across the screen to give instructions" />
      <OrbManager
        possibleItems={possibleItems}
        onOrbSelection={onOrbSelection}
        frozenOrbInterface={frozenOrbInterface}
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
