/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc
import React from 'react';
import styled from 'styled-components';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import BarChart from '@hackoregon/component-library/lib/BarChart/BarChart';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { Marker, Popup } from 'react-leaflet';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import L from 'leaflet';

import { TestComponent } from '../index';

const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const portland = [45.52, -122.67];

const data = [{ x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 }];

function App(props) {
  return (
    <Container>
      <Header />
      <StoryCard title="There was once a bagel shop on 23rd Ave" collectionId="emergency-response" cardId="bagel-shop">
        <p className="Description">
          It blew up and now there are no bagels.
        </p>
      </StoryCard>
      <StoryCard title="Introduction to Fire Stuff" collectionId="emergency-response" cardId="domain-info">
        <p className="Description">
          Here are all things you don&apos;t know yet.
        </p>
      </StoryCard>
      <StoryCard title="Have a Map" collectionId="emergency-response" cardId="er-map">
        <p className="Description">
          Here&apos;s a map!
        </p>
        <LeafletMap>
          <Marker position={portland}>
            <Popup>
              <span>A pretty CSS3 popup.<br />Easily customizable.</span>
            </Popup>
          </Marker>
        </LeafletMap>
      </StoryCard>
      <StoryCard title="Have a Bar Chart" collectionId="emergency-response" cardId="er-scatter">
        <p className="Description">
          Here is a chart with some fun data.
        </p>
        <BarChart data={[{ name: 'Fires', x: 200, y: 300 }]} />
      </StoryCard>
      <StoryCard title="Have a Scatterplot" collectionId="emergency-response" cardId="er-scatter">
        <p className="Description">
          A scatterplot straight from Recharts.
        </p>
        <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey={'x'} name='stature' unit='cm' />
          <YAxis dataKey={'y'} name='weight' unit='kg' />
          <Scatter name='A school' data={data} fill='#8884d8' />
          <CartesianGrid />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        </ScatterChart>

      </StoryCard>

      <TestComponent />

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
