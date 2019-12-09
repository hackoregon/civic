import { useState, useEffect, useCallback } from "react";
/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";

import { palette } from "../../../constants/style";
import media from "../../../utils/mediaQueries";
import Timer from "../../../utils/timer";
import usePrevious from "../../../state/hooks/usePrevious";
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
  font-family: "Boogaloo", cursive;
  font-size: 16px;
  line-height: 1;
  color: ${palette.gold};

  ${media.md} {
    font-size: 6em;
    padding: 10px 25px;
  }
`;

const MatchLockInterface = ({
  possibleItems,
  onOrbSelection,
  checkItemIsCorrect,
  activeScreen,
  interfaceMessage,
  noInteractionCallback,
  restartNoInteractionTimer,
  noInteractionDuration,
  requiredItem
}) => {
  const [interactionTimeout] = useState(new Timer());
  const [open, setOpen] = useState(false);
  const prevRestartNoInteractionTimer = usePrevious(restartNoInteractionTimer);

  const startInteractionTimeout = useCallback(() => {
    interactionTimeout.stop();

    interactionTimeout.setDuration(noInteractionDuration);
    interactionTimeout.addCompleteCallback(() => {
      noInteractionCallback();
    });
    interactionTimeout.start();
  }, [interactionTimeout, noInteractionCallback, noInteractionDuration]);

  const doOrbSelection = (...args) => {
    onOrbSelection(...args);
    startInteractionTimeout();
  };

  useEffect(() => {
    if (
      restartNoInteractionTimer &&
      restartNoInteractionTimer !== prevRestartNoInteractionTimer
    ) {
      startInteractionTimeout();
    }
  }, [
    prevRestartNoInteractionTimer,
    restartNoInteractionTimer,
    startInteractionTimeout
  ]);

  useEffect(() => {
    setOpen(true);
    startInteractionTimeout();

    return () => {
      interactionTimeout.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          possibleItems={possibleItems}
          onOrbSelection={doOrbSelection}
          checkItemIsCorrect={checkItemIsCorrect}
          activeScreen={activeScreen}
          requiredItem={requiredItem}
        />
      </GUIStyle>
    </div>
  );
};

MatchLockInterface.propTypes = {
  possibleItems: PropTypes.arrayOf(PropTypes.shape({})),
  onOrbSelection: PropTypes.func,
  checkItemIsCorrect: PropTypes.func,
  activeScreen: PropTypes.string,
  interfaceMessage: PropTypes.string,
  noInteractionCallback: PropTypes.func,
  restartNoInteractionTimer: PropTypes.bool,
  noInteractionDuration: PropTypes.number,
  requiredItem: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
};

export default MatchLockInterface;
