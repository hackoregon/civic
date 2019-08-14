/** @jsx jsx */
import { memo } from "react";
import { connect } from "react-redux";
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { getPercentComplete } from "../../../state/tasks";

import { palette } from "../../../constants/style";

const DurationBar = ({ step, percentComplete, debug = false }) => {
  const containerStyle = css`
    position: relative;
    width: 100%;
    background: ${palette.black};
  `;

  const durationBarStyle = css`
    width: 100%;
    height: 24px;
    margin: 0;
    transform: translateX(-${percentComplete * 100}%);
    background-color: ${palette.red};
  `;

  // DurationBar is now connected directly to the store's `percentComplete`
  // it's less reusable than it was but easier to work with
  return (
    <div css={containerStyle}>
      <div
        css={css`
          ${durationBarStyle}
        `}
      />
      {debug && (
        <div
          css={css`
            position: absolute;
            left: 0;
            top: -10px;
            z-index: 1;
          `}
        >
          <p
            css={css`
              color: white;
            `}
          >
            {Math.round(percentComplete * 100) || 0}%
          </p>
        </div>
      )}
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
