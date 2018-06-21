import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { css } from 'emotion';

import '@hackoregon/component-library/assets/vendor/react-select.min.css';

const dropdownClass = css`
  background-color: #FFF;
  cursor: pointer;
  font-size: 15px;
  margin: 10px;
  z-index: 1404 !important;
`;

const Dropdown = ({ options, onChange, value, clearable, searchable, disabled, simpleValue, multi }) => (
  <Select
    className={dropdownClass}
    options={options}
    onChange={onChange}
    value={value}
    clearable={clearable}
    searchable={searchable}
    disabled={disabled}
    simpleValue={simpleValue}
    multi={multi}
  />
  );

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,  // eslint-disable-line react/forbid-prop-types
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  disabled: PropTypes.bool,
  simpleValue: PropTypes.bool,
  multi: PropTypes.bool,
};

Dropdown.defaultProps = {
  clearable: false,
  searchable: true,
  disabled: false,
};

export default Dropdown;
