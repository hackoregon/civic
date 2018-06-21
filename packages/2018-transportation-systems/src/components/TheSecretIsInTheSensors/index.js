import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class TheSecretIsInTheSensors extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="The Secret is in the Sensors"
        slug="the-secret-is-in-the-sensors"
      >
        <p>The need to Monitor the Current State of Motion in a Smart City is more important 
          than ever. In the face of this Reality, leveraging modern technology like IoT Devices 
          can make the difference between Blind and Informed Policy. Knowing where High-Need
          Pedestrian, Bike, and Transit Hubs exist within a City can help prepare for the Future. 
          The City of Portland is researching this Future and is already determining ways to make
          its use of IoT Secure, Private, and Equitable. 
        </p>
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

TheSecretIsInTheSensors.displayName = 'TheSecretIsInTheSensors';

// Connect this to the redux store when necessary
export default TheSecretIsInTheSensors;
