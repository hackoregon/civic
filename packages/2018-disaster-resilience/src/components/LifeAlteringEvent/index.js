import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class LifeAlteringEvent extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="A Life-Altering Event for Portlanders"
        slug="life-altering-event"
      >
        <p>
        Based on developed models, scientists can estimate
        what will happen to the ground in a 9.0 Cascadia Subduction Zone
        earthquake. The below maps apply these models to Portland based on 
        a calculated average for each neighborhood. 
        </p>

        <p>
        Shaking intensity is how much the surface of the earth moves during
        an earthquake, this is represented using a 
        <a href="https://earthquake.usgs.gov/learn/topics/mercalli.php"> Modified Mercalli (MM) Intensity </a> scale. 
        </p>

        <p>
        Total Deformation (average of liquefaction/landslide combined) during a wet season 
        is impacted by both landslide potential and liquefaction potential. Landslide potential is based on topography
        and soil conditions. Liquefaction potential estimates the potential for saturated (wet), unconsolidated/loose
        ground materials to liquefy or give way during an earthquake.
        </p>

        <p>
        Total Deformation (average of landslide - there’s no liquefaction) during a dry season season is impacted by
        landslide potential based on topography. The lack of moisture in the ground will lessen the impact of the event.
        </p>


        <Placeholder issue="154" />
      </CivicStoryCard>
    );
  }
}

LifeAlteringEvent.displayName = 'LifeAlteringEvent';

// Connect this to the redux store when necessary
export default LifeAlteringEvent;
