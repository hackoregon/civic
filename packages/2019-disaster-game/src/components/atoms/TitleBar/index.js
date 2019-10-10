import { memo, useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { shuffle } from "lodash";

import { getActiveChapterId } from "../../../state/chapters";
import { getActiveTaskData } from "../../../state/tasks";
import { KIT, TASKS, SUMMARY } from "../../../constants/chapters";
import QRCode from "../../../../assets/earthquake-heroes-qr-code.svg";
import {
  KitTickerTape,
  SelectionTickerTape,
  GeneralTickerTape
} from "../../../constants/tickerTape";
import Ticker from "../Ticker";
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
  grid-template-columns: 355px 2360px 1025px;
  align-items: center;
  margin-top: 10px;
`;

const fullInfoContainer = css`
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 355px 3380px;
`;

const QRCodeStyle = css`
  height: 160px;
`;

const TitleBar = ({ activeChapterId, activeTaskData }) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [badgeDrawerOpen, setBadgeDrawerOpen] = useState(false);
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
      <div
        css={css`
          ${infoContainer};
          ${badgeDrawerOpen && fullInfoContainer}
        `}
      >
        <img
          src={QRCode}
          alt="QR code for civicplatform.org"
          css={QRCodeStyle}
        />
        <JourneyBar badgeDrawerOpen={badgeDrawerOpen} />
        {activeChapterId === TASKS && (
          <Fragment>
            {badgeDrawerOpen && <div />}
            <SavedBar justifyRight={badgeDrawerOpen} />
          </Fragment>
        )}
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
