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
        <p>It will be critical for individuals to understand their location relative to key resources immediately following an earthquake. The <a href="https://www.portlandoregon.gov/pbem/59630" target="_blank" rel="noopener noreferrer">BEECN site</a> is a place to go in Portland after a major earthquake to ask for emergency assistance or report severe damage/injury. Places like hospitals, fire stations and schools will be rallying areas for the community and crucial for recovery efforts. Input your address, or a friend/family member’s address below to generate a personalized map.</p>
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
