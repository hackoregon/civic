import { memo, useEffect } from "react";
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { palette } from "../../../constants/style";
import { goToNextChapter } from "../../../state/chapters";
import {
  playSFX as _playSFX,
  playAudio as _playAudio,
  stopAudio as _stopAudio
} from "../../../state/sfx";
import media from "../../../utils/mediaQueries";
import { TYPES as SFX_TYPES } from "../../../constants/sfx";
import earthquakeHeroesLogo from "../../../../assets/earthquake_heroes_logo.svg";

const pageWrapper = css`
  display: grid;
  height: 100vh;
`;

const contentWrapper = css`
  height: 100vh;
  width: 100vw;
  z-index: 10;
  display: grid;
  grid-template-rows: 1fr 200px;

  ${media.lg} {
    grid-template-rows: 1fr 250px;
  }

  ${media.xl} {
    grid-template-rows: 1fr 700px;
  }
`;

const logoStyle = css`
  margin: 0;
  align-self: center;
  justify-self: center;
  width: 2500px;
`;

const buttonWrapper = css`
  display: grid;
  align-self: end;
  align-items: start;
  justify-items: center;
  height: 100%;
`;

const buttonStyle = css`
  position: relative;
  width: 630px;
  height: 480px;
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
  font-size: 12rem;
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

const AttractorScreen = ({ goToChapter, playSFX, playAudio, stopAudio }) => {
  const play = () => {
    playSFX(SFX_TYPES.START_RECORD);
    goToChapter();
  };

  useEffect(() => {
    playAudio(SFX_TYPES.THEME_ATTRACTOR);

    return () => {
      stopAudio(SFX_TYPES.THEME_ATTRACTOR);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={pageWrapper}>
      <div css={bg} />
      <div css={[bg, bg2]} />
      <div css={[bg, bg3]} />
      <div css={contentWrapper}>
        <img
          src={earthquakeHeroesLogo}
          css={logoStyle}
          alt="Earthquake Heroes"
        />
        <div css={buttonWrapper}>
          <button
            type="button"
            onClick={play}
            onTouchEnd={play}
            css={buttonStyle}
          >
            <p css={buttonFont}>PLAY</p>
          </button>
        </div>
      </div>
    </div>
  );
};

AttractorScreen.propTypes = {
  goToChapter: PropTypes.func,
  playSFX: PropTypes.func,
  playAudio: PropTypes.func,
  stopAudio: PropTypes.func
};

export default connect(
  null,
  dispatch => ({
    goToChapter(chapter) {
      dispatch(goToNextChapter(chapter));
    },
    playSFX(id) {
      dispatch(_playSFX(id));
    },
    playAudio(themeName) {
      dispatch(_playAudio(themeName));
    },
    stopAudio(themeName) {
      dispatch(_stopAudio(themeName));
    }
  })
)(memo(AttractorScreen));
