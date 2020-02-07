/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

import CheckmarkSVG from "../../../../assets/checkmark.svg";
import NoCheckEllipseSVG from "../../../../assets/no-check-ellipse.svg";
import Palette, { palette } from "../../../constants/style";
import {
  getTaskPhase,
  taskPhaseKeys,
  getAllTaskPhaseData,
  getActiveTaskIndex,
  getBadges
} from "../../../state/tasks";
import {
  getActiveChapterIndex,
  getActiveChapterId,
  getActiveChapterDuration
} from "../../../state/chapters";
import { TASKS, KIT } from "../../../constants/chapters";
import Countdown from "./Countdown";

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
    font-family: "Akkurat", sans-serif;
    font-size: 80px;
    line-height: 80px;
    display: inline-block;
    color: ${Palette.lightGrey};
    margin: -15px 0 -25px;
    font-weight: bold;
  }
`;

const activeJourneyStage = css`
  grid-template-columns: auto auto;
  border-bottom: 10px solid ${palette.lightGreen};
  padding: 15px 0;
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
  activeChapterDuration,
  allTaskPhaseData,
  activeTaskIndex,
  badges
}) => {
  const [savingYourself, setSavingYourself] = useState(false);
  const [savingOthers, setSavingOthers] = useState(false);
  const [
    rerenderForSecondSaveYourselfTask,
    setRerenderForSecondSaveYourselfTask
  ] = useState(false);

  // Update whether saving yourself or saving others during task phase
  useEffect(() => {
    const isSavingYourselfPhase =
      activeChapterId === TASKS && activeTaskPhase === SOLVING_SAVE_YOURSELF;
    const isSavingOthersPhase =
      activeChapterId === TASKS && activeTaskPhase !== SOLVING_SAVE_YOURSELF;
    const shouldResetCountdownForSecondSaveYourselfTask =
      activeTaskIndex === 1 && isSavingYourselfPhase;

    setSavingYourself(isSavingYourselfPhase);
    setSavingOthers(isSavingOthersPhase);
    if (shouldResetCountdownForSecondSaveYourselfTask) {
      setRerenderForSecondSaveYourselfTask(true);
    }
  }, [activeChapterId, activeTaskPhase, activeTaskIndex]);

  // Trigger resetting the countdown for the second save yourself task
  useEffect(() => {
    if (rerenderForSecondSaveYourselfTask)
      setRerenderForSecondSaveYourselfTask(false);
  }, [rerenderForSecondSaveYourselfTask]);

  // COLLECT A KIT
  const collectAKitActive = activeChapterId === KIT;
  const collectAKitCompleted = activeChapterIndex > 2;
  const badgeWasEarned = badges.preparerBadge.activeTaskIndexWhenEarned;
  // HELP YOURSELF
  const helpYourselfActive = savingYourself;
  const helpYourselfInFuture =
    activeChapterId !== TASKS && activeChapterIndex < 7;
  const helpYourselfCompleted = savingOthers || activeChapterIndex > 6;
  // HELP NEIGHBORS
  const helpNeighborsInFuture = !savingOthers;
  const helpNeighborsActive = savingOthers;
  const choosingTask = activeTaskPhase === taskPhaseKeys.CHOOSE_TASK;
  const solvingSaveOthers =
    activeTaskPhase === taskPhaseKeys.SOLVING_SAVE_OTHERS;
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
        {collectAKitActive && !badgeWasEarned && (
          <Countdown iconStyle={iconStyle} duration={activeChapterDuration} />
        )}
        {collectAKitActive && badgeWasEarned && (
          <Countdown iconStyle={iconStyle} duration={0} />
        )}
        {collectAKitCompleted && (
          <img src={CheckmarkSVG} alt="Checkmark" css={iconStyle} />
        )}
        <p>COLLECT A KIT</p>
      </div>
      {/* HELP YOURSELF */}
      <div
        css={css`
          ${journeyStage};
          ${helpYourselfActive ? activeJourneyStage : ""}
        `}
      >
        {helpYourselfInFuture && (
          <img
            src={NoCheckEllipseSVG}
            alt="not yet checked stage"
            css={iconStyle}
          />
        )}
        {helpYourselfActive && !rerenderForSecondSaveYourselfTask && (
          <Countdown
            iconStyle={iconStyle}
            duration={allTaskPhaseData[activeTaskPhase].time}
          />
        )}
        {helpYourselfCompleted && (
          <img src={CheckmarkSVG} alt="Checkmark" css={iconStyle} />
        )}
        <p>HELP YOURSELF</p>
      </div>
      {/* HELP NEIGHBORS */}
      <div
        css={css`
          ${journeyStage};
          ${helpNeighborsActive ? activeJourneyStage : ""}
        `}
      >
        {helpNeighborsInFuture && (
          <img
            src={NoCheckEllipseSVG}
            alt="not yet checked stage"
            css={iconStyle}
          />
        )}
        {/* Countdown: choosing task or solving task */}
        {helpNeighborsActive && (choosingTask || solvingSaveOthers) && (
          <Countdown
            iconStyle={iconStyle}
            duration={allTaskPhaseData[activeTaskPhase].time}
          />
        )}
        {/* Countdown: show 0 when on modal */}
        {helpNeighborsActive && (!choosingTask && !solvingSaveOthers) && (
          <Countdown iconStyle={iconStyle} duration={0} />
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
  activeChapterDuration: PropTypes.number,
  allTaskPhaseData: PropTypes.objectOf(
    PropTypes.shape({
      time: PropTypes.number
    })
  ),
  activeTaskIndex: PropTypes.number,
  badges: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeChapterIndex: getActiveChapterIndex(state),
  activeChapterId: getActiveChapterId(state),
  activeTaskPhase: getTaskPhase(state),
  activeChapterDuration: getActiveChapterDuration(state),
  allTaskPhaseData: getAllTaskPhaseData(state),
  activeTaskIndex: getActiveTaskIndex(state),
  badges: getBadges(state)
});

export default connect(mapStateToProps)(JourneyBar);
