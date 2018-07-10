import React from 'react';

import { CivicStoryCard, Placeholder, BaseMap } from '@hackoregon/component-library';

const LAT = 45.5231;
const LONG = -122.6765;
const ZOOM = 9.5;

const geocoderOptions = {
  zoom: 18,
  trackProximity: true,
  placeholder: 'Enter your address',
};

export class YouAndYourNeighbors extends React.Component {

  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="You and Your Neighbors in the Earthquake"
        slug="you-and-your-neighbors-in-the-earthquake"
      >
        <div>
          <BaseMap
            initialLongitude={LONG}
            initialLatitude={LAT}
            initialZoom={ZOOM}
            geocoder
            geocoderOptions={geocoderOptions}
          >
          </BaseMap>
        </div>
        <Placeholder issue="153" />
      </CivicStoryCard>
    );
  }
}

YouAndYourNeighbors.displayName = 'YouAndYourNeighbors';

// Connect this to the redux store when necessary
export default YouAndYourNeighbors;
