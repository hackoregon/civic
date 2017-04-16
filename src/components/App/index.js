/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import Table from './table';
import { getNeighborhoodRequest } from '../../state/selectors/api';
import { neighborhoodFetch } from '../../state/api';

const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export function App({ children, isLoading, neighborhoodData, onNeighborhoodRequest }) {
  let content;
  if (isLoading) {
    content = <span>Loading...</span>;
  } else if (!neighborhoodData) {
    content = <span>No data loaded!</span>;
  } else {
    content = <Table rows={neighborhoodData} />;
  }

  return (
    <Container>
      <Header />
      <button onClick={() => onNeighborhoodRequest()}>Fetch Data</button>
      # Bedrooms:
      <select onChange={event => onNeighborhoodRequest(event.target.value)}>
        <option value="Studio">Studio</option>
        <option value="1-BR">1</option>
        <option value="2-BR">2</option>
        <option value="3-BR">3</option>
        <option value="Homeownership">Owned</option>
      </select>
      {content}
      {React.Children.toArray(children)}
    </Container>
  );
}

App.displayName = 'App';
App.defaultProps = {
  children: <div />,
  neighborhoodData: [],
  onNeighborhoodRequest: () => {},
  isLoading: false,
};

App.propTypes = {
  children: React.PropTypes.node,
  neighborhoodData: React.PropTypes.array,
  onNeighborhoodRequest: React.PropTypes.func,
  isLoading: React.PropTypes.bool,
};

const mapDispatch = dispatch => ({
  onNeighborhoodRequest: (size) => {
    dispatch(neighborhoodFetch({
      demographic: 'Couple+with+Family',
      housing_size: size || 'Studio',
    }));
  },
});

const mapProps = state => ({
  neighborhoodData: getNeighborhoodRequest(state).data,
  isLoading: getNeighborhoodRequest(state).pending,
});

export default connect(mapProps, mapDispatch)(App);
