---
to: packages/<%=package%>/src/<%=component%>/<%=component%>.js
---
/* eslint-disable import/prefer-default-export */
import { Fragment } from "react";
import PropTypes from "prop-types";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const exampleStyle = css`
  color: blue;
`;

export const <%=component%> = ({message}) => (
  <Fragment>
    <h1 css={exampleStyle}>{message}</h1>
    <h1 css={exampleStyle}>This message is baked in!</h1>
  </Fragment>
);

<%=component%>.propTypes = {
  /** This message is displayed by the component in an H1 */
  message: PropTypes.string
};

<%=component%>.defaultProps = {
  message: "Hi! I'm a new blue component"
};

<%=component%>.displayName = "<%=component%>";
