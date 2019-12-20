/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";

import CheckmarkSVG from "../../../../assets/checkmark.svg";
import Palette from "../../../constants/style";

const containerStyle = css`
  margin: 0 auto;
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 65px;
  width: fit-content;
  align-items: center;
`;

const journeyStage = css`
  display: grid;
  grid-template-columns: 71px auto;
  grid-column-gap: 20px;
  align-items: center;

  > p {
    font-family: "Luckiest Guy", sans-serif;
    font-size: 80px;
    line-height: 80px;
    display: inline-block;
    color: ${Palette.lightGrey};
    margin: 0 0 -25px;
  }
`;

const checkmarkStyle = css`
  height: 65px;
  display: inline-block;
`;

const JourneyBar = () => {
  return (
    <div css={containerStyle}>
      <div css={journeyStage}>
        <img src={CheckmarkSVG} alt="Checkmark" css={checkmarkStyle} />
        <p>COLLECT A KIT</p>
      </div>
      <div css={journeyStage}>
        <img src={CheckmarkSVG} alt="Checkmark" css={checkmarkStyle} />
        <p>HELP YOURSELF</p>
      </div>
      <div css={journeyStage}>
        <img src={CheckmarkSVG} alt="Checkmark" css={checkmarkStyle} />
        <p>HELP NEIGHBORS</p>
      </div>
    </div>
  );
};

JourneyBar.propTypes = {
  badge: PropTypes.shape({
    badgeSVG: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    shown: PropTypes.bool,
    activeTaskIndexWhenEarned: PropTypes.oneOfType([null, PropTypes.number])
  })
};

export default JourneyBar;
