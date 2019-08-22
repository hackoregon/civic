/** @jsx jsx */
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";

import { getActiveChapterIndex, setActiveChapter } from "../../state/chapters";

const buttonContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 50px;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  pointer-events: all;

  > button {
    font-size: 20px;
    height: 100%;
  }
`;

const ChapterButtons = ({ activeChapterIndex, goToChapter }) => {
  return (
    <div css={buttonContainer}>
      <button
        type="button"
        onClick={() => {
          goToChapter(activeChapterIndex - 1);
        }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => {
          goToChapter(activeChapterIndex + 1);
        }}
      >
        →
      </button>
    </div>
  );
};

ChapterButtons.propTypes = {
  activeChapterIndex: PropTypes.number,
  goToChapter: PropTypes.func
};

export default connect(
  state => ({
    activeChapterIndex: getActiveChapterIndex(state)
  }),
  dispatch => ({
    goToChapter(chapter) {
      dispatch(setActiveChapter(chapter));
    }
  })
)(ChapterButtons);
