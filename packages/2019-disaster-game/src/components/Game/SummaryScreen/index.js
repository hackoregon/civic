/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { resetState as resetStateTasks } from "../../../state/tasks";
import { resetState as resetStateKit } from "../../../state/kit";
import { resetState as resetStateUser } from "../../../state/user";
import { goToNextChapter } from "../../../state/chapters";
import Timer from "../../../utils/timer";
import motivationalAudio from "../../../../assets/audio/summary_screen/8_boy_you_did_great.mp3";
import Song from "../../atoms/Audio/Song";
import { palette } from "../../../constants/style";

const pageWrapper = css`
  display: grid;
  height: 100vh;
`;

const allContent = css`
  display: grid;
  align-content: center;
  justify-content: center;
  margin-top: 400px;
`;

const contentWrapper = css`
  width: 60vw;
  z-index: 10;
  display: grid;
  align-content: center;
  padding: 0 10%;
  margin: 0;
`;

const titleFont = css`
  font-family: "Boogaloo", cursive;
  color: ${palette.purple};
  font-size: 8em;
  margin-bottom: 0.5em;
  justify-self: start;
  margin-top: 0;
`;

const contentFont = css`
  font-family: "Boogaloo", cursive;
  color: ${palette.salmon};
  font-size: 6em;
  line-height: 1.3em;
  text-align: right;
  max-width: 60%;
  justify-self: end;
  margin-bottom: 1em;
  margin-top: 0.25rem;
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

const chapterDuration = 30;

const SummaryScreen = ({
  songFile,
  endChapter,
  resetKitState,
  resetTasksState,
  resetUserState
}) => {
  const [chapterTimer] = useState(new Timer());

  // Timer: on chapter start
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => {
      resetKitState();
      resetTasksState();
      resetUserState();
      endChapter();
    });
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div css={pageWrapper}>
      <div css={bg} />
      <div css={[bg, bg2]} />
      <div css={[bg, bg3]} />
      <div css={allContent}>
        <div css={contentWrapper}>
          <h1 css={titleFont}>Make A Plan</h1>
          <h2 css={contentFont}>
            Talk to your family about where you will meet after an earthquake.
          </h2>
        </div>
        <div css={contentWrapper}>
          <h1 css={titleFont}>Meet Your Neighbors</h1>
          <h2 css={contentFont}>
            Do you have neighbors who will need extra help after a disaster?
          </h2>
        </div>
        <div css={contentWrapper}>
          <h1 css={titleFont}>Build A Disaster Kit</h1>
          <h2 css={contentFont}>
            Gather enough supplies for your family for at least seven days!
          </h2>
        </div>
      </div>
      {songFile && <Song songFile={songFile} />}
      <Song songFile={motivationalAudio} shouldLoop={false} volume={1.0} />
    </div>
  );
};

SummaryScreen.propTypes = {
  endChapter: PropTypes.func,
  songFile: PropTypes.string,
  resetKitState: PropTypes.func,
  resetTasksState: PropTypes.func,
  resetUserState: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  endChapter: bindActionCreators(goToNextChapter, dispatch),
  resetKitState: bindActionCreators(resetStateKit, dispatch),
  resetTasksState: bindActionCreators(resetStateTasks, dispatch),
  resetUserState: bindActionCreators(resetStateUser, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(SummaryScreen);
