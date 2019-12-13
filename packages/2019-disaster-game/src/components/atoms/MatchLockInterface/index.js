import { useState, useEffect } from "react";
/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { palette } from "../../../constants/style";
import media from "../../../utils/mediaQueries";
import {
  getTaskPhase,
  taskPhaseKeys,
  getActiveTask,
  choseCorrectItemForTask as _choseCorrectItemForTask,
  chooseTask as _chooseTask
} from "../../../state/newTasks";
import { addPoints } from "../../../state/user";
import { addItemToPlayerKit } from "../../../state/kit";
import { GUIStyle } from "../../Game/index";
import OrbManager from "../OrbManager";

const containerStyle = css`
  transform: translateY(1000%);
  transition: transform 1s;
  display: grid;
  align-items: center;
  grid-template-rows: 80px 200px;
  height: 100%;
  width: 100%;

  ${media.lg} {
    grid-template-rows: 80px 250px;
  }

  ${media.xl} {
    grid-template-rows: 120px 700px;
  }
`;

const onScreenStyle = css`
  transform: translateY(0%);
`;

const textContainerStyle = css`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  background: ${palette.blue};
  z-index: 10;
`;

const textStyle = css`
  margin: 0;
  padding: 5px 15px;
  text-align: center;
  font-family: "Boogaloo", sans-serif;
  font-size: 16px;
  line-height: 1;
  color: ${palette.gold};

  ${media.md} {
    font-size: 6em;
    padding: 10px 25px;
  }
`;

const {
  SOLVING_SAVE_YOURSELF,
  SOLVING_SAVE_OTHERS,
  CHOOSE_TASK
} = taskPhaseKeys;

const MatchLockInterface = ({
  activeScreen,
  interfaceMessage,
  taskPhase,
  activeTask,
  choseCorrectItemForTask,
  chooseTask,
  addPointsToState,
  addItemToPlayerKitInState
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onKitItemSelection = orbModel => {
    if (orbModel.type === activeTask.requiredItem) {
      choseCorrectItemForTask(activeTask);
      return true;
    }
    return false;
  };

  const onTaskSelection = taskId => {
    chooseTask(taskId);
  };

  const kitOnOrbSelection = orbModel => {
    if (orbModel.good) {
      addItemToPlayerKitInState(orbModel);
      addPointsToState(orbModel.points);
    }
    return orbModel.good;
  };

  const taskPhaseOnOrbSelection = orbModel => {
    if (
      taskPhase === SOLVING_SAVE_YOURSELF ||
      taskPhase === SOLVING_SAVE_OTHERS
    ) {
      onKitItemSelection(orbModel);
    } else if (taskPhase === CHOOSE_TASK) {
      onTaskSelection(orbModel.type);
    }
  };

  const onOrbSelection = orbModel => {
    if (activeScreen === "kit") {
      kitOnOrbSelection(orbModel);
    } else {
      taskPhaseOnOrbSelection(orbModel);
    }
  };

  // eslint-disable-next-line consistent-return
  const taskPhaseCheckItemIsCorrect = orbModel => {
    if (
      taskPhase === SOLVING_SAVE_YOURSELF ||
      taskPhase === SOLVING_SAVE_OTHERS
    ) {
      return activeTask.requiredItem === orbModel.type;
    }
    if (taskPhase === CHOOSE_TASK) {
      return true;
    }
  };

  const checkItemIsCorrect = orbModel => {
    if (activeScreen === "kit") {
      return true;
    }
    return taskPhaseCheckItemIsCorrect(orbModel);
  };

  return (
    <div
      css={css`
        ${containerStyle};
        ${open && onScreenStyle}
      `}
    >
      <div css={textContainerStyle}>
        <p css={textStyle}>{interfaceMessage}</p>
      </div>
      <GUIStyle>
        <OrbManager
          onOrbSelection={onOrbSelection}
          checkItemIsCorrect={checkItemIsCorrect}
          activeScreen={activeScreen}
        />
      </GUIStyle>
    </div>
  );
};

MatchLockInterface.propTypes = {
  activeScreen: PropTypes.string,
  interfaceMessage: PropTypes.string,
  taskPhase: PropTypes.oneOf([...Object.values(taskPhaseKeys)]),
  activeTask: PropTypes.shape({}),
  choseCorrectItemForTask: PropTypes.func,
  chooseTask: PropTypes.func,
  addPointsToState: PropTypes.func,
  addItemToPlayerKitInState: PropTypes.func
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTask(state)
});

const mapDispatchToProps = dispatch => ({
  addPointsToState: bindActionCreators(addPoints, dispatch),
  addItemToPlayerKitInState: bindActionCreators(addItemToPlayerKit, dispatch),
  choseCorrectItemForTask: bindActionCreators(
    _choseCorrectItemForTask,
    dispatch
  ),
  chooseTask: bindActionCreators(_chooseTask, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchLockInterface);
