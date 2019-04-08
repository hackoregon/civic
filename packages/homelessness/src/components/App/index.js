/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function App(props) {
  return <Container>{React.Children.toArray(props.children)}</Container>;
}

App.displayName = 'App';
App.defaultProps = {
  children: <div />,
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
