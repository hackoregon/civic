import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { css } from 'emotion';

const teamTitleStyle = css`
  display: block;
  font-size: 15px;
  font-family: 'Rubik', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;

  @media (max-width: 850px) {
    font-size: 13px;
  }
`;

const itemStyle = css`
  background-color: #ffffff;
  height: 180px;
  padding: 20px 20px;
  margin: 20px;
  box-sizing: border-box;
  text-decoration: none;
  transition: opacity 0.4s ease-in-out;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.2);

  h2 {
    color: black;
    font-family: 'Rubik', sans-serif;
    font-size: 24px;
    line-height: 1.2;

    @media (max-width: 850px) {
      font-size: 20px;
    }
  }
`;

const CivicSandboxCardMobile = ({ title, link, style }) => (
  <div className={style}>
    <Link to={link}>
      <div className={itemStyle}>
        <div className={teamTitleStyle}>
          <i className={'fa fa-map-o'} aria-hidden="true" />
          {' '}Interactive Map
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  </div>
);

CivicSandboxCardMobile.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  style: PropTypes.string,
};

CivicSandboxCardMobile.defaultProps = {
  link: '/sandbox',
};

export default CivicSandboxCardMobile;
