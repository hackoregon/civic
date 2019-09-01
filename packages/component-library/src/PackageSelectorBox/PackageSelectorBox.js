import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const backgroundColor = "rgb(69, 69, 69)";
const accentColor = "rgb(237, 73, 91)";
const borderColor = "rgb(151, 151, 151)";
const commonTransition = "all .2s ease-in-out";
const packageSelectorClass = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 6px;
  transition: ${commonTransition};
  color: #fff;
  background: ${backgroundColor};
  cursor: pointer;
  border: 1px solid ${borderColor};
  min-height: 134px;

  @media (min-width: 600px) {
    min-height: 186px;
  }

  &:hover {
    background-color: ${accentColor};
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  h2 {
    margin: 0;
    text-align: center;
  }

  p {
    color: #fff;
  }
`;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
const PackageSelector = ({ title, description, onClick }) => (
  <div css={packageSelectorClass} onClick={onClick}>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);
/* eslint-enable jsx-a11y/click-events-have-key-events */
/* eslint-enable jsx-a11y/no-static-element-interactions */

PackageSelector.displayName = "PackageSelector";

PackageSelector.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func
};

export default PackageSelector;
