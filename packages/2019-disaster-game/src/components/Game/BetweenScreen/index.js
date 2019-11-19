import { memo, useState, useEffect } from "react";
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import {
  playTheme as _playTheme,
  stopTheme as _stopTheme
} from "../../../state/sfx";
import { TYPES as SFX_TYPES } from "../../../constants/sfx";
import { goToNextChapter } from "../../../state/chapters";
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
  endChapter,
  children,
  chapterDuration,
  playTheme,
  stopTheme
}) => {
  const [chapterTimer] = useState(new Timer());

  // start a timer for the _entire_ chapter
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterTimer, endChapter, chapterDuration]);

  useEffect(() => {
    playTheme(SFX_TYPES.THEME_NEUTRAL);

    return () => {
      stopTheme(SFX_TYPES.THEME_NEUTRAL);
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
  endChapter: PropTypes.func,
  chapterDuration: PropTypes.number,
  playTheme: PropTypes.func,
  stopTheme: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  endChapter: bindActionCreators(goToNextChapter, dispatch),
  playTheme: bindActionCreators(_playTheme, dispatch),
  stopTheme: bindActionCreators(_stopTheme, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(memo(Outro));
