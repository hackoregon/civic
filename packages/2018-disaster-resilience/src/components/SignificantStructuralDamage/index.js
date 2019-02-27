import React from 'react';
import { css } from 'emotion';

import { CivicStoryCard, ChartContainer, Collapsable } from '@hackoregon/component-library';

const infographicContainer = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 20px;
`;

const infographicItem = css`
  width: 290px;
`;

const infographicImg = css`
  width: 100%;
`;

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
        <Collapsable>
          <Collapsable.Section>
            <div>
              <p>Key pieces of Portland&#39;s infrastructure are estimated to be destroyed or damaged beyond a usable state in a 9.0 Cascadia Subduction Zone earthquake. Three specific weaknesses will severely inhibit the ability to rescue people, distribute services, and rebuild after a Cascadia quake.</p>
              <ChartContainer title="Critical Infrastructure Rendered Unusable">
                <div className={infographicContainer}>
                  <div className={infographicItem}>
                    <img src="https://s3-us-west-2.amazonaws.com/hacko-cdn/2018-disaster-resilience/CriticalEnergy.svg" className={infographicImg} />
                  </div>
                  <div className={infographicItem}>
                    <img src="https://s3-us-west-2.amazonaws.com/hacko-cdn/2018-disaster-resilience/Bridge.svg" className={infographicImg} />
                  </div>
                  <div className={infographicItem}>
                    <img src="https://s3-us-west-2.amazonaws.com/hacko-cdn/2018-disaster-resilience/Airport.svg" className={infographicImg} />
                  </div>
                </div>
              </ChartContainer>
            </div>
          </Collapsable.Section>
          <Collapsable.Section hidden>
            <div>
              <p>Portland’s bridges are essential for transporting people, goods, and services across the Willamette River every day. Of Portland’s 12 bridges, only the Tillikum and Sellwood Bridges are expected to be safe and usable after a Cascadia quake. A retrofitted Burnside Bridge could provide an essential lifeline for rescue and recovery for Portland. This <a href="https://youtu.be/sn98JkN5HXc">video simulation</a> shows a simulated collapse of the Burnside Bridge based on its&#39; current structural condition.</p>
              <p>The Portland Airport is located in an area which will be significantly impacted by shaking and liquefaction, so airport runways are likely to be highly deformed and unusable after a Cascadia quake. The airport does not currently have a plan to restore operations quickly after an earthquake, which will make it difficult to deliver needed people and resources to the region.</p>
              <p>Between the Fremont Bridge and Sauvie Island is Oregon’s “Critical Energy Infrastructure”, containing most of Oregon’s facilities for receiving, storing, transporting liquid fuel and natural gas. Although these facilities are built on land at very high risk for liquefaction and landslides, few structures have been retrofitted to meet current building standards. Most of this infrastructure will not be functional after a Cascadia quake, which means that a state or region-wide fuel shortage is a real possibility.</p>
            </div>
          </Collapsable.Section>
        </Collapsable>
      </CivicStoryCard>
    );
  }
}

SignificantStructuralDamage.displayName = 'SignificantStructuralDamage';

// Connect this to the redux store when necessary
export default SignificantStructuralDamage;
