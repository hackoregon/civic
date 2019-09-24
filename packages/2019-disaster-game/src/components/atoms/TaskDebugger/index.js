import { memo } from "react";
import { PropTypes } from "prop-types";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const containerStyle = css`
  position: absolute;
  right: 0;
  top: 0;
  border: 2px solid red;
  z-index: 102;
`;

const TaskDebugView = ({ action }) => {
  return (
    <div css={containerStyle}>
      <p>Action: {action}</p>
    </div>
  );
};

TaskDebugView.propTypes = {
  action: PropTypes.string
};

export default memo(TaskDebugView);
