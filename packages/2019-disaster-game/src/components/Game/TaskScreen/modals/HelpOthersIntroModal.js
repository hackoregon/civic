/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import neighborsSVG from "../../../../../assets/neighbors.svg";
import { palette } from "../../../../constants/style";

const modalContainer = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${palette.modalBackgroundGrey};
  display: grid;
  align-content: center;
  justify-content: center;
  text-align: center;
  z-index: 900;
  opacity: 1;
  transition: all 1s;
`;

const messageStyle = css`
  background-color: ${palette.white};
  padding: 100px;
  border-radius: 40px;
  justify-items: center;
  display: grid;
  width: 40vw;
  min-height: 40vh;
  display: grid;
  grid-row-gap: 50px;
  align-items: center;
`;

const textStyle = css`
  font-weight: bold;
  font-size: 7em;
  line-height: 1.3em;
  font-family: "Akkurat", sans-serif;
  color: ${palette.darkGrey};
  margin: 0;
`;

const imgStyle = css`
  height: 430px;
`;

/* eslint-disable react/jsx-curly-brace-presence */
const HelpOthersIntroModal = () => (
  <div css={modalContainer}>
    <div css={messageStyle}>
      <p css={textStyle}>{`Now that we are safe, let's help our neighbors`}</p>
      <img
        css={imgStyle}
        src={neighborsSVG}
        alt="Neighbors helping each other"
      />
    </div>
  </div>
);
/* eslint-enable react/jsx-curly-brace-presence */

export default HelpOthersIntroModal;
