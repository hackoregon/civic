import { memo, useState, useEffect } from "react";
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { palette } from "../../../constants/style";
import { goToNextChapter } from "../../../state/chapters";
import Timer from "../../../utils/timer";
import Song from "../../atoms/Audio/Song";
import neutralMood from "../../../../assets/audio/neutral-mood.mp3";

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

const Outro = ({ endChapter, children, chapterDuration }) => {
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

  return (
    <div css={pageWrapper}>
      <div css={bg} />
      <div css={[bg, bg2]} />
      <div css={[bg, bg3]} />
      {children}
      <Song songFile={neutralMood} />
    </div>
  );
};

Outro.propTypes = {
  children: PropTypes.shape({}),
  endChapter: PropTypes.func,
  chapterDuration: PropTypes.number
};

const mapDispatchToProps = dispatch => ({
  endChapter() {
    dispatch(goToNextChapter());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(memo(Outro));
