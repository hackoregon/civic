import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import CivicStoryCard from '../CivicStoryCard/CivicStoryCard';
import Header from '../Navigation/Header'
import CollectionHero from '../Hero/CollectionHero'


const PageLayout = ({ cardId, collectionId, heroTitle, heroSubtitle, title, mainProjectColor, children }) => (
  <div>
    <Header title="Civic" mainProjectColor={mainProjectColor} overlay />
    <CollectionHero
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      mainProjectColor={mainProjectColor}
    />
    <div style={{padding: '0px 24px'}} >
      {children}
    </div>
  </div>
);

PageLayout.displayName = 'PageLayout';

PageLayout.propTypes = {
  heroTitle: PropTypes.string,
  heroSubtitle: PropTypes.string,
  title: PropTypes.string,
  mainProjectColor: PropTypes.string,
  children: PropTypes.node,
};

export default PageLayout;
