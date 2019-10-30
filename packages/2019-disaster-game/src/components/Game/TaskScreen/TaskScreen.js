/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, memo, Fragment } from "react";
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
import { getPlayerKitItems } from "../../../state/kit";
import { SOLVING, VOTING, MOVING_MAP } from "../../../constants/actions";
import MatchLockInterface from "../../atoms/MatchLockInterface";
import SolveScreen from "./SolveScreen";
import VoteMapScreen from "./VoteMapScreen";

const screenLayout = css`
  position: relative;
  height: 100%;
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
  taskVotes
}) => {
  const [completedSaveYourselfTasks, setCompletedSaveYourselfTasks] = useState(
    0
  );
  const [completedSaveOthersTasks, setCompletedSaveOthersTasks] = useState(0);

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

  /* RENDER CONDITIONS */
  const isSolving = taskPhase === SOLVING;
  const isVoting = taskPhase === VOTING;
  const movingMap = taskPhase === MOVING_MAP;
  const onOrbSelection = isSolving ? onItemSelection : onTaskSelection;
  const checkItemIsCorrect = isSolving
    ? checkSolutionIsCorrect
    : checkVoteIsCorrect;
  const activeScreen = taskPhase;

  let interfaceMessage = "";
  let possibleItems = weightedPlayerKitItems;

  if (isSolving) {
    if (activeTaskIndex > 1) {
      // Save others message
      interfaceMessage = activeTask.clue;
    } else {
      // Save yourself message
      interfaceMessage = activeTask.saveYourselfClue;
    }
  } else if (isVoting) {
    // Choose next task message
    interfaceMessage = "Who should we help next?";
    possibleItems = weightedTasks;
  } else if (movingMap) {
    // Going to next task message...
    interfaceMessage = "Let's go do it!";
    possibleItems = [];
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
  taskVotes: PropTypes.shape({})
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTaskData(state),
  activeTaskIndex: getActiveTaskIndex(state),
  weightedTasks: getWeightedTasks(state),
  weightedPlayerKitItems: getPlayerKitItems(state)
});

const mapDispatchToProps = dispatch => ({
  addHeroBadge: bindActionCreators(addBadge, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreen));
