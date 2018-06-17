import React from 'react';
import PropTypes from 'prop-types';

import { css } from 'emotion';

import localSVG from '../../assets/local/local.svg';
import usaSVG from '../../assets/country/usa.svg';

const cardsWrapper = css`
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;
const card = css`
  font-family: 'Rubik';
  position: relative;
  background-color: transparent;
  font-size: 2vw;
  flex: 0 0 auto;
  width: 100%;
  padding: 12px 0;
  box-sizing: border-box;
  text-align: left;
  margin: 6px 0px;
  transition: all .3s ease-in-out;

  :hover {
    transform: translateY(-3px);
    cursor: pointer;
  }
`;
const cardTextWrapper = css`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 50%;
`;
const eyebrowStyle = css`
  display: block;
  font-family: 'Rubik';
  font-size: 14px;
  color: #EE495C;
`;
const locationTitle = css`
  display: block;
  font-family: 'Rubik';
  font-size: 18px;
  color: white;
`;

const iconWrapper = css`
  display: inline-block;
  width: 100px;
  margin: 0;
  margin-right: 24px;
  text-align: center;
`;
const locationResult = css`
  color: white;
  font-family: 'Rubik',sans-serif;
  font-size: 14px;
  width: 180px;
`;
const whyStyle = css`
  color: #ef495c;

  a {
    border: none;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;

const DataList = ({ city, state }) => {
  const missingStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE'];
  const fileName = state && !missingStates.includes(state) ? `state/${state}` : 'local/local';
  const statePath = require(`../../assets/${fileName}.svg`); // eslint-disable-line global-require, import/no-dynamic-require
  const cityResult = city === 'Portland'
    ? 'Portland'
    : <span>{`There's no CIVIC data for ${city} yet!`} <span className={whyStyle}><a href="#aboutCivic">Why?</a></span></span>;

  return (
    <div className={cardsWrapper}>
      <div className={card}>
        <div className={iconWrapper}>
          <img src={usaSVG} width="100%" />
        </div>
        <div className={cardTextWrapper}>
          <span className={eyebrowStyle}>National</span>
          <div className={locationTitle}>USA</div>
        </div>
      </div>
      <div className={card}>
        <div className={iconWrapper}>
          <img src={statePath} width="100%" />
        </div>
        <div className={cardTextWrapper}>
          <span className={eyebrowStyle}>State</span>
          <div className={locationTitle}>{ state || '?' }</div>
        </div>
      </div>
      <div className={card}>
        <div className={iconWrapper}>
          <img src={localSVG} width="70%" />
        </div>
        <div className={cardTextWrapper}>
          <span className={eyebrowStyle}>Local</span>
          <div className={locationTitle}>
            <div className={locationResult}>{cityResult}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

DataList.propTypes = {
  city: PropTypes.string,
  state: PropTypes.string,
};

export default DataList;
