/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const buttonClass = props => css`
  display: ${props.display};
  margin: ${props.margin};
  padding: 6px;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  transition: ${props.transition};
  font-size: 1em;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  color: ${props.accentColor};
  background: ${props.bkgndColor};
  cursor: pointer;
  border: 2px solid ${props.accentColor};

  i {
    margin-right: 12px;
  }

  span {
    flex-wrap: nowrap;
    transition: ${props.transition};
  }

  &:hover {
    background-color: ${props.accentColor};
    color: ${props.bkgndColor};
  }

  &:focus {
    outline: none;
  }
`;

/**
 * A simple Button with some styling parameters.
 */

export const Button = ({ children, onClick, ...props }) => (
  <button type="button" css={buttonClass(props)} onClick={onClick}>
    {children}
  </button>
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  display: PropTypes.string,
  margin: PropTypes.string,
  accentColor: PropTypes.string,
  bkgndColor: PropTypes.string,
  transition: PropTypes.string
};

Button.defaultProps = {
  display: "block",
  margin: "12px",
  accentColor: "#1E62BD",
  bkgndColor: "#FFFFFF",
  transition: "all .2s ease-in-out"
};
