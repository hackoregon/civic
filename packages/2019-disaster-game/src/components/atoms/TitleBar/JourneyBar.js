/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { memo, useState, useEffect, useCallback } from "react";

import { palette } from "../../../constants/style";
import { KIT, TASKS } from "../../../constants/chapters";
import {
  getActiveChapterId,
  getActiveChapterIndex
} from "../../../state/chapters";
import {
  getTaskPhase,
  taskPhaseKeys,
  getAllTaskPhaseData,
  getActiveTaskIndex
} from "../../../state/tasks";
import CheckmarkSVG from "../../../../assets/title_bar_checkmark.svg";
import BadgesDrawer from "./BadgesDrawer";

const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(2, auto);
  max-width: 2200px;
  justify-self: end;
  margin-right: 50px;
`;

const openContainerStyle = css`
  max-width: unset;
  margin-right: 60px;
`;

const journeyBarContainerStyle = css`
  height: 130px;
  width: 2200px;
  background-color: ${palette.lime};
  display: grid;
  grid-template-columns: repeat(3, auto);
  padding: 0 80px;
  border-radius: 80px;
  align-content: center;
  justify-content: space-between;
  z-index: 10;
  box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.15);
`;

const sectionStyle = css`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;

  > p {
    font-family: "Luckiest Guy", sans-serif;
    font-size: 5.5rem;
    line-height: 100px;
    color: ${palette.yellow};
    // For some reason, <p/> won't align center and using just one of these methods doesn't work
    margin: 0 0 -10px;
    padding-top: 10px;
  }
`;

const activeSectionStyle = css`
  > p {
    color: ${palette.red};
  }
`;

const completedSectionStyle = css`
  > p {
    color: ${palette.green};
  }
`;

const circleStyle = css`
  height: 100px;
  width: 100px;
  border-radius: 100%;
  background-color: ${palette.yellow};
  margin-right: 20px;
`;

const checkmarkStyle = css`
  height: 100px;
  margin-right: 20px;
`;

const countdownContainer = css`
  height: 100px;
  width: 100px;
  position: relative;
  margin-right: 20px;
  background: #fff;
  border-radius: 100%;
  display: grid;
  align-content: center;
  justify-content: center;

  > p {
    font-size: 5rem;
    font-family: "Boogaloo", sans-serif;
    margin: 0;
    color: ${palette.red};
  }
`;

const {
  SOLVING_SAVE_YOURSELF,
  SOLVING_SAVE_OTHERS,
  CHOOSE_TASK
} = taskPhaseKeys;

const JourneyBar = ({
  activeChapterId,
  activeChapterIndex,
  activeTaskIndex,
  badgeDrawerOpen,
  openBadgeDrawer,
  activeTaskPhase,
  allTaskPhaseData
}) => {
  const [chapterTimeLeft, setChapterTimeLeft] = useState(0);
  const [savingYourself, setSavingYourself] = useState(false);
  const [savingOthers, setSavingOthers] = useState(false);

  const tick = useCallback(() => {
    if (chapterTimeLeft > 0) {
      setChapterTimeLeft(chapterTimeLeft - 1);
    }
  }, [chapterTimeLeft]);

  useEffect(() => {
    const showTimerPhases = [
      SOLVING_SAVE_YOURSELF,
      SOLVING_SAVE_OTHERS,
      CHOOSE_TASK
    ];
    const phaseShouldHaveTimer = showTimerPhases.indexOf(activeTaskPhase) > -1;
    const resetForSecondSaveYourselfTask = activeTaskIndex === 1;
    if (phaseShouldHaveTimer || resetForSecondSaveYourselfTask) {
      setChapterTimeLeft(allTaskPhaseData[activeTaskPhase].time - 1);
    } else {
      setChapterTimeLeft(0);
    }
  }, [activeTaskPhase, allTaskPhaseData, activeTaskIndex]);

  useEffect(() => {
    const countdownInterval = setInterval(tick, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [chapterTimeLeft, tick]);

  useEffect(() => {
    setSavingYourself(activeChapterId === TASKS && activeTaskIndex < 2);
    setSavingOthers(activeChapterId === TASKS && activeTaskIndex >= 2);
  }, [activeChapterId, activeTaskIndex]);

  return (
    <div
      css={css`
        ${containerStyle};
        ${badgeDrawerOpen && openContainerStyle}
      `}
    >
      <div css={journeyBarContainerStyle}>
        {/* Build Kit */}
        <div
          css={css`
            ${sectionStyle};
            ${activeChapterId === KIT && activeSectionStyle}
            ${activeChapterIndex > 2 && completedSectionStyle}
          `}
        >
          {activeChapterId !== KIT && activeChapterIndex <= 2 && (
            <div css={circleStyle} />
          )}
          {activeChapterId === KIT && (
            <div css={countdownContainer}>
              <p>{chapterTimeLeft}</p>
            </div>
          )}
          {activeChapterIndex > 2 && (
            <img src={CheckmarkSVG} alt="checkmark" css={checkmarkStyle} />
          )}
          <p>COLLECT A KIT</p>
        </div>

        {/* Save Yourself */}
        <div
          css={css`
            ${sectionStyle};
            ${savingYourself && activeSectionStyle};
            ${(activeChapterIndex > 6 ||
              (activeChapterIndex === 6 && !savingYourself)) &&
              completedSectionStyle};
          `}
        >
          {activeChapterId !== TASKS && activeChapterIndex < 7 && (
            <div css={circleStyle} />
          )}
          {savingYourself && (
            <div css={countdownContainer}>
              <p>{chapterTimeLeft}</p>
            </div>
          )}
          {(savingOthers || activeChapterIndex > 6) && (
            <img src={CheckmarkSVG} alt="checkmark" css={checkmarkStyle} />
          )}
          <p>HELP YOURSELF</p>
        </div>

        {/* Save Others */}
        <div
          css={css`
            ${sectionStyle};
            ${savingOthers && activeSectionStyle}
            ${activeChapterIndex > 6 && completedSectionStyle}
          `}
        >
          {!savingOthers && activeChapterIndex < 7 && <div css={circleStyle} />}
          {savingOthers && (
            <div css={countdownContainer}>
              <p>{chapterTimeLeft}</p>
            </div>
          )}
          {activeChapterIndex > 6 && (
            <img src={CheckmarkSVG} alt="checkmark" css={checkmarkStyle} />
          )}
          <p>HELP NEIGHBORS</p>
        </div>
      </div>
      <BadgesDrawer
        journeyBarContainerStyle={journeyBarContainerStyle}
        isOpen={badgeDrawerOpen}
        openBadgeDrawer={openBadgeDrawer}
      />
    </div>
  );
};

JourneyBar.propTypes = {
  activeChapterId: PropTypes.string,
  activeChapterIndex: PropTypes.number,
  activeTaskIndex: PropTypes.number,
  badgeDrawerOpen: PropTypes.bool,
  openBadgeDrawer: PropTypes.func,
  activeTaskPhase: PropTypes.string,
  allTaskPhaseData: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeChapterId: getActiveChapterId(state),
  activeChapterIndex: getActiveChapterIndex(state),
  activeTaskIndex: getActiveTaskIndex(state),
  activeTaskPhase: getTaskPhase(state),
  allTaskPhaseData: getAllTaskPhaseData(state)
});

export default connect(mapStateToProps)(memo(JourneyBar));
