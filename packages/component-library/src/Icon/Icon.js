import PropTypes from 'prop-types';
import React from 'react';

const Icon = ({ className, handleClick }) => (
  <span>
    <i onClick={handleClick} className={className} aria-hidden="true" />
  </span>
);

Icon.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Icon;
