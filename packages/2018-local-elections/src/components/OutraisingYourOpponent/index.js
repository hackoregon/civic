import React from 'react';

import { CivicStoryCard, Placeholder, HorizontalBarChart } from '@hackoregon/component-library';
import { percentage } from '@hackoregon/component-library/src/utils/formatters'

const data = [
  {
    category: "amount_contrib",
    importance: 0.128552254,
    sortOrder: 9
  },
  {
    category: "amount_expend",
    importance: 0.134080107,
    sortOrder: 10
  },
  {
    category: "amount_groots",
    importance: 0.043643585,
    sortOrder: 7
  },
  {
    category: "Influential contributers",
    importance: 0.532761433,
    sortOrder: 11
  },
  {
    category: "most_votes_primary",
    importance: 0.114947699,
    sortOrder: 8
  },
  {
    category: "party_affiliation_Democrat",
    importance: 0.012570137,
    sortOrder: 5
  },
  {
    category: "party_affiliation_Republican",
    importance: 0.015123368,
    sortOrder: 6
  },
  {
    category: "race_Attorney General",
    importance: 0.00065277,
    sortOrder: 1
  },
  {
    category: "race_Governor",
    importance: 0.002783337,
    sortOrder: 2
  },
  {
    category: "race_State Representative",
    importance: 0.00391163,
    sortOrder: 3
  },
  {
    category: "race_State Senator",
    importance: 0.01097368,
    sortOrder: 4
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
          dataValueFormatter={percentage}
        />
      </CivicStoryCard>
    );
  }
}

OutraisingYourOpponent.displayName = 'OutraisingYourOpponent';

// Connect this to the redux store when necessary
export default OutraisingYourOpponent;
