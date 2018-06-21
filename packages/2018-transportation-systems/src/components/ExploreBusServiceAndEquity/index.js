import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ExploreBusServiceAndEquity extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Explore Bus Service and Equity"
        slug="explore-bus-service-and-equity"
      >
        <p>Increasing Ridership is a common KPI for Transit Agencies
           across the country, and yet, according to the data, decreasing 
           Ridership may not be a trend we can stop. How can Public-Private 
           Partnerships like Trimet set appropriate objectives for a Smart 
           City in the context of this decreasing Ridership? Below we explore
           how decreasing Transit Availability has evolved alongside changes in Equity 
           Statistics, and we ask the question: What is more important? Full busses--or 
           the ability for everyone to get from Point A to Point B at a low cost. What
            will a City look like when one of its Key Success Measures is Equitable Transit 
          Availability?
        </p>
        <Placeholder>
          <h1>Sandbox Card</h1>
          <p>Don't worry about this one</p>
        </Placeholder>
      </CivicStoryCard>
    );
  }
}

ExploreBusServiceAndEquity.displayName = 'ExploreBusServiceAndEquity';

// Connect this to the redux store when necessary
export default ExploreBusServiceAndEquity;
