import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class AffordabilityInAComplexHousingMarket extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="The Challenge of Affordability in a Complex Housing Market"
        slug="affordability-in-a-complex-housing-market"
      >
        <p>Oregon Metro has created a regional equitable housing
          framework outlining 5 strategies to help serve families at different income levels.</p>

        <Placeholder issue="212" />
        <p>With affordable housing becoming increasingly out of reach, government entities have implemented
          policies aimed at increasing accessibility. The conversation surrounding affordable housing is tricky
          since many people look to housing policy not only to keep housing affordable but also, to protect residential
          neighborhoods from things adversely affecting home values.</p>

      </CivicStoryCard>
    );
  }
}

AffordabilityInAComplexHousingMarket.displayName = 'AffordabilityInAComplexHousingMarket';

// Connect this to the redux store when necessary
export default AffordabilityInAComplexHousingMarket;
