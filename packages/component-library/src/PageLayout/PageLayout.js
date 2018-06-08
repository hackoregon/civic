import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import CivicStoryCard from '../CivicStoryCard/CivicStoryCard';
import Header from '../Navigation/Header'
import Footer from '../Footer/Footer'
import CollectionHero from '../Hero/CollectionHero'


const PageLayout = ({ cardId, collectionId, heroTitle, heroSubtitle, title, mainProjectColor, teamTitle, overlay, children }) => (
  <div>
    <Header title="Civic" mainProjectColor={mainProjectColor} overlay={overlay ? overlay : false} />
    { heroTitle && <CollectionHero
      teamTitle={teamTitle}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      mainProjectColor={mainProjectColor}
    /> }
    <div style={{padding: '0px 24px'}} >
      {children}
    </div>
    <Footer />
  </div>
);

PageLayout.displayName = 'PageLayout';

PageLayout.propTypes = {
  overlay: PropTypes.bool,
  teamTitle: PropTypes.string,
  heroTitle: PropTypes.string,
  heroSubtitle: PropTypes.string,
  title: PropTypes.string,
  mainProjectColor: PropTypes.string,
  children: PropTypes.node,
};

export default PageLayout;
