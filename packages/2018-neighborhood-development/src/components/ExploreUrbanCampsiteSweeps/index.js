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

const LAT = 45.5231;
const LONG = -122.6765;
const ZOOM = 9.5;

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
            <div>
              <p>{contextualDesc}</p>
              <BaseMap
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
