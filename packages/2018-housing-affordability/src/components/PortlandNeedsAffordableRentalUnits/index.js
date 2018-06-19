import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class PortlandNeedsAffordableRentalUnits extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Portland Needs Affordable Rental Units"
        slug="portland-needs-affordable-rental-units"
      > <p>Portland Metro area lost nearly 39,645 affordable
         units from 2005 to 2015. During that same time, the region’s 
         need for affordable units also grew.</p>

        <Placeholder issue="55" />
        <p>To understand the need for affordable housing, we can turn to a recent 
          Urban Institute report. It tracks the number of AAA (adequate, affordable, and available)
          units for extremely low income (ELI) households (making less than 30% of the area median income).
          Of all the country’s counties, Multnomah County ranked 2833 out of 3142 in 2014 with regards to having
          enough AAA housing for ELI households.   
          <br />
          <br />
          Nationwide, there is not enough affordable housing available to extremely low-income households. 
          In 2014, there were 11,775,631 ELI households in the United States, and only 46 adequate, affordable,
          and available (AAA) units per 100 households deemed affordable. While this is happening across the
          country, the situation in the Portland metropolitan area is especially concerning. 
          <br />
          <br />
          In 2000, there were about 39,786 extremely low income households in Multnomah, Washington and 
          Clackamas Counties. In 2014, that number increased to 63,825 households. This indicates the need 
          for affordable housing has increased. As of 2014, Multnomah County had 29 units, Clackamas County had
          28 units, and Washington County had 21 available affordable units per 100 households that needed them. 
          <br />
          <br />
          The National Low Income Housing Coalition reported in March 2017 that the region needs 25,958 rental
          units for families making 50% of median family income, and 52,848 for those making 30%.</p>

      </CivicStoryCard>
    );
  }
}

PortlandNeedsAffordableRentalUnits.displayName = 'PortlandNeedsAffordableRentalUnits';

// Connect this to the redux store when necessary
export default PortlandNeedsAffordableRentalUnits;
