/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import Palette from "../../../constants/style";
import Badge from "./Badge";

const containerStyle = css`
  position: relative;
  display: inline-block;
  float: right;
  padding-top: 20px;
`;

const statsContainer = css`
  > p {
    display: inline-block;
    color: ${Palette.lightGrey};
  }
`;

const leftStatGroup = css`
  margin-right: 20px;
  display: inline-block;

  > p {
    display: inline-block;
    color: ${Palette.lightGrey};
  }
`;

const statText = css`
  font-size: 50px;
  margin: 0 10px 0 0;
`;

const statNumber = css`
  font-size: 65px;
  font-weight: bold;
  margin: 0;
`;

const badgesContainer = css`
  margin-top: 20px;
`;

const PlayerStats = () => {
  return (
    <div css={containerStyle}>
      <div css={statsContainer}>
        <div css={leftStatGroup}>
          <p css={statText}>People</p>
          <p css={statNumber}>0</p>
        </div>
        <p css={statText}>Pets</p>
        <p css={statNumber}>0</p>
      </div>
      <div css={badgesContainer}>
        <Badge />
      </div>
    </div>
  );
};

export default PlayerStats;
