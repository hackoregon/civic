import React from 'react';

import {
  CivicStoryCard,
  HorizontalBarChart,
  civicFormat,
} from '@hackoregon/component-library';

const data = [
  {
    category: 'Influencers',
    importance: 0.532761433,
    sortOrder: 11,
  },
  {
    category: '$ Expenditures',
    importance: 0.2577329977621656,
    sortOrder: 10,
  },
  { category: '$ Received', importance: 0.22949919907509095, sortOrder: 9 },
  {
    category: 'Primary Vote Count',
    importance: 0.22878431536282723,
    sortOrder: 8,
  },
  {
    category: 'Grassroots',
    importance: 0.12021850170825318,
    sortOrder: 7,
  },
  {
    category: 'Republican',
    importance: 0.05830959262159894,
    sortOrder: 6,
  },
  {
    category: 'Democrat',
    importance: 0.019450051372393994,
    sortOrder: 5,
  },
  {
    category: 'St. Senator',
    importance: 0.03578981589773275,
    sortOrder: 4,
  },
  {
    category: 'St. Representative',
    importance: 0.033471046408828774,
    sortOrder: 3,
  },
  {
    category: 'Governor',
    importance: 0.012904292200920951,
    sortOrder: 2,
  },
  {
    category: 'Attorney General',
    importance: 0.00384018759018759,
    sortOrder: 1,
  },
];

function compareNumbers(a, b) {
  return b - a;
}

data.sort(compareNumbers);

export class OutraisingYourOpponent extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Outraising Your Opponent"
        slug="outraising-your-opponent"
      >
        <HorizontalBarChart
          xLabel="Importance"
          yLabel="Feature"
          title="What Really Predicts Who Wins Election"
          subtitle="Feature importance for Oregon elections"
          dataLabel="category"
          dataValue="importance"
          xAxisLabel="Importance"
          sortOrder="sortOrder"
          data={data}
          dataValueFormatter={civicFormat.percentage}
          domain={{ x: [0, 0.6], y: [1, 11] }}
        />
      </CivicStoryCard>
    );
  }
}

OutraisingYourOpponent.displayName = 'OutraisingYourOpponent';

// Connect this to the redux store when necessary
export default OutraisingYourOpponent;
