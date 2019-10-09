/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { sample } from "lodash";

import {
  goToNextChapter,
  getActiveChapterDuration
} from "../../../state/chapters";
import Timer from "../../../utils/timer";

import Song from "../../atoms/Audio/Song";

import songFile from "../../../../assets/audio/PWolfEarthquakesound15secmp3.mp3";
import videoFile from "../../../../assets/video/OMG_EARTHQUAKE.mp4";
import instructionalAudioBoy from "../../../../assets/audio/earthquake_screen/boy_earthquake.mp3";
import instructionalAudioGirl from "../../../../assets/audio/earthquake_screen/girl_earthquake.mp3";

const videoStyles = css`
  width: 100vw;
  height: auto;
`;

const QuakeScreen = ({ endChapter, chapterDuration }) => {
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

  const instructionalAudio = sample([
    instructionalAudioBoy,
    instructionalAudioGirl
  ]);

  return (
    <div>
      {/* eslint-disable jsx-a11y/media-has-caption */}
      <video css={videoStyles} autoPlay>
        <source type="video/mp4" src={videoFile} />
      </video>
      <Song songFile={songFile} />
      <Song songFile={instructionalAudio} shouldLoop={false} volume={1.0} />
    </div>
  );
};

QuakeScreen.propTypes = {
  endChapter: PropTypes.func,
  chapterDuration: PropTypes.number
};

const mapStateToProps = state => ({
  chapterDuration: getActiveChapterDuration(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter() {
    dispatch(goToNextChapter());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(QuakeScreen));
