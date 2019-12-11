import { useState, useEffect } from "react";
/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { palette } from "../../../constants/style";
import media from "../../../utils/mediaQueries";
// import Timer from "../../../utils/timer";
// import usePrevious from "../../../state/hooks/usePrevious";
import { GUIStyle } from "../../Game/index";
import OrbManager from "../OrbManager";
import {
  getTaskPhase,
  taskPhaseKeys,
  getActiveTask,
  choseCorrectItemForTask as _choseCorrectItemForTask
} from "../../../state/newTasks";

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
  font-family: "Boogaloo", cursive;
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
  // noInteractionCallback,
  // restartNoInteractionTimer,
  // noInteractionDuration,
  taskPhase,
  activeTask,
  choseCorrectItemForTask
}) => {
  // const [interactionTimeout] = useState(new Timer());
  const [open, setOpen] = useState(false);
  // const prevRestartNoInteractionTimer = usePrevious(restartNoInteractionTimer);

  // const startInteractionTimeout = useCallback(() => {
  //   interactionTimeout.stop();

  //   interactionTimeout.setDuration(noInteractionDuration);
  //   interactionTimeout.addCompleteCallback(() => {
  //     noInteractionCallback();
  //   });
  //   interactionTimeout.start();
  // }, [interactionTimeout, noInteractionCallback, noInteractionDuration]);

  // const doOrbSelection = (...args) => {
  // onOrbSelection(...args);
  // startInteractionTimeout();
  // };

  // useEffect(() => {
  //   if (
  //     restartNoInteractionTimer &&
  //     restartNoInteractionTimer !== prevRestartNoInteractionTimer
  //   ) {
  //     startInteractionTimeout();
  //   }
  // }, [
  //   prevRestartNoInteractionTimer,
  //   restartNoInteractionTimer,
  //   startInteractionTimeout
  // ]);

  useEffect(() => {
    setOpen(true);
    //   startInteractionTimeout();

    //   return () => {
    //     interactionTimeout.stop();
    //   };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onKitItemSelection = orbModel => {
    if (orbModel.type === activeTask.requiredItem) {
      choseCorrectItemForTask(activeTask);
      return true;
    }
    return false;
  };

  const onTaskSelection = () => {
    console.log("task selection");
  };

  const onOrbSelection = orbModel => {
    if (
      taskPhase === SOLVING_SAVE_YOURSELF ||
      taskPhase === SOLVING_SAVE_OTHERS
    ) {
      onKitItemSelection(orbModel);
    } else if (taskPhase === CHOOSE_TASK) {
      onTaskSelection(orbModel);
    }
  };

  const checkItemIsCorrect = orbModel => {
    if (
      taskPhase === SOLVING_SAVE_YOURSELF ||
      taskPhase === SOLVING_SAVE_OTHERS
    ) {
      return activeTask.requiredItem === orbModel.type;
    } if (taskPhase === CHOOSE_TASK) {
      return true;
    }
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
  // noInteractionCallback: PropTypes.func,
  // restartNoInteractionTimer: PropTypes.bool,
  // noInteractionDuration: PropTypes.number,,
  taskPhase: PropTypes.oneOf([...Object.values(taskPhaseKeys)]),
  activeTask: PropTypes.shape({}),
  choseCorrectItemForTask: PropTypes.func
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTask(state)
});

const mapDispatchToProps = dispatch => ({
  choseCorrectItemForTask: bindActionCreators(
    _choseCorrectItemForTask,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchLockInterface);
