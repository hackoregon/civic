/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';
import styled from 'styled-components';
import CardCollection from '../CardCollection';
// import Header from '@hackoregon/component-library/lib/Navigation/Header';
// import { Footer } from '@hackoregon/component-library';

const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
`;

function App(props) {
  return (
    <Container>
      {React.Children.toArray(props.children)}
    </Container>
  );
}

App.displayName = 'App';
App.defaultProps = {
  children: <CardCollection />,
};

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
