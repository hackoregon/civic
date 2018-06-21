import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import CivicStoryCard from '../CivicStoryCard/CivicStoryCard';
import Header from '../Navigation/Header'
import Footer from '../Footer/Footer'
import CollectionHero from '../Hero/CollectionHero'

const defaultStyles = css`
  padding: 0px 24px;

  p, h1, h2, h3, h4, h5, h6 {
    margin: auto;
  }

  > p {
    width: 100%;
    max-width: 700px;
    font-size: 18px;
    margin-bottom: 1.5em;
    line-height:1.8;

    &.transition {
      margin: 80px auto;
    }
  }
`;

const PageLayout = ({ cardId, collectionId, heroTitle, heroSubtitle, title, mainProjectColor, teamTitle, overlay, children }) => (
  <div>
    <Header title="Civic" mainProjectColor={mainProjectColor} overlay={overlay ? overlay : false} />
    { heroTitle && <CollectionHero
      teamTitle={teamTitle}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      mainProjectColor={mainProjectColor}
    /> }
    <div className={defaultStyles}>
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
