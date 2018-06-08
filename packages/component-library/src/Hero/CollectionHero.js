import React from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';
import { css } from 'emotion';

const teamTitleStyle = css`
  display: block;
  font-size: 13px;
  font-family: 'Rubik';
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const CollectionHero = ({ heroTitle, heroSubtitle, mainProjectColor, teamTitle }) => (
  <Hero mainProjectColor={mainProjectColor}>
    <div>
      <span className={teamTitleStyle}>{teamTitle}</span>
      <h1 className={'Title'}>{heroTitle}</h1>
      <h2>{heroSubtitle}</h2>
    </div>
  </Hero>
);

CollectionHero.propTypes = {
  teamTitle: PropTypes.string,
  heroTitle: PropTypes.string,
  heroSubtitle: PropTypes.string,
  mainProjectColor: PropTypes.string,
};

export default CollectionHero;
