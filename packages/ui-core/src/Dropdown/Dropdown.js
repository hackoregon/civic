/* eslint-disable import/prefer-default-export */
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

/**
 * A Dropdown that wraps react-select 1.3 with some custom styling
 */

export const Dropdown = ({
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
  /** onChange handler */
  onChange: PropTypes.func.isRequired,
  /** options for the dropdown */
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  /** the current value of the dropdown. if multi, an array, otherwise a value */
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  /** adds an button to clear the current value(s) */
  clearable: PropTypes.bool,
  /** enables a user to type and autocomplete from the dropdown options */
  searchable: PropTypes.bool,
  /** disables the dropdown from input */
  disabled: PropTypes.bool,
  /** pass the value to onChange as a string */
  simpleValue: PropTypes.bool,
  /** allow multiple selections from the dropdown */
  multi: PropTypes.bool,
  /** the placeholder text shown in the dropdown when nothing is selected */
  placeholder: PropTypes.string
};

Dropdown.defaultProps = {
  clearable: false,
  searchable: true,
  disabled: false
};
