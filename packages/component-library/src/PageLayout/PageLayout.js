import React, { PropTypes } from 'react';
import { css } from 'emotion';
import CivicStoryCard from '../CivicStoryCard/CivicStoryCard';
import Header from '../Navigation/Header'


const PageLayout = ({ cardId, collectionId, heroTitle, heroSubtitle, title, mainProjectColor, children }) => (
  <div>
    <Header title="Civic" mainProjectColor={mainProjectColor} overlay />
    <div style={{ background: mainProjectColor, height: '600px', display: 'flex', alignItems: 'center' }}>
      <div style={{marginLeft: '5vw'}} >
        <h1 className={'Title'}>{heroTitle}</h1>
        <h2>{heroSubtitle}</h2>
      </div>
    </div>
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
