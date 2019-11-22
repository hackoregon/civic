import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { getActiveChapterData, goToNextChapter } from "../../../state/chapters";
import Timer from "../../../utils/timer";

const DefaultScreen = ({ activeChapter, endChapter, chapterDuration = 60 }) => {
  const [chapterTimer] = useState(new Timer());

  // start a timer for the _entire_ chapter
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterDuration, chapterTimer, endChapter]);

  return (
    <>
      <h1>{activeChapter.title} screen</h1>
    </>
  );
};

DefaultScreen.propTypes = {
  activeChapter: PropTypes.shape({
    title: PropTypes.string
  }),
  endChapter: PropTypes.func,
  chapterDuration: PropTypes.number
};

const mapStateToProps = state => ({
  activeChapter: getActiveChapterData(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter() {
    dispatch(goToNextChapter());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(DefaultScreen));
