/* eslint-disable react/prop-types */
import React from "react";
import { civicFormat } from "@hackoregon/utils";
import { LineChart } from "@hackoregon/ui-charts";

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
