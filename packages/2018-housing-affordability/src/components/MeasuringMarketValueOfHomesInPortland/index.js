import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class MeasuringMarketValueOfHomesInPortland extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Measuring Market Value of Homes in Portland"
        slug="measuring-market-value-of-homes-in-portland"
      >
        <p>Every year, properties are assessed for their total real market value,
           which includes the building  and land value. Tracking how this value changes 
           from year-to-year may be informative for identifying trends in the housing market
           and how different areas within the city are changing in value.</p>
        <Placeholder issue="215" />
        <p>Metro compiles data from Clackamas, Multnomah, and Washington counties. The records 
          are created and maintained by county Assessment and Taxation offices. When interpreting
          this data, note that given the transfer of records between agencies, some data may not 
          be completely up to date.</p>

      </CivicStoryCard>
    );
  }
}

MeasuringMarketValueOfHomesInPortland.displayName = 'MeasuringMarketValueOfHomesInPortland';

// Connect this to the redux store when necessary
export default MeasuringMarketValueOfHomesInPortland;
