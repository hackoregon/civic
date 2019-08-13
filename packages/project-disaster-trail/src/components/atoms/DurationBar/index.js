/** @jsx jsx */
import { memo } from "react";
import { connect } from "react-redux";
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { getPercentComplete } from "../../../state/tasks";

const durationBarStepStyle = css`
  display: grid;
  height: 100%;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);

  color: #ffffff;
  vertical-align: middle;
  font-family: "Roboto", sans-serif;
  font-size: 1.5em;
  text-align: center;
`;

const DurationBar = ({ step, percentComplete }) => {
  const containerStyle = css`
    position: relative;
    width: 100%;
  `;

  const durationBarStyle = css`
    width: 100%;
    height: 40px;
    margin: 0;
    background-color: #721d7c;
    transform: translateX(-${percentComplete * 100}%);
  `;

  return (
    <div css={containerStyle}>
      <div
        css={css`
          ${durationBarStyle}
        `}
      >
        <div
          css={css`
            ${durationBarStepStyle}
          `}
        >
          <span>{step}</span>
          <span>{step}</span>
          <span>{step}</span>
        </div>
      </div>
      <div
        css={css`
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
        `}
      >
        <p>{Math.round(percentComplete * 100) || 0}</p>
      </div>
    </div>
  );
};

DurationBar.propTypes = {
  step: PropTypes.string,
  percentComplete: PropTypes.number
};

DurationBar.defaultProps = {
  step: "Current step"
};

const mapStateToProps = state => ({
  percentComplete: getPercentComplete(state)
});

export default connect(mapStateToProps)(memo(DurationBar));
