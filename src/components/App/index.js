/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Table from './table';
import { getNeighborhoodRequest } from '../../state/selectors/api';
import { neighborhoodFetch } from '../../state/api';
import {
  updateSelectedUnitSize,
  updateSelectedDemographic,
} from '../../state/app';
import {
  getSelectedDemographic,
  getSelectedUnitSize,
} from '../../state/selectors/app';
import {
  DEMOGRAPHICS,
  UNIT_SIZES,
} from '../../utils/data-constants';

const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export function App({
  children,
  isLoading,
  neighborhoodData,
  setUnitSize,
  setDemographic,
  demographic,
  unitSize,
}) {
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
      # Bedrooms:
      <select value={unitSize} onChange={event => setUnitSize(event.target.value)}>
        {UNIT_SIZES.map(size => (
          <option value={size} key={size}>{size}</option>
        ))}
      </select>
      # Demographic
      <select value={demographic} onChange={event => setDemographic(event.target.value)}>
        {DEMOGRAPHICS.map(demo => (
          <option value={demo} key={demo}>{demo}</option>
        ))}
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
  demographic: DEMOGRAPHICS[0],
  unitSize: UNIT_SIZES[0],
  setDemographic: () => {},
  setUnitSize: () => {},
  isLoading: false,
};

App.propTypes = {
  children: React.PropTypes.node,
  neighborhoodData: React.PropTypes.array,
  setDemographic: React.PropTypes.func,
  setUnitSize: React.PropTypes.func,
  isLoading: React.PropTypes.bool,
  demographic: React.PropTypes.string,
  unitSize: React.PropTypes.string,
};

const mapDispatch = dispatch => ({
  setUnitSize: (size) => {
    dispatch(updateSelectedUnitSize(size));
    dispatch(neighborhoodFetch());
  },

  setDemographic: (demographic) => {
    dispatch(updateSelectedDemographic(demographic));
    dispatch(neighborhoodFetch());
  },
});

const mapProps = state => ({
  neighborhoodData: getNeighborhoodRequest(state).data,
  isLoading: getNeighborhoodRequest(state).pending,
  demographic: getSelectedDemographic(state),
  unitSize: getSelectedUnitSize(state),
});

export default connect(mapProps, mapDispatch)(App);
