import PropTypes from "prop-types";
import Select from "react-select";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import "../../assets/vendor/react-select.min.css";

const dropdownClass = css`
  background-color: #fff;
  cursor: pointer;
  font-size: 15px;
  margin: 10px;
  z-index: 1404 !important;
`;

const Dropdown = ({
  options,
  onChange,
  value,
  clearable,
  searchable,
  disabled,
  simpleValue,
  multi,
  placeholder
}) => (
  <Select
    css={dropdownClass}
    options={options}
    onChange={onChange}
    value={value}
    clearable={clearable}
    searchable={searchable}
    disabled={disabled}
    simpleValue={simpleValue}
    multi={multi}
    placeholder={placeholder}
  />
);

Dropdown.displayName = "Dropdown";

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  disabled: PropTypes.bool,
  simpleValue: PropTypes.bool,
  multi: PropTypes.bool,
  placeholder: PropTypes.string
};

Dropdown.defaultProps = {
  clearable: false,
  searchable: true,
  disabled: false
};

export default Dropdown;
