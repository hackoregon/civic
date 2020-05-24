/* eslint-disable react/prop-types */
import React from "react";
import { civicFormat } from "@hackoregon/utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { LineChart } from "@hackoregon/ui-charts";

// this file should only be used for stories

function SampleCardVisualization({ isLoading, data }) {
  return (
    !isLoading &&
    data && (
      <LineChart
        data={data}
        dataKey="year"
        dataValue="weekday_sum_ons"
        title="Portland Transit Ridership - Weekdays"
        xLabel="Year"
        yLabel="Ridership"
        xNumberFormatter={civicFormat.year}
        subtitle="Average daily ridership for all TriMet bus and rail"
      />
    )
  );
}

export default SampleCardVisualization;
