import React from 'react';

import { CivicStoryCard } from '@hackoregon/component-library';

import aduGif from '../../assets/adus_time.gif';
import mfGif from '../../assets/mf_time.gif';

export class BuildingBoomInPortland extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="A Building Boom in Portland"
        slug="building-boom-in-portland"
      >
        <p>The Portland Metro Area is experiencing a building boom as evidenced by building
          permits for new construction and ADUs. </p>

        <h1>Accessory Dwelling Units Over Time</h1>
        <img src={aduGif} alt="heatmap of where Accessory Dwelling Units permits are in Portland over time" />

        <h1>Multi-family Housing Over Time</h1>
        <img src={mfGif} alt="heatmap of where Multi-family housing permits are in Portland over time" />
      </CivicStoryCard>
    );
  }
}

BuildingBoomInPortland.displayName = 'BuildingBoomInPortland';

// Connect this to the redux store when necessary
export default BuildingBoomInPortland;
