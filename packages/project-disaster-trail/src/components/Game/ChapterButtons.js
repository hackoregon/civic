/** @jsx jsx */
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";

import { getActiveChapter, setActiveChapter } from "../../state/chapters";

const buttonContainer = css`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  > button {
    font-size: 80px;
  }
`;

const ChapterButtons = ({ activeChapter, goToChapter }) => {
  return (
    <div css={buttonContainer}>
      <button
        type="button"
        onClick={() => {
          goToChapter(activeChapter.id - 1);
        }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => {
          goToChapter(activeChapter.id + 1);
        }}
      >
        →
      </button>
    </div>
  );
};

ChapterButtons.propTypes = {
  activeChapter: PropTypes.shape({
    enabled: PropTypes.bool,
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string
  }),
  goToChapter: PropTypes.func
};

export default connect(
  state => ({
    activeChapter: getActiveChapter(state)
  }),
  dispatch => ({
    goToChapter(chapter) {
      dispatch(setActiveChapter(chapter));
    }
  })
)(ChapterButtons);
