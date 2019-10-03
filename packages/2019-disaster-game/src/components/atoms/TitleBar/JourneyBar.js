/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { memo } from "react";

import { palette } from "../../../constants/style";
import { KIT, QUAKE, TASKS } from "../../../constants/chapters";
import { getActiveChapterId } from "../../../state/chapters";

const containerStyle = css`
  height: 175px;
  width: 2200px;
  background-color: ${palette.lime};
  display: grid;
  grid-template-columns: repeat(3, auto);
  padding: 0 80px;
  border-radius: 80px;
  align-content: center;
  justify-content: space-between;
`;

const sectionStyle = css`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;

  > p {
    font-family: "Luckiest Guy", sans-serif;
    font-size: 5.5rem;
    line-height: 100px;
    color: ${palette.yellow};
    // For some reason, p won't align center and using just one of these methods doesn't work
    margin: 0 0 -10px;
    padding-top: 10px;
  }
`;

const activeSectionStyle = css`
  > p {
    color: ${palette.red};
  }
`;

const circleStyle = css`
  height: 100px;
  width: 100px;
  border-radius: 100%;
  background-color: ${palette.yellow};
  margin-right: 20px;
`;

const JourneyBar = ({ activeChapterId }) => {
  return (
    <div css={containerStyle}>
      <div
        css={css`
          ${sectionStyle};
          ${activeChapterId === KIT && activeSectionStyle}
        `}
      >
        <div css={circleStyle} />
        <p>PREPARE A KIT</p>
      </div>
      <div
        css={css`
          ${sectionStyle};
          ${activeChapterId === QUAKE && activeSectionStyle}
        `}
      >
        <div css={circleStyle} />
        <p>GET READY</p>
      </div>
      <div
        css={css`
          ${sectionStyle};
          ${activeChapterId === TASKS && activeSectionStyle}
        `}
      >
        <div css={circleStyle} />
        <p>HELP NEIGHBORS</p>
      </div>
    </div>
  );
};

JourneyBar.propTypes = {
  activeChapterId: PropTypes.string
};

const mapStateToProps = state => ({
  activeChapterId: getActiveChapterId(state)
});

export default connect(mapStateToProps)(memo(JourneyBar));
