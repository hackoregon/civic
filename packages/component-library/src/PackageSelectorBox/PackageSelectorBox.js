import React from 'react';
import { css } from 'emotion';

const backgroundColor = 'rgb(69, 69, 69)';
const accentColor = 'rgb(237, 73, 91)';
const borderColor = 'rgb(151, 151, 151)';
const commonTransition = 'all .2s ease-in-out';
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
    color: #FFF;
  }

  &:focus {
    outline: none;
  }

  h2 {
    margin: 0;
  }

  p {
    color: #fff;
  }
`;

const PackageSelector = ({ title, description, onClick }) => (
  <div className={packageSelectorClass} onClick={onClick}>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

PackageSelector.displayName = 'PackageSelector';

PackageSelector.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default PackageSelector;
