import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class PacificNorthwestTopsNationInSurgingHomePrices extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Pacific Northwest Tops the Nation in Surging Home Prices"
        slug="pacific-northwest-tops-nation-in-surging-home-prices"
      >
        <p>The JCHS of Harvard University reports on the metro-area home
           price changes over time and looks at changes in value between peaks and
           troughs in the housing market. </p>

        <Placeholder issue="58" />
        <p>If we consider the most recent trough period associated with the
           recession up until 2016, Portland is ranked 104 out of 120. In this case, 
           a rank of 1 indicates the least change, and a rank of 120 indicates the greatest
           increase in home prices. If we look at a more recent period that considers December 
           2015 through December 2016, Portland is ranked 119 out of 120, followed by Seattle.</p>
            
      </CivicStoryCard>
    );
  }
}

PacificNorthwestTopsNationInSurgingHomePrices.displayName = 'PacificNorthwestTopsNationInSurgingHomePrices';

// Connect this to the redux store when necessary
export default PacificNorthwestTopsNationInSurgingHomePrices;
