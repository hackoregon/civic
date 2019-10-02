import { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
/** @jsx jsx */
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";
import { shuffle } from "lodash";

import { getActiveChapterId } from "../../../state/chapters";
import { getActiveTaskData } from "../../../state/tasks";
import { KIT, TASKS, SUMMARY } from "../../../constants/chapters";
import {
  KitTickerTape,
  SelectionTickerTape,
  GeneralTickerTape
} from "../../../constants/tickerTape";
import ChapterButtons from "../ChapterButtons";
import LevelView from "../LevelView";
import Ticker from "../Ticker";
// import PointsView from "../PointsView";

const ContainerStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 103;
  pointer-events: none;
  transform: translateY(-100%);
  transition: transform 1s;
  display: grid;
  grid-template-rows: 100px auto;
`;

const onScreenStyle = css`
  transform: translateY(0%);
`;

const infoContainer = css`
  /* 100px padding on each side */
  width: calc(100% - 200px);
  padding: 0 100px;
  display: grid;
  grid-template-columns: 600px 1fr 600px;
  justify-content: center;
  align-items: flex-start;
`;

const TitleBar = ({ activeChapterId, activeTaskData, debug = false }) => {
  const [open, setOpen] = useState(false);
  const [screenMessages, setScreenMessages] = useState([]);

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (activeChapterId === KIT) {
      setScreenMessages(KitTickerTape);
    } else if (activeChapterId === TASKS) {
      setScreenMessages(SelectionTickerTape);
      if (activeTaskData) {
        setScreenMessages([activeTaskData.tickerTape]);
      }
    } else if (activeChapterId === SUMMARY) {
      setScreenMessages(GeneralTickerTape);
    }
  }, [activeChapterId, activeTaskData]);

  return (
    <div
      css={css`
        ${ContainerStyle}
        ${open && onScreenStyle}
      `}
    >
      <Ticker messages={shuffle(screenMessages)} />
      <div css={infoContainer}>
        <LevelView />
        {/* <PointsView /> */}
        {debug && <ChapterButtons />}
      </div>
    </div>
  );
};

TitleBar.propTypes = {
  debug: PropTypes.bool,
  activeChapterId: PropTypes.string,
  activeTaskData: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeChapterId: getActiveChapterId(state),
  activeTaskData: getActiveTaskData(state)
});

export default connect(mapStateToProps)(memo(TitleBar));
