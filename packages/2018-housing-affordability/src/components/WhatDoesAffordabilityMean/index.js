import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class WhatDoesAffordabilityMean extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="What Does Affordability Mean?"
        slug="what-does-affordability-mean"
      >
        <p>
          Median family income is the baseline for all affordability
          calculations. Adjust the family size and percent to see what
          affordable means for different income levels.
        </p>

        <Placeholder issue="211" />
        <p>
          When discussed in public policy, affordability refers to the percent
          of monthly income spent on housing. The ‘rule of thumb’ for
          affordability is that your monthly rent shouldn’t exceed 30% of your
          income. If you made $1000 a month, your apartment would be considered
          affordable if it’s under $300 a month.
        </p>
        <p>
          Not everyone makes the same amount of money or has the same size
          family. For example, if you have more dependents on one person’s
          salary, that can make it harder to afford the rent. The Department of
          Housing and Urban Development publishes an annual data set defining{' '}
          <a href="https://www.huduser.gov/portal/datasets/il.html#2018_dat">
            median family incomes
          </a>{' '}
          and affordability.
        </p>
        <p>
          In Portland,{' '}
          <a href="https://www.portlandoregon.gov/phb/article/651806">
            the median family income for a family of four is $74,700.
          </a>
          Applying our 30% rule of thumb as well as a ballpark 30% for taxes,
          rent is affordable under $1,307 for this family making the median
          amount of income. The City of Portland’s State of Housing Report in
          2017 defines “affordable” for a household of two individuals making
          $55,003 as $1,375. (
          <a href="https://www.portlandoregon.gov/phb/article/681253">
            https://www.portlandoregon.gov/phb/article/681253
          </a>{' '}
          - page 30)
        </p>
      </CivicStoryCard>
    );
  }
}

WhatDoesAffordabilityMean.displayName = 'WhatDoesAffordabilityMean';

// Connect this to the redux store when necessary
export default WhatDoesAffordabilityMean;
