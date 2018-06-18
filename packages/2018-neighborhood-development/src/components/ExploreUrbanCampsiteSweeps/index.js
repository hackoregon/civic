import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, Collapsable, BaseMap, ScatterPlotMap } from '@hackoregon/component-library';
import { contextualDesc, belowFoldOne, belowFoldTwo } from './text';

import { fetchCampsiteSweeps } from '../../state/explore-urban-campsite-sweeps/actions';
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

  const content = !data
    ? null
    : (<Collapsable>
      <Collapsable.Section>
        <div className={mapWrapper}>
          <p>{contextualDesc}</p>
          <BaseMap
            mapboxToken={mapboxToken}
            initialLongitude={LONG}
            initialLatitude={LAT}
            initialZoom={ZOOM}
          >
            <ScatterPlotMap
              data={data.data.results.features}
              autoHighlight={false}
              getColor={() => [109, 222, 69]}
              getRadius={() => 550}
            />
          </BaseMap>
        </div>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <div>
          <p>{belowFoldOne}</p>
          <p>{belowFoldTwo}</p>
        </div>
      </Collapsable.Section>
    </Collapsable>);

    return (
        <CivicStoryCard
          title="Explore Urban Campsite Sweeps by Neighborhood"
          slug="explore-urban-campsite-sweeps"
          loading={isLoading}
          error={error}
        >
          {content}
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
  }),
)(ExploreUrbanCampsiteSweeps);
