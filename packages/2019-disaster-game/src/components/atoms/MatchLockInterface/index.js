import { useState, useEffect } from "react";
/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";

import Ticker from "../Ticker";
import OrbManager from "../OrbManager";
import { GUIStyle } from "../../Game/index";
import media from "../../../utils/mediaQueries";

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

const MatchLockInterface = ({
  possibleItems,
  onOrbSelection,
  checkItemIsCorrect,
  activeScreen,
  debug = false,
  tickerTapeText
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
      <Ticker debug={debug} text={tickerTapeText} />
      <GUIStyle>
        <OrbManager
          possibleItems={possibleItems}
          onOrbSelection={onOrbSelection}
          checkItemIsCorrect={checkItemIsCorrect}
          activeScreen={activeScreen}
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
  debug: PropTypes.bool,
  tickerTapeText: PropTypes.string
};

export default MatchLockInterface;
