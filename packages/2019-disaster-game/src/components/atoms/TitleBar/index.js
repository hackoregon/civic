import { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { shuffle } from "lodash";

import { getActiveChapterId } from "../../../state/chapters";
import { getActiveTaskData } from "../../../state/tasks";
import { KIT, TASKS, SUMMARY } from "../../../constants/chapters";
import EHLogo from "../../../../assets/short-logo.svg";
import {
  KitTickerTape,
  SelectionTickerTape,
  GeneralTickerTape
} from "../../../constants/tickerTape";
import Ticker from "../Ticker";
// import PointsView from "../PointsView";
import JourneyBar from "./JourneyBar";
import SavedBar from "./SavedBar";

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
  /* 40px padding on each side */
  width: calc(100% - 80px);
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const logoStyle = css`
  height: 160px;
`;

const TitleBar = ({ activeChapterId, activeTaskData }) => {
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
        <img src={EHLogo} alt="Earthquake Heroes logo" css={logoStyle} />
        <JourneyBar />
        <SavedBar />
      </div>
    </div>
  );
};

TitleBar.propTypes = {
  activeChapterId: PropTypes.string,
  activeTaskData: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeChapterId: getActiveChapterId(state),
  activeTaskData: getActiveTaskData(state)
});

export default connect(mapStateToProps)(memo(TitleBar));
