/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

import CheckmarkSVG from "../../../../assets/checkmark.svg";
import NoCheckEllipseSVG from "../../../../assets/no-check-ellipse.svg";
import Palette from "../../../constants/style";
import { getTaskPhase, taskPhaseKeys } from "../../../state/tasks";
import {
  getActiveChapterIndex,
  getActiveChapterId,
  getActiveChapterDuration
} from "../../../state/chapters";
import { TASKS, KIT } from "../../../constants/chapters";
import Countdown from "./Coundown";

const containerStyle = css`
  margin: 0 auto;
  display: inline-grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 90px;
  width: fit-content;
  align-items: center;
`;

const journeyStage = css`
  display: grid;
  grid-template-columns: 71px auto;
  grid-column-gap: 20px;
  align-items: center;

  > p {
    font-family: "Luckiest Guy", sans-serif;
    font-size: 80px;
    line-height: 80px;
    display: inline-block;
    color: ${Palette.lightGrey};
    margin: 0 0 -25px;
  }
`;

const activeJourneyStage = css`
  grid-template-columns: auto auto;
`;

const iconStyle = css`
  height: 65px;
  display: inline-block;
`;

const { SOLVING_SAVE_YOURSELF } = taskPhaseKeys;

const JourneyBar = ({
  activeChapterId,
  activeChapterIndex,
  activeTaskPhase,
  activeChapterDuration
}) => {
  const [savingYourself, setSavingYourself] = useState(false);
  const [savingOthers, setSavingOthers] = useState(false);

  // Update whether saving yourself or saving others during task phase
  useEffect(() => {
    setSavingYourself(
      activeChapterId === TASKS && activeTaskPhase === SOLVING_SAVE_YOURSELF
    );
    setSavingOthers(
      activeChapterId === TASKS && activeTaskPhase !== SOLVING_SAVE_YOURSELF
    );
  }, [activeChapterId, activeTaskPhase]);

  // COLLECT A KIT
  const collectAKitActive = activeChapterId === KIT;
  const collectAKitCompleted = activeChapterIndex > 2;
  // HELP YOURSELF
  const helpYourselfInFuture =
    activeChapterId !== TASKS && activeChapterIndex < 7;
  const helpYourselfCompleted = savingOthers || activeChapterIndex > 6;
  // HELP NEIGHBORS
  const helpNeighborsInFuture = !savingOthers && activeChapterIndex < 7;
  // TODO: is this case ever present?
  const helpNeighborsCompleted = activeChapterIndex > 6;

  return (
    <div css={containerStyle}>
      <div
        css={css`
          ${journeyStage};
          ${collectAKitActive ? activeJourneyStage : ""}
        `}
      >
        {/* COLLECT A KIT */}
        {/* Note: no ellipse for this phase because never needs to be shown */}
        {collectAKitActive && (
          <Countdown iconStyle={iconStyle} duration={activeChapterDuration} />
        )}
        {collectAKitCompleted && (
          <img src={CheckmarkSVG} alt="Checkmark" css={iconStyle} />
        )}
        <p>COLLECT A KIT</p>
      </div>
      {/* HELP YOURSELF */}
      <div css={journeyStage}>
        {helpYourselfInFuture && (
          <img
            src={NoCheckEllipseSVG}
            alt="not yet checked stage"
            css={iconStyle}
          />
        )}
        {/* TODO: fix so the duration is based on the phase */}
        {savingYourself && (
          <Countdown iconStyle={iconStyle} duration={activeChapterDuration} />
        )}
        {helpYourselfCompleted && (
          <img src={CheckmarkSVG} alt="Checkmark" css={iconStyle} />
        )}
        <p>HELP YOURSELF</p>
      </div>
      {/* HELP NEIGHBORS */}
      <div css={journeyStage}>
        {helpNeighborsInFuture && (
          <img
            src={NoCheckEllipseSVG}
            alt="not yet checked stage"
            css={iconStyle}
          />
        )}
        {helpNeighborsCompleted && (
          <img src={CheckmarkSVG} alt="Checkmark" css={iconStyle} />
        )}
        <p>HELP NEIGHBORS</p>
      </div>
    </div>
  );
};

JourneyBar.propTypes = {
  badge: PropTypes.shape({
    badgeSVG: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    shown: PropTypes.bool,
    activeTaskIndexWhenEarned: PropTypes.oneOfType([null, PropTypes.number])
  }),
  activeChapterIndex: PropTypes.number,
  activeChapterId: PropTypes.string,
  activeTaskPhase: PropTypes.string,
  activeChapterDuration: PropTypes.number
};

const mapStateToProps = state => ({
  activeChapterIndex: getActiveChapterIndex(state),
  activeChapterId: getActiveChapterId(state),
  activeTaskPhase: getTaskPhase(state),
  activeChapterDuration: getActiveChapterDuration(state)
});

export default connect(mapStateToProps)(JourneyBar);
