/** @jsx jsx */
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";

import { getActiveChapterIndex, setActiveChapter } from "../../state/chapters";

const buttonContainer = css`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  > button {
    font-size: 80px;
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
