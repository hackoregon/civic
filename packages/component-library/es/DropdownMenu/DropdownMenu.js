import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import isClient from '../utils/isClient';
import styles from './Dropdown.styles.css';

if (isClient) require('../../assets/vendor/react-select.min.css');

var cx = classNames.bind(styles);

var className = cx({ base: true });

var Dropdown = function Dropdown(_ref) {
  var options = _ref.options,
      onChange = _ref.onChange,
      value = _ref.value,
      clearable = _ref.clearable,
      searchable = _ref.searchable,
      disabled = _ref.disabled;
  return React.createElement(Select, {
    className: className,
    options: options,
    onChange: onChange,
    value: value,
    clearable: clearable,
    searchable: searchable,
    disabled: disabled
  });
};

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  disabled: PropTypes.bool
};

Dropdown.defaultProps = {
  clearable: false,
  searchable: true,
  disabled: false
};

export default Dropdown;