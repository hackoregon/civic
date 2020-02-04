/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { useState, useEffect, useCallback } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { resetState as _resetStateTasks } from "../../../state/tasks";
import { resetState as _resetStateKit } from "../../../state/kit";
import {
  goToChapter as _goToChapter,
  goToNextChapter as _goToNextChapter
} from "../../../state/chapters";
import { getReloadMode } from "../../../state/settings";
import usePrevious from "../../../state/hooks/usePrevious";
import {
  playAudio as _playAudio,
  stopAudio as _stopAudio
} from "../../../state/sfx";
import Timer from "../../../utils/timer";

import { TYPES as SFX_TYPES } from "../../../constants/sfx";
import { palette } from "../../../constants/style";
import QRCode from "../../../../assets/earthquake-heroes-qr-code.svg";
import BadgesBar from "./BadgesDrawer";
import SavedBar from "./SavedBar";

const pageWrapper = css`
  display: grid;
  height: 100vh;
  grid-template-rows: 300px auto;
  z-index: 10;
  overflow: hidden;
  position: relative;
`;

const titleBarContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: center;
  padding: 0 40px;
`;

const bigBadgesStyle = css`
  position: absolute;
  top: 45%;
  right: 37%;
  transform: scale(2);
`;

const bigSavedStyle = css`
  position: absolute;
  top: 63%;
  right: 43%;
  transform: scale(2);
`;

const QRCodeStyle = css`
  height: 160px;
  z-index: 10;
`;

const centeredQRCode = css`
  height: 300px;
  margin: 50px auto 0;
`;

const contentContainer = css`
  position: absolute;
  transform: translateX(+200%);
  transition: transform 3s;
  top: 570px;
  left: 15vw;

  display: grid;
  align-content: center;
  justify-content: center;
  text-align: center;
  width: 70vw;
  grid-row-gap: 50px;
`;

const centerContent = css`
  transform: translateX(0%);
`;

const exitContent = css`
  transform: translateX(-300%);
`;

const contentTitle = css`
  font-family: "Akkurat", sans-serif;
  font-weight: bold;
  font-size: 14rem;
  color: ${palette.darkBlue};
  margin: 0;
`;

const topStyle = css`
  margin-top: -65px;
`;

const contentText = css`
  font-family: "Akkurat", sans-serif;
  font-size: 9rem;
  line-height: 11rem;
  color: ${palette.darkGrey};
  margin: 0;

  > span {
    color: ${palette.red};
  }
`;

const buttonWrapper = css`
  display: grid;
  align-items: start;
  justify-items: center;
  align-self: end;
  margin-bottom: 100px;
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
  font-family: "Akkurat", sans-serif;
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
    ${palette.mediumGrey} 50%,
    ${palette.lightestGrey} 50%
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

