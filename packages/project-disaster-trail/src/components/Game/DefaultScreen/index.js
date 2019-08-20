import React, { memo } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { getActiveChapterData } from "../../../state/chapters";

const DefaultScreen = ({ activeChapter }) => (
  <>
    <h1>{activeChapter.title} screen</h1>
  </>
);

DefaultScreen.propTypes = {
  activeChapter: PropTypes.shape({
    title: PropTypes.string
  })
};

const mapStateToProps = state => ({
  activeChapter: getActiveChapterData(state)
});

export default connect(mapStateToProps)(memo(DefaultScreen));
