/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc
import React from 'react';
import styled from 'styled-components';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import Footer from '@hackoregon/component-library/lib/Footer/Footer';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
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
      
        <StoryCard title="Road Works Explorer" collectionId="transportation" cardId="trans-construction-maps">
          <ConstructionViews />
        </StoryCard>
        
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
