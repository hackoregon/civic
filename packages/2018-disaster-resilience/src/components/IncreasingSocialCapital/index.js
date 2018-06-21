import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class IncreasingSocialCapital extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Increasing Social Capital Leads to Increased Resilience"
        slug="increasing-social-capital"
      >
        <p>Social capital is a means for measuring the social connections and
           engagement within a community, and the higher the social capital for
           a community, the greater the resilience in the face of a disaster will be.
        </p>
        <p>Although Social Capital is not a readily available statistic,<a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.1019.2188&rep=rep1&type=pdf"> recent 
          academic studies</a> have demonstrated a strong correlation between census 
          response rates, readily available data, and social capital. The below map 
          uses census response rates by neighborhood as a stand-in for social capital.
        </p>
        <Placeholder /> 
        <p>
        <a href="https://www.citylab.com/solutions/2017/02/recovering-from-disasters-social-networks-matter-more-than-bottled-water-and-batteries/516726/"> New research </a> 
        from the aftermath of the devastating 9.0 Tohoku earthquake in Japan
        has also brought to light that resilience and the ability to recover quickly from
        disaster impacts is largely driven by the interpersonal connectedness and cohesion of
        neighborhoods -- what social scientists call social capital -- and can be even more
        important than the state of the physical infrastructure. When the mayor of Christchurch 
        visited Portland last October and was asked for the single most important piece of advice 
        she could offer Portland in preparing for the “Big One’”, it was not “reinforce all your 
        bridges” or “give everyone a disaster kit”. It was “know your neighbors.”  The encouraging 
        thing about this discovery is that every person has the ability to contribute to their neighborhood’s
        social capital and there are many ways to do so.
        </p>
      </CivicStoryCard>
    );
  }
}

IncreasingSocialCapital.displayName = 'IncreasingSocialCapital';

// Connect this to the redux store when necessary
export default IncreasingSocialCapital;
