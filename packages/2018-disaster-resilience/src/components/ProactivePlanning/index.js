import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ProactivePlanning extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Proactive Planning for City-Wide Resilience"
        slug="proactive-planning-for-city-wide-resilience"
      >
        <p>
          Social capital is not a readily available statistic, but <a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.1019.2188&rep=rep1&type=pdf">recent academic </a> 
          studies have demonstrated a strong correlation between census response rates, readily available data, and social capital. 
        </p>
        <p>
          The below visualization, showing social capital v. displaced population using a wet season scenario, 
          uses census response rates by neighborhood as a proxy for social capital. Neighborhoods with the combination
          of high earthquake impact and lower relative social capital should be the priority for directing community-building,
          resilience, and preparedness efforts. In the scatterplot below, each neighborhood is a bubble and the top right region 
          represents the intersection of lower relative social capital and higher hazard impact. The size of each bubble is proportional
          to the population size of each neighborhood
        </p>
        <Placeholder />
        <p>
          There are many actions, from updating infrastructure to boosting community engagement, that will need to take place 
          to increase the overall resiliency of Portland. Examples include:
          <ul>
            <li>New infrastructure and capital improvement projects in Portland can be built with an emphasis on withstanding 
              and delivering services after an earthquake.  Although this will add cost to the execution of projects, the results will
              pay off in a functional city after a disaster.  Projects like the<a href="https://multco.us/earthquake-ready-burnside-bridge">“Earthquake Ready Burnside Bridge”</a>
              show how existing projects can be expanded to emphasize resilience.</li>
            <li>Investment in education and training for individuals to respond to natural disasters will help communities minimize the 
              impacts of an earthquake and speed up recovery times.  Programs like <a href="https://www.portlandoregon.gov/31667">NET</a>
              and <a href="https://www.portlandoregon.gov/pbem/59630">BEECN</a> prepare communities to be self-sufficient 
              during periods when other assistance cannot be accessed.</li>
            <li>
              Vulnerable populations have fewer resources to draw on in response to all kinds of natural disasters. 
              Projects that increase equity and assist the most vulnerable groups will increase people’s ability to care for themselves and 
              community in the immediate aftermath of an earthquake.</li>

          </ul>
        </p>
        
      </CivicStoryCard>
    );
  }
}

ProactivePlanning.displayName = 'ProactivePlanning';

// Connect this to the redux store when necessary
export default ProactivePlanning;
