/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
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

const SummaryScreen = ({ songFile }) => {
  return (
    <div css={pageWrapper}>
      <div css={bg} />
      <div css={[bg, bg2]} />
      <div css={[bg, bg3]} />
      <div css={allContent}>
        <div css={contentWrapper}>
          <h1 css={titleFont}>Plan with your family!</h1>
          <h2 css={contentFont}>
            Ask your parents where to meet after an earthquake.
          </h2>
        </div>
        <div css={contentWrapper}>
          <h1 css={titleFont}>Talk to neighbors</h1>
          <h2 css={contentFont}>
            Do you have an elderly neighbor who might need help after an
            earthquake?
          </h2>
        </div>
        <div css={contentWrapper}>
          <h1 css={titleFont}>Prepare your home, car, and school</h1>
          <h2 css={contentFont}>
            Does your family have water supplies in the car and the house?
          </h2>
        </div>
      </div>
      {songFile && <Song songFile={songFile} />}
    </div>
  );
};

export default SummaryScreen;
