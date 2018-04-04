import React from 'react';
import { css } from 'emotion';

const accentColor = 'rgb(238, 73, 80)';
const commonTransition = 'all .2s ease-in-out';
const buttonClass = css`
  display: flex;
  padding: 6px;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  transition: ${commonTransition};
  font-size: 1em;
  font-weight: 600;
  color: ${accentColor};
  background: #FFF;
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
    color: #FFF;
  }

  &:focus {
    outline: none;
  }
`;

const Button = ({ children, onClick }) => (
  <button className={buttonClass} onClick={onClick}>
    {children}
  </button>
);

Button.displayName = 'Button';

Button.propTypes = {
  children: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Button;
