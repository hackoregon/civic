/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc
import React from 'react';
import styled from 'styled-components';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import BarChart from '@hackoregon/component-library/lib/BarChart/BarChart';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { Marker, Popup } from 'react-leaflet';
import { FmaScatter } from '../index';
import { BagelShop } from '../index';
// import L from 'leaflet';

import { FmaMap } from '../index';

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
      <StoryCard title="There was once a bagel shop on 23rd Ave" collectionId="emergency-response" cardId="bagel-shop">
        <p className="Description">
          It blew up and now there are no bagels.
        </p>
        <BagelShop />
      </StoryCard>
      <StoryCard title="Introduction to Fire Stuff" collectionId="emergency-response" cardId="domain-info">
        <p className="Description">
          Here are all things you don&apos;t know yet.
        </p>
      </StoryCard>
      <StoryCard title="Have a Map" collectionId="emergency-response" cardId="er-map">
        <p className="Descriptison">
          Here&apos;s a map!
        </p>

        <FmaMap />
      </StoryCard>
      <StoryCard title="Have a Scatter Plot" collectionId="emergency-response" cardId="er-scatter">
        <p className="Description">
          Here is a scatter plot with some fun data.
        </p>
        <FmaScatter />
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
