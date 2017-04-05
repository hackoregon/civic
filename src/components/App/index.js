/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';
import styled from 'styled-components';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import BarChart from '@hackoregon/component-library/lib/BarChart/BarChart';

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
      <StoryCard title="There was once a bagel shop on 23rd Ave">
        <p className="Description">
          It blew up and now there are no bagels.
        </p>
      </StoryCard>
      <StoryCard title="Introduction to Fire Stuff">
        <p className="Description">
          Here are all things you don't know yet.
        </p>
      </StoryCard>
      <StoryCard title="Have a Map">
        <p className="Description">
          map
        </p>
      </StoryCard>
      <StoryCard title="Have a Bar Chart">
        <p className="Description">
          Here is a chart with some fun data.
        </p>
        <BarChart data={[{ name: 'Fires', x: 200, y: 300 }]} />
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
