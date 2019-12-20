import { memo, useState, useEffect } from "react";
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import {
  playAudio as _playAudio,
  stopAudio as _stopAudio
} from "../../../state/sfx";
import { TYPES as SFX_TYPES } from "../../../constants/sfx";
import { goToNextChapter as _goToNextChapter } from "../../../state/chapters";
import { palette } from "../../../constants/style";
import Timer from "../../../utils/timer";

const pageWrapper = css`
  display: grid;
  height: 100vh;
`;

// Background animation styles
const slide = keyframes`
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
`;

const bg = css`
  animation: ${slide} 6s ease-in-out infinite alternate;
  background-image: linear-gradient(
    -60deg,
    ${palette.lightLime} 50%,
    ${palette.lemon} 50%
  );
  bottom: 0;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
`;

const bg2 = css`
  animation-direction: alternate-reverse;
  animation-duration: 8s;
`;

const bg3 = css`
  animation-duration: 10s;
`;

const Outro = ({
  goToNextChapter,
  children,
  chapterDuration,
  playAudio,
  stopAudio
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
  }, [chapterTimer, goToNextChapter, chapterDuration]);

  useEffect(() => {
    playAudio(SFX_TYPES.THEME_NEUTRAL);

    return () => {
      stopAudio(SFX_TYPES.THEME_NEUTRAL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={pageWrapper}>
      <div css={bg} />
      <div css={[bg, bg2]} />
      <div css={[bg, bg3]} />
      {children}
    </div>
  );
};

Outro.propTypes = {
  children: PropTypes.shape({}),
  goToNextChapter: PropTypes.func,
  chapterDuration: PropTypes.number,
  playAudio: PropTypes.func,
  stopAudio: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  goToNextChapter: bindActionCreators(_goToNextChapter, dispatch),
  playAudio: bindActionCreators(_playAudio, dispatch),
  stopAudio: bindActionCreators(_stopAudio, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(memo(Outro));
