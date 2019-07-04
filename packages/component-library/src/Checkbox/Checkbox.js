/** @jsx jsx */
/* eslint-disable */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";

/*
const checkboxClass = props => css`
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
*/

const checkboxClass = props => css`
  background: ${props.bkgndColor};
  cursor: pointer;
  border: 2px solid ${props.accentColor};
`;

const CivicCheckbox = ({ children, onClick, ...props }) => (
  <Checkbox
    variant="contained"
    onClick={onClick}
    // onChange={onChange}
    css={checkboxClass(props)}
    inputProps={{ "aria-label": "Checkbox A" }}
  />
);

CivicCheckbox.displayName = "CivicCheckbox";

CivicCheckbox.propTypes = {
  checked: PropTypes.bool,
  checkedIcon: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  // onChange: PropTypes.func,
  type: PropTypes.string,
  onClick: PropTypes.func
};

CivicCheckbox.defaultProps = {
  display: "block",
  margin: "12px",
  accentColor: "#DC4556",
  bkgndColor: "#FFFFFF",
  transition: "all .2s ease-in-out"
};

export default CivicCheckbox;
