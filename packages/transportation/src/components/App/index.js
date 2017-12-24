/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc
import React from 'react';
import styled from 'styled-components';
import { Header, Footer, StoryCard } from '@hackoregon/component-library';
import ConstructionViews from '../ConstructionViews';
import CrashData from '../CrashData/CrashData';
// import L from 'leaflet';

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

      <StoryCard title="Portland Road Works Explorer" collectionId="transportation" cardId="trans-construction-maps">
        <ConstructionViews />
      </StoryCard>

      <div style={{ height: '3em', width: '100%', backgroundColor: '#E87220', marginTop: '6em', marginBottom: '4em' }} />
      <CrashData />


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
