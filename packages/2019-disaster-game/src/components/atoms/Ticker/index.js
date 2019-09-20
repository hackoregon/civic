import { memo } from "react";
import { PropTypes } from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { palette } from "../../../constants/style";
import media from "../../../utils/mediaQueries";

const containerStyle = css`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  background: ${palette.blue};
  z-index: 10;
`;

const textStyle = css`
  margin: 0;
  padding: 5px 15px;
  text-align: center;
  font-family: "Boogaloo", cursive;
  font-size: 16px;
  line-height: 1;
  color: ${palette.gold};

  ${media.md} {
    font-size: 6em;
    padding: 10px 25px;
  }
`;

const Ticker = ({ text }) => {
  return (
    <div css={containerStyle}>
      <p css={textStyle}>{text}</p>
    </div>
  );
};

Ticker.propTypes = {
  text: PropTypes.string
};

export default memo(Ticker);
