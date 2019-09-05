import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { civicFormat, LineChart } from "@hackoregon/component-library";

const HouseholdIncomeByRaceVisualization = ({ data }) => {
  if (!isLoaded(data.householdIncomeByRace)) return <div>Data Loading...</div>;

  const dataSeriesLabels = [
    { category: "Asian/Pacific Islander", label: "Asian/Pacific Islander" },
    { category: "Black", label: "Black" },
    { category: "Another race", label: "Another race" },
    { category: "Hispanic or Latino", label: "Hispanic or Latino" },
    { category: "Native American", label: "Native American" },
    { category: "White", label: "White" }
  ];

  return (
    data && (
      <span>
        <strong style={{ color: "crimson" }}>
          Visualization TODO:
          <ul>
            <li>Figure out why dot colors do not match lines...</li>
          </ul>
        </strong>
        <LineChart
          data={data.householdIncomeByRace.value.results}
          dataKey="year"
          dataValue="adjusted_median_income"
          dataSeries="race_explicit"
          dataSeriesLabel={dataSeriesLabels}
          domain={{
            x: [1990, 2017],
            y: [30000, 80200]
          }}
          subtitle="Portland 7-county MSA, 1990 to 2017, adjusted for inflation to 2018"
          title="Median Household Income by Race over Time"
          xLabel="Census Year"
          yLabel="Income"
          xNumberFormatter={x => civicFormat.year(x)}
          yNumberFormatter={y => civicFormat.dollars(y)}
        />
      </span>
    )
  );
};

HouseholdIncomeByRaceVisualization.propTypes = {
  data: PropTypes.shape({ householdIncomeByRace: resourceShape })
};

export default HouseholdIncomeByRaceVisualization;
