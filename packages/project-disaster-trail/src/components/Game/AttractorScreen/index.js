/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { palette } from "../../../constants/style";
import { goToNextChapter } from "../../../state/chapters";
import media from "../../../utils/mediaQueries";

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

const titleFont = css`
  font-family: "Boogaloo", cursive;
  color: ${palette.purple};
  font-size: 5em;
  margin: 0;
  align-self: center;
  justify-self: center;
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
  box-shadow: 0px 25px 0px 0px ${palette.mediumSalmon};
  border: none;
`;

const buttonFont = css`
  position: absolute;
  width: 100%;
  margin: -6% auto;
  font-family: "Boogaloo", cursive;
  font-size: 6em;
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

const AttractorScreen = ({ goToChapter }) => {
  return (
    <div css={pageWrapper}>
      <div css={bg} />
      <div css={[bg, bg2]} />
      <div css={[bg, bg3]} />
      <div css={contentWrapper}>
        <h1 css={titleFont}>EARTHQUAKE HEROES</h1>
        <div css={buttonWrapper}>
          <button type="button" onClick={goToChapter} css={buttonStyle}>
            <h2 css={buttonFont}>PLAY</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

AttractorScreen.propTypes = {
  goToChapter: PropTypes.func
};

export default connect(dispatch => ({
  goToChapter(chapter) {
    dispatch(goToNextChapter(chapter));
  }
}))(AttractorScreen);
