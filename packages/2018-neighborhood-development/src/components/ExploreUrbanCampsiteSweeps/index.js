import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, Collapsable, BaseMap, ScatterPlotMap, ChartContainer } from '@hackoregon/component-library';
import { contextualDesc, belowFoldOne, belowFoldTwo } from './text';

import { fetchCampsiteSweeps, incrementTimer } from '../../state/explore-urban-campsite-sweeps/actions';
import {
  isCampsiteSweepsPending,
  catchCampsiteSweepsErrors,
  getCampsiteSweepsData,
} from '../../state/explore-urban-campsite-sweeps/selectors';

// Use Hack Oregon official mapbox token eventually
const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';
const LAT = 45.5231;
const LONG = -122.6765;
const ZOOM = 9.5;

const mapWrapper = css`
  width: 100%;
  overflow: hidden;
  display: block;
`;

export class ExploreUrbanCampsiteSweeps extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      data,
    } = this.props;

    const scatterplot = !data
    ? null
    : (
      <ScatterPlotMap
        data={data}
        autoHighlight={false}
        getColor={() => [220, 69, 86]}
        getRadius={() => 100}
      />
    );

    return (
      <CivicStoryCard
        title="Explore Urban Campsite Sweeps by Neighborhood"
        slug="explore-urban-campsite-sweeps"
        loading={isLoading}
        error={error}
      >
        <Collapsable>
          <Collapsable.Section>
            <div className={mapWrapper}>
              <p>{contextualDesc}</p>
              <BaseMap
                mapboxToken={mapboxToken}
                initialLongitude={LONG}
                initialLatitude={LAT}
                initialZoom={ZOOM}
              >
                {scatterplot}
              </BaseMap>
            </div>
          </Collapsable.Section>
          <Collapsable.Section hidden>
            <div>
              <p>{belowFoldOne}</p>
              <p>{belowFoldTwo}</p>
            </div>
          </Collapsable.Section>
        </Collapsable>
      </CivicStoryCard>
    );
  }
}

ExploreUrbanCampsiteSweeps.displayName = 'ExploreUrbanCampsiteSweeps';
ExploreUrbanCampsiteSweeps.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default connect(

  state => ({
    isLoading: isCampsiteSweepsPending(state),
    error: catchCampsiteSweepsErrors(state),
    data: getCampsiteSweepsData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchCampsiteSweeps());
    },
    incrementTimer() {
      dispatch(incrementTimer(5));
    },
  }),
)(ExploreUrbanCampsiteSweeps);
