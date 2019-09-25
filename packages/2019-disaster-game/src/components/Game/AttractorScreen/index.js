import { memo } from "react";
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { palette } from "../../../constants/style";
import { goToNextChapter } from "../../../state/chapters";
import { playSFX as _playSFX } from "../../../state/sfx";
import media from "../../../utils/mediaQueries";
import Song from "../../atoms/Audio/Song";
import { TYPES as SFX_TYPES } from "../../../constants/sfx";

import attractorSong from "../../../../assets/audio/PWolf-happysong1wfadeinout.mp3";
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
  height: 80%;
  padding-right: 30%;
  padding-left: 0;
  border-radius: 40%;
  color: white;
  background-color: ${palette.salmon};
  box-shadow: 0px 100px 0px 0px ${palette.mediumSalmon};
  border: none;
  cursor: pointer;
  outline: none;

  &:active {
    background-color: ${palette.mediumSalmon};
    box-shadow: 0px 100px 0px 0px ${palette.darkSalmon};
  }
`;

const buttonFont = css`
  position: absolute;
  width: 100%;
  margin: 0 auto;
  font-family: "Boogaloo", cursive;
  font-size: 18em;
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

const AttractorScreen = ({ goToChapter, playSFX }) => {
  const play = () => {
    playSFX(SFX_TYPES.START_RECORD);
    goToChapter();
  };

  return (
    <div css={pageWrapper}>
      <Song songFile={attractorSong} />
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
            <h2 css={buttonFont}>PLAY</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

AttractorScreen.propTypes = {
  goToChapter: PropTypes.func,
  playSFX: PropTypes.func
};

export default connect(
  null,
  dispatch => ({
    goToChapter(chapter) {
      dispatch(goToNextChapter(chapter));
    },
    playSFX(id) {
      dispatch(_playSFX(id));
    }
  })
)(memo(AttractorScreen));
