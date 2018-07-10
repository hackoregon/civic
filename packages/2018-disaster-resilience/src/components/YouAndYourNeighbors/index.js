import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CivicStoryCard, Placeholder, BaseMap, IconMap } from '@hackoregon/component-library';

import { fetchYouAndYourNeighbors } from '../../state/you-and-your-neighbors/actions';
import {
  isYouAndYourNeighborsPending,
  catchYouAndYourNeighborsErrors,
  getYouAndYourNeighborsData,
} from '../../state/you-and-your-neighbors/selectors';

const LAT = 45.5231;
const LONG = -122.6765;
const ZOOM = 9.5;

const geocoderOptions = {
  zoom: 18,
  trackProximity: true,
  placeholder: 'Enter your address',
};

// Slide 016 - points of interest
const poiIconMapping = {
  School: {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    mask: true,
  },
  Hospital: {
    x: 250,
    y: 0,
    width: 250,
    height: 250,
    mask: true,
  },
  BEECN: {
    x: 500,
    y: 0,
    width: 250,
    height: 250,
    mask: true,
  },
  'Fire Station': {
    x: 0,
    y: 250,
    width: 250,
    height: 250,
    mask: true,
  },
  Pin: {
    x: 250,
    y: 250,
    width: 250,
    height: 250,
    mask: true,
  },
  COMMCTR: {
    x: 500,
    y: 250,
    width: 250,
    height: 250,
    mask: true,
  },
};

const poiIconZoomScale = zoom => zoom > 11.5 ? 10 :
  zoom > 10.5 ? 8 :
  zoom > 9.5 ? 6 :
  zoom > 8.5 ? 4 :
  zoom > 7.5 ? 2 :
  1;

const poiGetIconColor = f => f.properties.type === 'BEECN' ? [0, 0, 0, 255] :
  f.properties.type === 'COMMCTR' ? [114, 29, 124, 255] :
  f.properties.type === 'Fire Station' ? [220, 69, 86, 255] :
  f.properties.type === 'School' ? [255, 178, 38, 255] :
  f.properties.type === 'Hospital' ? [30, 98, 189, 255] :
  [0, 0, 0, 255];

export class YouAndYourNeighbors extends React.Component {

  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      youAndYourNeighbors,
    } = this.props;

    const overlay = !youAndYourNeighbors
    ? null
    : (
      <IconMap
        data={youAndYourNeighbors.features}
        pickable
        opacity={0.5}
        iconAtlas="https://i.imgur.com/xgTAROe.png"
        iconMapping={poiIconMapping}
        // sizeScale={poiIconZoomScale}
        iconSizeScale={poiIconZoomScale}
        getPosition={f => f.geometry === null ? [0, 0] : f.geometry.coordinates}
        getIcon={f => f.properties.type}
        getSize={f => 11}
        getColor={poiGetIconColor}
        autoHighlight={false}
        highlightColor={[0, 0, 0, 0]}
      />
    );

    return (
      <CivicStoryCard
        title="You and Your Neighbors in the Earthquake"
        slug="you-and-your-neighbors-in-the-earthquake"
        loading={isLoading}
        error={error && 'Error loading data'}
      >
        <div>
        <p>It will be critical for individuals to understand their location relative to key resources immediately following an earthquake. The <a href="https://www.portlandoregon.gov/pbem/59630" target="_blank" rel="noopener noreferrer">BEECN site</a> is a place to go in Portland after a major earthquake to ask for emergency assistance or report severe damage/injury. Places like hospitals, fire stations and schools will be rallying areas for the community and crucial for recovery efforts. Input your address, or a friend/family member’s address below to generate a personalized map.</p>
          <BaseMap
            initialLongitude={LONG}
            initialLatitude={LAT}
            initialZoom={ZOOM}
            geocoder
            geocoderOptions={geocoderOptions}
          >
            {overlay}
          </BaseMap>
        </div>
        <Placeholder issue="153" />
      </CivicStoryCard>
    );
  }
}

YouAndYourNeighbors.displayName = 'YouAndYourNeighbors';
YouAndYourNeighbors.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  youAndYourNeighbors: PropTypes.object,
};
// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isYouAndYourNeighborsPending(state),
    error: catchYouAndYourNeighborsErrors(state),
    youAndYourNeighbors: getYouAndYourNeighborsData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchYouAndYourNeighbors());
    },
  }),
)(YouAndYourNeighbors);
