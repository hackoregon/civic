/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { resetState as resetStateTasks } from "../../../state/tasks";
import { resetState as resetStateKit } from "../../../state/kit";
import { resetState as resetStateUser } from "../../../state/user";
import { goToChapter, goToNextChapter } from "../../../state/chapters";
import Timer from "../../../utils/timer";

import motivationalAudio from "../../../../assets/audio/summary_screen/8_boy_you_did_great.mp3";
import summarySong from "../../../../assets/audio/summary_screen/summary_song.mp3";
import Song from "../../atoms/Audio/Song";

import { palette } from "../../../constants/style";
import QRCode from "../../../../assets/earthquake-heroes-qr-code.svg";
import BadgesBar from "../../atoms/TitleBar/BadgesDrawer";
import SavedBar from "../../atoms/TitleBar/SavedBar";

const pageWrapper = css`
  display: grid;
  height: 100vh;
  grid-template-rows: 300px auto 650px;
  z-index: 10;
`;

const titleBarContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: center;
  padding: 0 40px;
`;

const QRCodeStyle = css`
  height: 160px;
  z-index: 10;
`;

const accomplishmentsContainer = css`
  display: grid;
  grid-template-columns: repeat(3, auto);
`;

const contentContainer = css`
  display: grid;
  align-content: center;
  justify-content: center;
  position: relative;
  text-align: center;
  max-width: 80vw;
  margin: 0 auto;
`;

const contentTitle = css`
  font-family: "Luckiest Guy", sans-serif;
  font-size: 16rem;
  color: ${palette.salmon};
  margin: 0;
`;

const contentText = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 12rem;
  line-height: 14rem;
  color: ${palette.purple};
  margin: 0;
`;

const buttonWrapper = css`
  display: grid;
  align-items: start;
  justify-items: center;
  align-self: center;
`;

const buttonStyle = css`
  position: relative;
  width: 600px;
  height: 400px;
  display: grid;
  align-content: center;
  border-radius: 100%;
  background-color: ${palette.red};
  box-shadow: 0px 50px 0px 0px ${palette.darkRed};
  border: none;
  cursor: pointer;
  outline: none;

  &:active {
    background-color: ${palette.darkRed};
    box-shadow: 0px 50px 0px 0px ${palette.darkestRed};
  }
`;

const buttonFont = css`
  width: 100%;
  margin: 0 auto;
  font-family: "Luckiest Guy", sans-serif;
  font-size: 8rem;
  color: white;
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
  endChapter,
  resetKitState,
  resetTasksState,
  resetUserState,
  replay
}) => {
  const [chapterTimer] = useState(new Timer());
  const [restartingGame, setRestartingGame] = useState(false);

  const restartGame = toAttractorScreen => {
    setRestartingGame(true);
    resetKitState();
    resetTasksState();
    resetUserState();
    if (toAttractorScreen === true) {
      endChapter();
    } else {
      replay(1);
    }
  };

  // Timer: on chapter start
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => {
      if (!restartingGame) restartGame(true);
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
      <div css={titleBarContainer}>
        <img
          src={QRCode}
          alt="QR code for civicplatform.org"
          css={QRCodeStyle}
        />
        <div css={accomplishmentsContainer}>
          <div
            css={css`
              justify-self: stretch;
            `}
          />
          <BadgesBar isSummary />
          <SavedBar isSummary />
        </div>
      </div>
      <div css={contentContainer}>
        <p css={contentTitle}>MEET YOUR NEIGHBORS</p>
        <p css={contentText}>
          Do you have neighbors who will need extra help after a disaster?
        </p>
      </div>
      <div css={buttonWrapper}>
        <button
          type="button"
          css={buttonStyle}
          onClick={restartGame}
          onTouchEnd={restartGame}
        >
          <p css={buttonFont}>PLAY AGAIN</p>
        </button>
      </div>
      <Song songFile={summarySong} />
      <Song songFile={motivationalAudio} shouldLoop={false} volume={1.0} />
    </div>
  );
};

SummaryScreen.propTypes = {
  endChapter: PropTypes.func,
  replay: PropTypes.func,
  resetKitState: PropTypes.func,
  resetTasksState: PropTypes.func,
  resetUserState: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  endChapter: bindActionCreators(goToNextChapter, dispatch),
  replay: bindActionCreators(goToChapter, dispatch),
  resetKitState: bindActionCreators(resetStateKit, dispatch),
  resetTasksState: bindActionCreators(resetStateTasks, dispatch),
  resetUserState: bindActionCreators(resetStateUser, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(SummaryScreen);
