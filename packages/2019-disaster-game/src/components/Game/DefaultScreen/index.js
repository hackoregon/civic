import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";

import {
  getActiveChapterData,
  goToNextChapter as _goToNextChapter
} from "../../../state/chapters";
import Timer from "../../../utils/timer";

const DefaultScreen = ({
  activeChapter,
  goToNextChapter,
  chapterDuration = 60
}) => {
  const [chapterTimer] = useState(new Timer());

  // start a timer for the _entire_ chapter
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => goToNextChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterDuration, chapterTimer, goToNextChapter]);

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
  goToNextChapter: PropTypes.func,
  chapterDuration: PropTypes.number
};

const mapStateToProps = state => ({
  activeChapter: getActiveChapterData(state)
});

const mapDispatchToProps = dispatch => ({
  goToNextChapter: bindActionCreators(_goToNextChapter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(DefaultScreen));
