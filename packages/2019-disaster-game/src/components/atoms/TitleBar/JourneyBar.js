/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { memo, useState, useEffect } from "react";

import { palette } from "../../../constants/style";
import { KIT, QUAKE, TASKS } from "../../../constants/chapters";
import {
  getActiveChapterId,
  getActiveChapterIndex,
  getActiveChapterData
} from "../../../state/chapters";
import { getActiveTaskData } from "../../../state/tasks";
import CheckmarkSVG from "../../../../assets/title_bar_checkmark.svg";

const containerStyle = css`
  height: 175px;
  width: 2200px;
  background-color: ${palette.lime};
  display: grid;
  grid-template-columns: repeat(3, auto);
  padding: 0 80px;
  border-radius: 80px;
  align-content: center;
  justify-content: space-between;
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
    // For some reason, p won't align center and using just one of these methods doesn't work
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

const coundownContainer = css`
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

const JourneyBar = ({
  activeChapterId,
  activeChapterIndex,
  activeChapterData,
  activeTaskData
}) => {
  const [chapterDuration, setChapterDuration] = useState(0);

  useEffect(() => {
    if (activeChapterId === TASKS) {
      if (activeTaskData) {
        setChapterDuration(activeTaskData.time);
      } else {
        setChapterDuration(activeChapterData.voteDuration);
      }
    } else {
      setChapterDuration(activeChapterData.duration);
    }
  }, [activeChapterData, activeChapterId, activeTaskData]);

  return (
    <div css={containerStyle}>
      <div
        css={css`
          ${sectionStyle};
          ${activeChapterId === KIT && activeSectionStyle}
          ${activeChapterIndex > 1 && completedSectionStyle}
        `}
      >
        {activeChapterId === KIT && (
          <div css={coundownContainer}>
            <p>{chapterDuration}</p>
          </div>
        )}
        {activeChapterIndex > 1 && (
          <img src={CheckmarkSVG} alt="checkmark" css={checkmarkStyle} />
        )}
        {activeChapterId !== KIT && activeChapterIndex <= 1 && (
          <div css={circleStyle} />
        )}
        <p>PREPARE A KIT</p>
      </div>

      <div
        css={css`
          ${sectionStyle};
          ${activeChapterId === QUAKE && activeSectionStyle}
          ${activeChapterIndex > 2 && completedSectionStyle}
        `}
      >
        {activeChapterId === QUAKE && (
          <div css={coundownContainer}>
            <p>{chapterDuration}</p>
          </div>
        )}
        {activeChapterIndex > 2 && (
          <img src={CheckmarkSVG} alt="checkmark" css={checkmarkStyle} />
        )}
        {activeChapterId !== QUAKE && activeChapterIndex <= 2 && (
          <div css={circleStyle} />
        )}
        <p>GET READY</p>
      </div>

      <div
        css={css`
          ${sectionStyle};
          ${activeChapterId === TASKS && activeSectionStyle}
          ${activeChapterIndex > 3 && completedSectionStyle}
        `}
      >
        {activeChapterId === TASKS && (
          <div css={coundownContainer}>
            <p>{chapterDuration}</p>
          </div>
        )}
        {activeChapterIndex > 3 && (
          <img src={CheckmarkSVG} alt="checkmark" css={checkmarkStyle} />
        )}
        {activeChapterId !== TASKS && activeChapterIndex <= 3 && (
          <div css={circleStyle} />
        )}
        <p>HELP NEIGHBORS</p>
      </div>
    </div>
  );
};

JourneyBar.propTypes = {
  activeChapterId: PropTypes.string,
  activeChapterIndex: PropTypes.number,
  activeChapterData: PropTypes.shape({}),
  activeTaskData: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeChapterId: getActiveChapterId(state),
  activeChapterIndex: getActiveChapterIndex(state),
  activeChapterData: getActiveChapterData(state),
  activeTaskData: getActiveTaskData(state)
});

export default connect(mapStateToProps)(memo(JourneyBar));
