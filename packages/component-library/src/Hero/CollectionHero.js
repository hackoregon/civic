import React, { PropTypes } from 'react';
import Hero from './Hero';

const CollectionHero = ({ heroTitle, heroSubtitle, mainProjectColor }) => (
  <Hero mainProjectColor={mainProjectColor}>
    <div>
      <h1 className={'Title'}>{heroTitle}</h1>
      <h2>{heroSubtitle}</h2>
    </div>
  </Hero>
);

CollectionHero.propTypes = {
  heroTitle: PropTypes.string,
  heroSubtitle: PropTypes.string,
  mainProjectColor: PropTypes.string,
};

export default CollectionHero;
