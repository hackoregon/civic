import React, { memo } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { getChapterById } from "../../../state/chapters";

const DefaultScreen = ({ chapterModel }) => (
  <>
    <h1>
      {chapterModel.id}. {chapterModel.title} screen
    </h1>
  </>
);

DefaultScreen.propTypes = {
  chapterModel: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number
  })
};

const mapStateToProps = (state, ownProps) => ({
  chapterModel: getChapterById({ ...state, id: ownProps.chapterId })
});

export default connect(mapStateToProps)(memo(DefaultScreen));
