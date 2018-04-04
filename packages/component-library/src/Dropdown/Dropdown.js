import React, { PropTypes } from 'react';
import Select from 'react-select';
import { css } from 'emotion';

const dropdownClass = css`
  border: 1px solid #EEE;
  border-radius: 3px;
  background-color: #FFF;
  cursor: pointer;
  font-size: 15px;
  padding: 3px 10px;
  margin: 10px;
`;

const Dropdown = ({ options, onChange, value, clearable, searchable, disabled }) => (
  <Select
    className={dropdownClass}
    options={options}
    onChange={onChange}
    value={value}
    clearable={clearable}
    searchable={searchable}
    disabled={disabled}
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
};

Dropdown.defaultProps = {
  clearable: false,
  searchable: true,
  disabled: false,
};

export default Dropdown;
