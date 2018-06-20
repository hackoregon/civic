import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ViolentShakingAndGroundDeformation extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Violent Shaking and Ground Deformation"
        slug="violent-shaking-and-ground-deformation"
      >
      <p>
        Based on developed models, scientists can estimate what will happen to the 
        ground in a 9.0 Cascadia Subduction Zone earthquake. The below maps apply 
        these models to Portland based on a calculated average for each neighborhood. 
        <ul>
        <li>Shaking intensity is how much the surface of the earth moves during an 
          earthquake, this is represented using a <a href="https://earthquake.usgs.gov/learn/topics/mercalli.php">
          Modified Mercalli (MM) Intensity</a>scale
        </li>
        <li>Total Deformation (average of liquefaction/landslide combined) during a wet season is 
          impacted by both landslide potential and liquefaction potential. Landslide potential is
          based on topography and soil conditions. Liquefaction potential estimates the potential for
          saturated (wet), unconsolidated/loose ground materials to liquefy or give way during an earthquake.
        </li>
        <li>Total Deformation (average of landslide - there’s no liquefaction) during a dry season season 
          is impacted by landslide potential based on topography. The lack of moisture in the ground will 
          lessen the impact of the event.
        </li>
        </ul>
      </p>

        <Placeholder issue="217" />
      </CivicStoryCard>
    );
  }
}

ViolentShakingAndGroundDeformation.displayName = 'ViolentShakingAndGroundDeformation';

// Connect this to the redux store when necessary
export default ViolentShakingAndGroundDeformation;
