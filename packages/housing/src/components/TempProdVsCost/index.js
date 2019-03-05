import React from 'react';
import { StoryCard } from '@hackoregon/component-library';

import LineChart from './LineChart';

import eastData from './east.json';
import northData from './north.json';
import allData from './all.json';

const colors = [
  undefined,
  '#a7a7a7',
  '#99b2ce',
  '#3b5d85',
  '#ab070a',
  '#e3070a',
];

const stackUnitGrowth = json =>
  json.map(year => {
    // eslint-disable-next-line no-param-reassign
    year['Multifamily Unit Growth (Stacked)'] +=
      year['Single Family Unit Growth (Stacked)'];
    return year;
  });

const headingStyle = {
  textAlign: 'center',
  padding: '0 1em',
};

const pStyle = {
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '0 1em',
  textAlign: 'left',
};

const TempProdVsCost = () => (
  <StoryCard
    title="Housing Production and Cost"
    collectionId="housing"
    cardId="production-and-cost"
  >
    <p style={pStyle}>
      Over the last ten years, the Portland region has&nbsp;
      <a href="http://www.oregonmetro.gov/news/you-are-here-snapshot-how-were-growing">
        gained
      </a>
      &nbsp;over&nbsp;
      <a href="https://www.pdx.edu/prc/population-reports-estimates">
        250,000 new residents
      </a>
      . But it takes time to finance, design, and build new buildings. During
      this same period, the Portland metro area built&nbsp;
      <a href="https://oregoneconomicanalysis.com/2017/03/28/housing-recovery-still-incomplete/">
        &#32;27,000 fewer homes&#32;
      </a>
      &nbsp;than expected given its rising population. Even with all the new
      high rises in inner Portland, new units will take years to catch up with
      demand. This series of line graphs invites you to explore the relationship
      of population and housing production to housing costs. Check back next
      month for an interactive version of these graphs that will allow you to
      explore your neighborhood and compare it to other neighborhoods around the
      city.
    </p>
    <p style={pStyle}>
      In order to better compare values, these graphs compare annual percentage
      growth rather than absolute values. In the charts that follow, a line that
      holds steady at 2%, for example, represents steady growth. A line that
      increases represents an acceleration (in costs, in production of housing
      units, etc.). And a decreasing line that remains above zero represents a
      slowing in the rate of growth.
    </p>
    <p style={pStyle}>
      There are some commonalities between all Portland neighborhoods:
      Homeownership prices were still decreasing in 2011 following the housing
      crash of 2008, but began a rapid acceleration in 2012, followed by a brief
      slowing in the rate of growth in 2014. Rental prices grew every year from
      2011 through 2015, although again, there was a brief slowing of the rate
      of growth in 2014.
    </p>
    <h3 style={headingStyle}>Portland Housing Production and Costs</h3>
    <LineChart data={stackUnitGrowth(allData)} colors={colors} />
    <p style={pStyle}>
      This pattern of increasing and moderating growth holds true across all
      neighborhoods. However, we see a slower rate of growth in housing costs in
      inner Portland neighborhoods that experienced significant new
      construction, like the Interstate corridor and NE Alberta:
    </p>
    <h3 style={headingStyle}>
      Inner N and NE Portland Housing Production and Costs
    </h3>
    <LineChart data={stackUnitGrowth(northData)} colors={colors} />
    <p style={pStyle}>
      In contrast, areas that saw little new construction, like outer East
      Portland, saw steeper increases in both home prices and rental costs.
    </p>
    <h3 style={headingStyle}>
      Outer East Portland Housing Production and Costs
    </h3>
    <LineChart data={stackUnitGrowth(eastData)} colors={colors} />
    <p style={pStyle}>
      These charts suggest that greater amounts of new housing built in specific
      neighborhoods has been correlated with a slowing of the rate at which the
      cost of housing increases in those same neighborhoods. What does this mean
      for Portland going forward? Explore the underlying data, and consider its
      implications for our city&nbsp;
      <a href="https://github.com/hackoregon/housing-backend/wiki">here</a>.
    </p>
  </StoryCard>
);

export default TempProdVsCost;
