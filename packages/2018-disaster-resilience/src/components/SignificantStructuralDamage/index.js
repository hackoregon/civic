import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class SignificantStructuralDamage extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Significant Structural Damage"
        slug="significant-structural-damage"
      >
        <p>
          Key pieces of Portland's infrastructure (river bridges across the
          Willamette, airport, fuel storage) are estimated to be destroyed or 
          damaged beyond a usable state, using a total deformation wet scenario. 
          Total Deformation (average of liquefaction/landslide combined) during 
          a wet season is impacted by both landslide potential and liquefaction 
          potential. Landslide potential is based on topography and soil conditions. 
          Liquefaction potential estimates the potential for saturated (wet),
          unconsolidated/loose ground materials to liquefy or give way during an 
          earthquake.
        </p>
        
        <Placeholder />
        <p> 
          The City of Portland faces unique challenges in preparing for a major 
          earthquake. Three specific weaknesses will severely inhibit the ability to 
          rescue people, distribute services, and rebuild after a Cascadia quake:
          <ol>
            <li>Portland’s bridges are essential for transporting people, goods,
               and services across the Willamette River every day. Of Portland’s 12 bridges,
               only the Tillikum and Sellwood Bridges are expected to be safe and usable 
               after a Cascadia quake. A retrofitted Burnside Bridge could provide an essential 
               lifeline for rescue and recovery for Portland.
            </li>
            <li> The Portland Airport is located in an area which will be significantly impacted 
              by shaking and liquefaction, so airport runways are likely to be highly deformed
              and unusable after a Cascadia quake. The airport does not currently have a plan to 
              restore operations quickly after an earthquake, which will make it difficult to 
              deliver needed people and resources to the region.
            </li>
            <li>Between the Fremont Bridge and Sauvie Island is Oregon’s “Critical Energy Infrastructure”, 
              containing most of Oregon’s facilities for receiving, storing and  transporting liquid fuel 
              and natural gas. Although these facilities are built on land at very high risk for 
              liquefaction and landslides, few structures have been retrofitted to meet current building
              standards. Most of this infrastructure will not be functional after a Cascadia quake, which
              means that a state or region- wide fuel shortage is a real possibility.
            </li>
          </ol>
          <a href="https://youtu.be/sn98JkN5HXc">Video</a> from Earthquake Ready Burnside Bridge Project
          showing a simulated collapse of the Burnside Bridge
        </p>
      </CivicStoryCard>
    );
  }
}

SignificantStructuralDamage.displayName = 'SignificantStructuralDamage';

// Connect this to the redux store when necessary
export default SignificantStructuralDamage;
