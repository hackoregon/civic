import { Fragment } from "react";
import PropTypes from "prop-types";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const exampleStyle = css`
  color: blue;
`;

const ButtonNew = ({ message }) => (
  <Fragment>
    <h1 css={exampleStyle}>{message}</h1>
    <h1 css={exampleStyle}>This message is baked in!</h1>
  </Fragment>
);

ButtonNew.propTypes = {
  message: PropTypes.string
};

ButtonNew.defaultProps = {
  message: "Hi! I'm a new blue component"
};

ButtonNew.displayName = "ButtonNew";

export default ButtonNew;
