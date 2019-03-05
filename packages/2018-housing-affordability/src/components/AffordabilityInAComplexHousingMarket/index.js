import React from 'react';

import { CivicStoryCard, PDF } from '@hackoregon/component-library';

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
        <p>
          Oregon Metro has created a regional equitable housing framework
          outlining 5 strategies to help serve families at different income
          levels.
        </p>

        <PDF url="https://www.oregonmetro.gov/sites/default/files/2018/04/19/Equitable-Housing-Initiative-Factsheet-Affordability-201804.pdf" />
        <p>
          With affordable housing becoming increasingly out of reach, government
          entities have implemented policies aimed at increasing accessibility.
          The conversation surrounding affordable housing is tricky since many
          people look to housing policy not only to keep housing affordable but
          also, to protect residential neighborhoods from things adversely
          affecting home values.
        </p>
      </CivicStoryCard>
    );
  }
}

AffordabilityInAComplexHousingMarket.displayName =
  'AffordabilityInAComplexHousingMarket';

// Connect this to the redux store when necessary
export default AffordabilityInAComplexHousingMarket;
