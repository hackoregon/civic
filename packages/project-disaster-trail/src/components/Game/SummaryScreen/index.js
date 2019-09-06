/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";

import { palette } from "../../../constants/style";

const pageWrapper = css`
  display: grid;
  height: 100vh;
`;

const pitStop = keyframes`
  from {
    transform: translateX(+100%);
    opacity: 0;
  }
  20% {
    transform: translateX(0);
    opacity: 1;
  }
  80% {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
  }
`;

const contentWrapper = css`
  height: 100vh;
  width: 100vw;
  z-index: 10;
  display: grid;
  align-content: center;
  padding: 0 10%;

  animation: ${pitStop} 15s ease-in-out;
`;

const titleFont = css`
  font-family: "Boogaloo", cursive;
  color: ${palette.purple};
  font-size: 6em;
  margin-bottom: 1em;
  justify-self: start;
`;

const contentFont = css`
  font-family: "Boogaloo", cursive;
  color: ${palette.salmon};
  font-size: 4em;
  line-height: 1.3em;
  text-align: center;
  margin: 0 auto;
  max-width: 50%;
  justify-self: end;
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

const SummaryScreen = () => {
  return (
    <div css={pageWrapper}>
      <div css={bg} />
      <div css={[bg, bg2]} />
      <div css={[bg, bg3]} />
      <div css={contentWrapper}>
        <h1 css={titleFont}>Plan with your family!</h1>
        <h2 css={contentFont}>
          Ask your parents where to meet after an earthquake.
        </h2>
      </div>
    </div>
  );
};

/*
  Content to transition in after the above content, in order. After that, the game is done. Could loop these

  <div css={contentWrapper}>
    <h1 css={titleFont}>Talk to neighbors</h1>
    <h2 css={contentFont}>
      Do you have an elderly neighbor who might need help after an earthquake?
    </h2>
  </div>

  <div css={contentWrapper}>
    <h1 css={titleFont}>Prepare your home, car, and school</h1>
    <h2 css={contentFont}>
      Does your family have water supplies in the car and the house?
    </h2>
  </div>
*/

export default SummaryScreen;
