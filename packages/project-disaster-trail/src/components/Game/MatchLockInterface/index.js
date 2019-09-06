import { useState, useEffect } from "react";
/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";

import Ticker from "../../atoms/Ticker";
import DurationBar from "../../atoms/DurationBar";
import OrbManager from "../OrbManager";
import { GUIStyle } from "../index";
import media from "../../../utils/mediaQueries";

const containerStyle = css`
  transform: translateY(1000%);
  transition: transform 1s;
  display: grid;
  align-items: center;
  grid-template-rows: 24px 80px 200px;
  height: 100%;
  width: 100%;

  ${media.lg} {
    grid-template-rows: 24px 60px 250px;
  }

  ${media.xl} {
    grid-template-rows: 24px 40px 700px;
  }
`;

const onScreenStyle = css`
  transform: translateY(0%);
`;

const MatchLockInterface = ({
  possibleItems,
  onOrbSelection,
  checkItemIsCorrect,
  activeScreen,
  percentComplete,
  frozenOrbInterface = false,
  debug = false
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div
      css={css`
        ${containerStyle};
        ${open && onScreenStyle}
      `}
    >
      <DurationBar step="Choose supplies" percentComplete={percentComplete} />
      <Ticker
        debug={debug}
        text="Ticker tape text that goes across the screen to give instructions"
      />
      <GUIStyle>
        <OrbManager
          possibleItems={possibleItems}
          onOrbSelection={onOrbSelection}
          checkItemIsCorrect={checkItemIsCorrect}
          activeScreen={activeScreen}
          frozenOrbInterface={frozenOrbInterface}
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
  percentComplete: PropTypes.number,
  debug: PropTypes.bool,
  frozenOrbInterface: PropTypes.bool
};

export default MatchLockInterface;
