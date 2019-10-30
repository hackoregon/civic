/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useCallback, useEffect, memo, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  getTaskPhase,
  getActiveTaskData,
  getActiveTaskIndex,
  getWeightedTasks
} from "../../../state/tasks";
import { addBadge } from "../../../state/user";
import { getPlayerKitItems, getItems } from "../../../state/kit";
import usePrevious from "../../../state/hooks/usePrevious";
import { SOLVING, VOTING, MOVING_MAP } from "../../../constants/actions";
import MatchLockInterface from "../../atoms/MatchLockInterface";
import SolveScreen from "./SolveScreen";
import VoteMapScreen from "./VoteMapScreen";
import { palette } from "../../../constants/style";

const screenLayout = css`
  position: relative;
  height: 100%;
`;

const requiredMessageContainer = css`
  postion: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${palette.blueRGBA};
  display: grid;
  align-content: center;
  justify-content: center;
  text-align: center;
  z-index: 900;
  opacity: 1;
  transition: all 1s;
`;

const messageStyle = css`
  background-color: ${palette.lightLime};
  padding: 100px;
  border-radius: 50px;
`;

const titleText = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 12rem;
  margin: 0;
  color: ${palette.red};
`;

const requiredItemStyle = css`
  height: 500px;
  justify-self: center;
  margin-top: 100px;
`;

const TaskScreen = ({
  activeTask,
  activeTaskIndex,
  taskPhase,
  weightedPlayerKitItems,
  weightedTasks,
  addHeroBadge,
  mapTransitionDuration,
  completeActiveTask,
  correctItemsChosen,
  setCorrectItemsChosen,
  onTaskSelection,
  taskVotes,
  playerHasCorrectItemInKit,
  allKitItems,
  earlyFinishTask
}) => {
  const [completedSaveYourselfTasks, setCompletedSaveYourselfTasks] = useState(
    0
  );
  const [completedSaveOthersTasks, setCompletedSaveOthersTasks] = useState(0);
  const [showRequiredItemMessage, setShowRequiredItemMessage] = useState(false);
  const [
    showRequiredItemMessageTimeout,
    setShowRequiredItemMessageTimeout
  ] = useState(null);
  const [endTaskEarlyTimeout, setEndTaskEarlyTimeout] = useState(null);
  const prevActiveTaskIndex = usePrevious(activeTaskIndex);

  const onItemSelection = orbModel => {
    if (orbModel.type === activeTask.requiredItem) {
      const itemsNowChosen = correctItemsChosen + 1;
      setCorrectItemsChosen(itemsNowChosen);

      if (itemsNowChosen >= activeTask.numberItemsToSolve) {
        let earnedBadge = null;
        if (activeTaskIndex < 2) {
          const nextTotalSaveYourself = completedSaveYourselfTasks + 1;
          earnedBadge = nextTotalSaveYourself === 2 && "taskSurvivorBadge";
          setCompletedSaveYourselfTasks(nextTotalSaveYourself);
        } else {
          const nextTotalSaveOthers = completedSaveOthersTasks + 1;
          if (nextTotalSaveOthers === 4) {
            earnedBadge = "taskCitySuperheroBadge";
          } else if (nextTotalSaveOthers === 2) {
            earnedBadge = "taskNeighborhoodHeroBadge";
          }
          setCompletedSaveOthersTasks(nextTotalSaveOthers);
        }

        completeActiveTask(earnedBadge);

        if (earnedBadge) {
          addHeroBadge("hero", earnedBadge);
        }
      }
      return true;
    }
    return false;
  };

  const checkVoteIsCorrect = () => true;

  const checkSolutionIsCorrect = currentOrb =>
    activeTask.requiredItem === currentOrb.type;

  const clearTimeouts = useCallback(() => {
    setShowRequiredItemMessageTimeout(null);
    if (showRequiredItemMessageTimeout) {
      clearTimeout(showRequiredItemMessageTimeout);
    }
    if (endTaskEarlyTimeout) {
      clearTimeout(endTaskEarlyTimeout);
    }
  }, [endTaskEarlyTimeout, showRequiredItemMessageTimeout]);

  const finishTaskEarly = useCallback(() => {
    setShowRequiredItemMessage(false);
    earlyFinishTask();
  }, [earlyFinishTask]);

  const showMessage = useCallback(() => {
    setShowRequiredItemMessage(true);
    const newTimeout = setTimeout(finishTaskEarly, 7000);
    setEndTaskEarlyTimeout(newTimeout);
  }, [finishTaskEarly]);

  useEffect(() => {
    if (
      taskPhase === SOLVING &&
      !playerHasCorrectItemInKit &&
      !showRequiredItemMessageTimeout
    ) {
      const newTimeout = setTimeout(showMessage, 10000);
      setShowRequiredItemMessageTimeout(newTimeout);
    }
  }, [
    earlyFinishTask,
    playerHasCorrectItemInKit,
    showMessage,
    showRequiredItemMessageTimeout,
    taskPhase
  ]);

  useEffect(() => {
    const movedOnFromTask = activeTaskIndex !== prevActiveTaskIndex;
    if (movedOnFromTask) {
      setShowRequiredItemMessage(false);
      clearTimeouts();
    }
  }, [activeTaskIndex, clearTimeouts, prevActiveTaskIndex, taskPhase]);

  // End of entire task chapter clean up
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  let possibleItems = weightedPlayerKitItems;
  if (isSolving && activeTaskIndex > 1) {
    // Save others message
    interfaceMessage = "How can I help?";
  } else if (isVoting) {
    // Choose next task message
    interfaceMessage = "Who should we help next?";
    possibleItems = weightedTasks;
  } else if (movingMap) {
    // Going to next task message...
    interfaceMessage = "Let's go do it!";
    possibleItems = [];
  }

  const requiredItemData = isSolving && allKitItems[activeTask.requiredItem];

  return (
    <Fragment>
      {isSolving && showRequiredItemMessage && (
        <div css={requiredMessageContainer}>
          <div css={messageStyle}>
            <p css={titleText}>
              Next time we should bring {requiredItemData.itemTitle}.
            </p>
            <img
              src={requiredItemData.fullSvg}
              alt="required item"
              css={requiredItemStyle}
            />
          </div>
        </div>
      )}
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
    </Fragment>
  );
};

TaskScreen.propTypes = {
  taskPhase: PropTypes.oneOf([SOLVING, VOTING, MOVING_MAP]),
  activeTask: PropTypes.shape({}),
  activeTaskIndex: PropTypes.number,
  completeActiveTask: PropTypes.func,
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({})),
  weightedPlayerKitItems: PropTypes.arrayOf(PropTypes.shape({})),
  badges: PropTypes.shape({}),
  addHeroBadge: PropTypes.func,
  mapTransitionDuration: PropTypes.number,
  correctItemsChosen: PropTypes.number,
  setCorrectItemsChosen: PropTypes.func,
  onTaskSelection: PropTypes.func,
  taskVotes: PropTypes.shape({}),
  playerHasCorrectItemInKit: PropTypes.bool,
  allKitItems: PropTypes.shape({}),
  earlyFinishTask: PropTypes.func
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTaskData(state),
  activeTaskIndex: getActiveTaskIndex(state),
  weightedTasks: getWeightedTasks(state),
  weightedPlayerKitItems: getPlayerKitItems(state),
  allKitItems: getItems(state)
});

const mapDispatchToProps = dispatch => ({
  addHeroBadge: bindActionCreators(addBadge, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreen));
