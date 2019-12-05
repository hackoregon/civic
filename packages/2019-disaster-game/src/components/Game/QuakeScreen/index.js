/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { memo, useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { sample } from "lodash";

import { palette } from "../../../constants/style";
import { TYPES as SFX_TYPES } from "../../../constants/sfx";
import {
  playAudio as _playAudio,
  stopAudio as _stopAudio
} from "../../../state/sfx";
import {
  goToNextChapter,
  getActiveChapterDuration
} from "../../../state/chapters";
import Timer from "../../../utils/timer";
import videoFile from "../../../../assets/video/OMG_EARTHQUAKE.mp4";

const containerStyle = css`
  position: relative;
`;

const videoStyles = css`
  width: 100vw;
  height: auto;
`;

const messageStyle = css`
  position: absolute;
  width: 1000px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.5s;

  > p {
    font-family: "Luckiest Guy", sans-serif;
    font-size: 20rem;
    margin: 0;
    line-height: normal;

    color: #ffffff;
    text-shadow: 0 10px 0px ${palette.red}, 10px 0 0px ${palette.darkRed},
      10px 20px 10px ${palette.red}, 20px 10px 10px ${palette.darkRed},
      20px 30px 20px ${palette.red}, 30px 20px 20px ${palette.darkRed},
      30px 40px 20px ${palette.red}, 40px 30px 30px ${palette.darkRed},
      40px 50px 30px ${palette.red}, 50px 40px 20px ${palette.darkRed},
      50px 60px 20px ${palette.red}, 60px 50px 20px ${palette.darkRed},
      60px 70px 10px ${palette.red}, 70px 60px 10px ${palette.darkRed},
      70px 80px 0px ${palette.red}, 80px 70px 0px ${palette.darkRed};
  }
`;

const dropStyle = css`
  top: 20vh;
  left: 10vw;
`;

const takeCoverStyle = css`
  top: 35vh;
  left: 35vw;
`;

const holdOnStyle = css`
  top: 60vh;
  right: 10vw;
`;

const visibleMessage = css`
  opacity: 1;
`;

const QuakeScreen = ({ endChapter, chapterDuration, playAudio, stopAudio }) => {
  const [chapterTimer] = useState(new Timer());
  const [showDrop, setShowDrop] = useState(false);
  const [showTakeCover, setShowTakeCover] = useState(false);
  const [showHoldOn, setShowHoldOn] = useState(false);

  // start a timer for the _entire_ chapter
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterDuration, chapterTimer, endChapter]);

  // Music
  useEffect(() => {
    const instructionalAudio = sample([
      SFX_TYPES.EARTHQUAKE_BOY,
      SFX_TYPES.EARTHQUAKE_GIRL
    ]);

    playAudio(SFX_TYPES.THEME_EARTHQUAKE);
    playAudio(instructionalAudio);

    return () => {
      stopAudio(SFX_TYPES.THEME_EARTHQUAKE);
      stopAudio(instructionalAudio);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Message timers
  useEffect(() => {
    const dropTimeout = setTimeout(() => setShowDrop(true), 1000);
    const takeCoverTimeout = setTimeout(() => setShowTakeCover(true), 1500);
    const holdOnTimeout = setTimeout(() => setShowHoldOn(true), 2000);

    const hideDropTimeout = setTimeout(() => setShowDrop(false), 5000);
    const hideTakeCoverTimeout = setTimeout(
      () => setShowTakeCover(false),
      5000
    );
    const hideHoldOnTimeout = setTimeout(() => setShowHoldOn(false), 5000);

    return () => {
      clearTimeout(dropTimeout);
      clearTimeout(takeCoverTimeout);
      clearTimeout(holdOnTimeout);

      clearTimeout(hideDropTimeout);
      clearTimeout(hideTakeCoverTimeout);
      clearTimeout(hideHoldOnTimeout);
    };
  }, []);

  return (
    <div css={containerStyle}>
      {/* eslint-disable jsx-a11y/media-has-caption */}
      <video css={videoStyles} autoPlay>
        <source type="video/mp4" src={videoFile} />
      </video>
      <div
        css={css`
          ${messageStyle};
          ${dropStyle};
          ${showDrop && visibleMessage};
        `}
      >
        <p>DROP</p>
      </div>
      <div
        css={css`
          ${messageStyle};
          ${takeCoverStyle};
          ${showTakeCover && visibleMessage};
        `}
      >
        <p>TAKE COVER</p>
      </div>
      <div
        css={css`
          ${messageStyle};
          ${holdOnStyle};
          ${showHoldOn && visibleMessage};
        `}
      >
        <p>HOLD ON</p>
      </div>
    </div>
  );
};

QuakeScreen.propTypes = {
  endChapter: PropTypes.func,
  chapterDuration: PropTypes.number,
  playAudio: PropTypes.func,
  stopAudio: PropTypes.func
};

const mapStateToProps = state => ({
  chapterDuration: getActiveChapterDuration(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter: bindActionCreators(goToNextChapter, dispatch),
  playAudio: bindActionCreators(_playAudio, dispatch),
  stopAudio: bindActionCreators(_stopAudio, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(QuakeScreen));
