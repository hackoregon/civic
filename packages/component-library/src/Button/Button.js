import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'emotion';

const accentColor = '#DC4556';
const commonTransition = 'all .2s ease-in-out';
const buttonClass = props => css`
  display: ${props.display || 'block'};
  margin: ${props.margin};
  padding: 6px;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  transition: ${commonTransition};
  font-size: 1em;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  color: ${accentColor};
  background: #fff;
  cursor: pointer;
  border: 2px solid ${accentColor};

  i {
    margin-right: 12px;
  }

  span {
    flex-wrap: nowrap;
    transition: ${commonTransition};
  }

  &:hover {
    background-color: ${accentColor};
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

const Button = ({ children, onClick, ...props }) => (
  <button type="button" className={buttonClass(props)} onClick={onClick}>
    {children}
  </button>
);

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
