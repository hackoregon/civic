/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc
import React from 'react';
import styled from 'styled-components';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import Footer from '@hackoregon/component-library/lib/Footer/Footer';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
// import BarChart from '@hackoregon/component-library/lib/BarChart/BarChart';
// import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
// import { Marker, Popup } from 'react-leaflet';
import { ChartScatter, BagelShop, FmaMap, PieWhatTheyDo, ErBarChart } from '../index';

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
      <StoryCard title="The First Five Minutes" collectionId="emergency-response" cardId="title">
        <p className="Description">
          The First Five Minutes
        </p>
      </StoryCard>
      <StoryCard title="What Does Portland Fire &amp; Rescue Do?" collectionId="emergency-response" cardId="what-they-do">
        <p className="Description">
          What Does Portland Fire &amp; Rescue Do?
        </p>
        <PieWhatTheyDo />
      </StoryCard>
      <StoryCard title="Who Does Portland Fire &amp; Rescue Serve?" collectionId="emergency-response" cardId="er-map">
        <p className="Description">
          Here&apos;s a map!
        </p>
        <FmaMap />
      </StoryCard>
      <StoryCard title="How Busy Is Portland Fire &amp; Rescue? When Are They Most Busy?" collectionId="emergency-response" cardId="when-theyre-busy">
        <p className="Description">
          How Busy Is Portland Fire &amp; Rescue? When Are They Most Busy?
        </p>
        {/* <ErBarChart /> */}
      </StoryCard>
      <StoryCard title="The First Five Minutes" collectionId="emergency-response" cardId="first-five-minutes">
        <p className="Description">
          What happens when you call 911. <br/> Image
        </p>
      </StoryCard>
      <StoryCard title="The Anatomy Of A Four-Alarm Fire" collectionId="emergency-response" cardId="four-alarm-fire">
        <p className="Description">
          It blew up and now there are no bagels.
        </p>
        <BagelShop />
      </StoryCard>
      <StoryCard title="How Response Time Varies Across The City" collectionId="emergency-response" cardId="response-time-varies">
        <p className="Description">
          How Response Time Varies Across The City <br/> Scatter Plot <br/> Scatter Plot <br/> Scatter Plot <br/> Scatter Plot <br/> Scatter Plot <br/> Scatter Plot
        </p>
      </StoryCard>
      <StoryCard title="Have a Scatter Plot" collectionId="emergency-response" cardId="er-scatter">
        <p className="Description">
          Here is a scatter plot with some fun data.
        </p>
        <ChartScatter />
      </StoryCard>

      <Footer />

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
