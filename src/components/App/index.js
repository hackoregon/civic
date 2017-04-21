/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc
import React from 'react';
import styled from 'styled-components';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import Footer from '@hackoregon/component-library/lib/Footer/Footer';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import BarChart from '@hackoregon/component-library/lib/BarChart/BarChart';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';

import { TransportMap } from '../index';

const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function App(props) {
  return (
    <Container>
      <Header />
      
      <StoryCard title="Construction Projects Map" collectionId="transportation" cardId="trans-construction-maps">
        <p className="Description">
          Construction Project Exploration
        </p>
        <SelectorButtons />
        <ControlBox />
        <FmaMap />
      </StoryCard>
      
      {React.Children.toArray(props.children)}
    </Container>
  );
}

App.displayName = 'App';
App.defaultProps = {
  children: <div />,
};

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
