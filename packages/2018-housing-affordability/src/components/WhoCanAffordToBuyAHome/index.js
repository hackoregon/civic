import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class WhoCanAffordToBuyAHome extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Who Can Afford to Buy a Home in America?"
        slug="who-can-afford-to-buy-a-home"
      >
        <p>One metric that tracks housing affordability is the median home price-to-median 
          income ratio. This measure takes the median home price and divides by the median income ratio. 
          The idea is, how long will it take to pay off a home if 100% of the owner’s income was used. 
          Higher ratios indicate that home prices are less affordable, while smaller ratios are indicative of 
          greater affordability. For example,if your home cost $100,000 and your income is $50,000, the ratio 
          would be 2, or the cost of $500,000 and an income of $50,000 would be 10</p>

        <Placeholder issue="57" />
        <p>In the early 1990s, the Portland Metropolitan ratio was ~2.5%. This number steadily increased up
           until 2006, reaching a high of 5.4%. Following the recession, the ratio showed a downturn; however starting
            in 2011, it started to bounce back, and recent values are on par with the previous maximum. 
            In 2016, Portland ranked 349 out of 381 Metropolitan areas with regards to affordability.
            <br />
            <br />
            While the rising cost of home ownership is clearly evident in Portland, this is happening 
            throughout the state. Several other areas are also experiencing challenges with regards to 
            increasing home prices, including Grants Pass, Corvallis, Medford, Bend-Redmond, Eugene, Albany, and Salem.</p>

      </CivicStoryCard>
    );
  }
}

WhoCanAffordToBuyAHome.displayName = 'WhoCanAffordToBuyAHome';

// Connect this to the redux store when necessary
export default WhoCanAffordToBuyAHome;
