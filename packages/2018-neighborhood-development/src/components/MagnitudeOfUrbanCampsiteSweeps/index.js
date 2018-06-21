import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class MagnitudeOfUrbanCampsiteSweeps extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Magnitude of Urban Campsite Sweeps in Portland"
        slug="magnitude-of-urban-campsite-sweeps"
      >
        <p>The Homelessness/Urban Camping Impact Reduction Program (HUCIRP) reports 
          intersections of all posted sweeps of campsites in a given week. This visualization 
          counts the total number of reported sweeps. Portland has had an average of 112.4 
          sweeps per month, and the amount of sweeps has increased significantly over time.
        </p>
        <Placeholder issue="85"/>
        <p>Camping, whether for recreation or for survival, is not permitted in the City of Portland 
          (City Code 14A.50.020 and 14A.50.). To enforce this, the City posts signs 24 hours in advance
           of a campsite clean-up, or `sweep'. Any property that remains after 24 hours is picked up
            and stored in a facility for 30 days.
        </p>
        <p>When considering the past ~18 months of sweeps in Portland, the amount of campsite 
          sweeps significantly increased to a peak of 311 sweeps in one month during October, 
          2017. The past 8 months have all been above the average for sweeps, showing that the 
          trend of rising sweeps is consistent.
        </p>
        <p>The data on sweeps comes from online reports posted by the Homelessness/Urban
           Camping Impact Reduction Program (HUCIRP) of the City of Portland that contains
           a log of where campsites were swept in any given week, providing the intersection 
           or a description of the surrounding area, as well as predicted clean-up sites for 
           future weeks. This collection quantifies and maps this data for the first time, 
           to our knowledge.
        </p>
      </CivicStoryCard>
    );
  }
}

MagnitudeOfUrbanCampsiteSweeps.displayName = 'MagnitudeOfUrbanCampsiteSweeps';

// Connect this to the redux store when necessary
export default MagnitudeOfUrbanCampsiteSweeps;
