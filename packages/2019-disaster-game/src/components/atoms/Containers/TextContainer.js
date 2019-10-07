import { memo } from "react";
import { PropTypes } from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import media from "../../../utils/mediaQueries";

const textContainerStyle = css`
  padding: 0 15px;

  ${media.md} {
    max-width: 800px;
  }
`;

const TextContainer = ({ children }) => (
  <div css={textContainerStyle}>{children}</div>
);

TextContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default memo(TextContainer);
