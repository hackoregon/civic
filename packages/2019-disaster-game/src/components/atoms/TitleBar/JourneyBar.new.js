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
  getActiveChapterId
} from "../../../state/chapters";
import { TASKS } from "../../../constants/chapters";

const containerStyle = css`
  margin: 0 auto;
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 65px;
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

const checkmarkStyle = css`
  height: 65px;
  display: inline-block;
`;

const { SOLVING_SAVE_YOURSELF } = taskPhaseKeys;

const JourneyBar = ({
  activeChapterId,
  activeChapterIndex,
  activeTaskPhase
}) => {
  // const [chapterTimeLeft, setChapterTimeLeft] = useState(0);
  // const [savingYourself, setSavingYourself] = useState(false);
  const [savingOthers, setSavingOthers] = useState(false);

  // const tick = useCallback(() => {
  //   if (chapterTimeLeft > 0) {
  //     setChapterTimeLeft(chapterTimeLeft - 1);
  //   }
  // }, [chapterTimeLeft]);

  // useEffect(() => {
  //   const showTimerPhases = [
  //     SOLVING_SAVE_YOURSELF,
  //     SOLVING_SAVE_OTHERS,
  //     CHOOSE_TASK
  //   ];
  //   const phaseShouldHaveTimer = showTimerPhases.indexOf(activeTaskPhase) > -1;
  //   const resetForSecondSaveYourselfTask = activeTaskIndex === 1;
  //   if (phaseShouldHaveTimer || resetForSecondSaveYourselfTask) {
  //     setChapterTimeLeft(allTaskPhaseData[activeTaskPhase].time - 1);
  //   } else {
  //     setChapterTimeLeft(0);
  //   }
  // }, [activeTaskPhase, allTaskPhaseData, activeTaskIndex]);

  // useEffect(() => {
  //   const countdownInterval = setInterval(tick, 1000);

  //   return () => {
  //     clearInterval(countdownInterval);
  //   };
  // }, [chapterTimeLeft, tick]);

  useEffect(() => {
    // setSavingYourself(activeChapterId === TASKS && activeTaskPhase === SOLVING_SAVE_YOURSELF);
    setSavingOthers(
      activeChapterId === TASKS && activeTaskPhase !== SOLVING_SAVE_YOURSELF
    );
  }, [activeChapterId, activeTaskPhase]);

  // COLLECT A KIT
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
      <div css={journeyStage}>
        {/* COLLECT A KIT */}
        {/* Note: no ellipse for this phase because never needs to be shown */}
        {collectAKitCompleted && (
          <img src={CheckmarkSVG} alt="Checkmark" css={checkmarkStyle} />
        )}
        <p>COLLECT A KIT</p>
      </div>
      {/* HELP YOURSELF */}
      <div css={journeyStage}>
        {helpYourselfInFuture && (
          <img
            src={NoCheckEllipseSVG}
            alt="not yet checked stage"
            css={checkmarkStyle}
          />
        )}
        {helpYourselfCompleted && (
          <img src={CheckmarkSVG} alt="Checkmark" css={checkmarkStyle} />
        )}
        <p>HELP YOURSELF</p>
      </div>
      {/* HELP NEIGHBORS */}
      <div css={journeyStage}>
        {helpNeighborsInFuture && (
          <img
            src={NoCheckEllipseSVG}
            alt="not yet checked stage"
            css={checkmarkStyle}
          />
        )}
        {helpNeighborsCompleted && (
          <img src={CheckmarkSVG} alt="Checkmark" css={checkmarkStyle} />
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
  activeChapterIndex: PropTypes.func,
  activeChapterId: PropTypes.string,
  activeTaskPhase: PropTypes.string
  // allTaskPhaseData: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeChapterIndex: getActiveChapterIndex(state),
  activeChapterId: getActiveChapterId(state),
  activeTaskPhase: getTaskPhase(state)
});

export default connect(mapStateToProps)(JourneyBar);