const SummaryScreen = ({
  goToNextChapter,
  resetStateKit,
  resetStateTasks,
  goToChapter,
  increasePlayCount,
  playCount,
  reloadMode,
  playAudio,
  stopAudio
}) => {
  const [animationTimer] = useState(new Timer());
  const [animationPhaseIndex, setAnimationPhaseIndex] = useState(-1);
  const animationPhases = [
    { duration: 3 },
    { duration: 7 },
    { duration: 7 },
    { duration: 7 },
    { duration: 20 }
  ];
  const prevAnimationPhaseIndex = usePrevious(animationPhaseIndex);

  const restartGame = useCallback(
    toAttractorScreen => {
      resetStateKit();
      resetStateTasks();
      if (reloadMode && playCount === 5) {
        /* eslint-disable */
        location.reload();
        /* eslint-enable */
      } else if (toAttractorScreen === true) {
        goToNextChapter();
      } else {
        goToChapter(1);
      }
    },
    [
      goToNextChapter,
      playCount,
      reloadMode,
      goToChapter,
      resetStateKit,
      resetStateTasks
    ]
  );

  const transitionAnimation = useCallback(() => {
    setAnimationPhaseIndex(
      lastAnimationPhaseIndex => lastAnimationPhaseIndex + 1
    );
  }, []);

  useEffect(() => {
    if (
      prevAnimationPhaseIndex !== animationPhaseIndex &&
      animationPhaseIndex > -1
    ) {
      if (animationPhaseIndex < animationPhases.length) {
        const nextPhase = animationPhases[animationPhaseIndex];
        animationTimer.reset();
        animationTimer.setDuration(nextPhase.duration);
        animationTimer.addCompleteCallback(transitionAnimation);
        animationTimer.start();
      } else {
        animationTimer.stop();
        restartGame(true);
      }
    }
  }, [
    animationPhaseIndex,
    animationPhases,
    animationPhases.length,
    animationTimer,
    prevAnimationPhaseIndex,
    restartGame,
    transitionAnimation
  ]);

  // Timer: on chapter start
  useEffect(() => {
    increasePlayCount();
    transitionAnimation();
    return () => {
      animationTimer.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Music
  useEffect(() => {
    const increasedAnimationIndex =
      prevAnimationPhaseIndex !== animationPhaseIndex;
    if (increasedAnimationIndex) {
      if (animationPhaseIndex === -1) {
        playAudio(SFX_TYPES.SUMMARY_MOTIVATION);
      }
      if (animationPhaseIndex === 1) {
        playAudio(SFX_TYPES.SUMMARY_PLAN);
      } else if (animationPhaseIndex === 2) {
        playAudio(SFX_TYPES.SUMMARY_COMMUNITY);
      } else if (animationPhaseIndex === 3) {
        playAudio(SFX_TYPES.SUMMARY_KIT);
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [prevAnimationPhaseIndex, animationPhaseIndex, animationPhaseIndex]);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    playAudio(SFX_TYPES.THEME_SUMMARY);

    return () => {
      stopAudio(SFX_TYPES.THEME_SUMMARY);
      stopAudio(SFX_TYPES.SUMMARY_MOTIVATION);
      stopAudio(SFX_TYPES.SUMMARY_PLAN);
      stopAudio(SFX_TYPES.SUMMARY_COMMUNITY);
      stopAudio(SFX_TYPES.SUMMARY_KIT);
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
          alt="QR code for civicplatform.org/EarthquakeHeroes"
          css={QRCodeStyle}
        />
        <BadgesBar
          initialSummaryStyle={animationPhaseIndex <= 0 ? bigBadgesStyle : null}
        />
        <SavedBar
          initialSummaryStyle={animationPhaseIndex <= 0 ? bigSavedStyle : null}
        />
      </div>

      <div
        css={css`
        ${contentContainer}
        ${animationPhaseIndex <= 0 ? centerContent : ""}
        ${animationPhaseIndex > 0 ? exitContent : ""}
      `}
      >
        <p css={[contentTitle, topStyle]}>YOUR ACTS OF HEROISM</p>
      </div>

      <div
        css={css`
        ${contentContainer}
        ${animationPhaseIndex === 1 ? centerContent : ""}
        ${animationPhaseIndex > 1 ? exitContent : ""}
      `}
      >
        <p css={contentTitle}>MAKE A PLAN</p>
        <p css={contentText}>
          Talk to your family about where you will meet after an earthquake.
        </p>
      </div>

      <div
        css={css`
        ${contentContainer}
        ${animationPhaseIndex === 2 ? centerContent : ""}
        ${animationPhaseIndex > 2 ? exitContent : ""}
      `}
      >
        <p css={contentTitle}>MEET YOUR NEIGHBORS</p>
        <p css={contentText}>
          Do you have neighbors who will need extra help after a disaster?
        </p>
      </div>

      <div
        css={css`
        ${contentContainer}
        ${animationPhaseIndex === 3 ? centerContent : ""}
        ${animationPhaseIndex > 3 ? exitContent : ""}
      `}
      >
        <p css={contentTitle}>BUILD A DISASTER KIT</p>
        <p css={contentText}>
          Gather enough supplies for your family for at least seven days!
        </p>
      </div>

      <div
        css={css`
          ${contentContainer}
          ${animationPhaseIndex >= 4 ? centerContent : ""}
        `}
      >
        <p css={contentText}>
          For more information about earthquake preparedness in Portland, visit{" "}
          <span>CivicPlatform.org/EarthquakeHeroes</span>
        </p>
        <img
          src={QRCode}
          alt="QR code for civicplatform.org/EarthquakeHeroes"
          css={centeredQRCode}
        />
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
    </div>
  );
};

SummaryScreen.propTypes = {
  goToNextChapter: PropTypes.func,
  goToChapter: PropTypes.func,
  resetStateKit: PropTypes.func,
  resetStateTasks: PropTypes.func,
  increasePlayCount: PropTypes.func,
  playCount: PropTypes.number,
  reloadMode: PropTypes.bool,
  playAudio: PropTypes.func,
  stopAudio: PropTypes.func
};

const mapStateToProps = state => ({
  reloadMode: getReloadMode(state)
});

const mapDispatchToProps = dispatch => ({
  goToNextChapter: bindActionCreators(_goToNextChapter, dispatch),
  goToChapter: bindActionCreators(_goToChapter, dispatch),
  resetStateKit: bindActionCreators(_resetStateKit, dispatch),
  resetStateTasks: bindActionCreators(_resetStateTasks, dispatch),
  playAudio: bindActionCreators(_playAudio, dispatch),
  stopAudio: bindActionCreators(_stopAudio, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryScreen);
