import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { extent, scaleQuantize } from "d3";

import {
  BaseMap,
  ChartContainer,
  civicFormat,
  HorizontalBarChart,
  LineChart,
  MapOverlay,
  MapTooltip,
  VisualizationColors
} from "@hackoregon/component-library";
import TempLoader from "../TempLoader/TempLoader";

const RACE_LABEL_MAP = {
  black: "Black",
  white: "White",
  hisp: "Hispanic or Latino",
  asian: "Asian/Pacific Islander"
};

const HomeAppreciationVisualization = ({ data }) => {
  if (
    !data ||
    !isLoaded(data.annualHomeAppreciation) ||
    !isLoaded(data.homeownershipByRace) ||
    !isLoaded(data.homeInflationData)
  ) {
    return <TempLoader />;
  }

  const dataSeriesLabels = [
    { category: "adj_appreciation_med", label: "adj_appreciation_med" },
    { category: "adj_appreciation_25th", label: "adj_appreciation_25th" },
    { category: "adj_appreciation_75th", label: "adj_appreciation_75th" }
  ];

  const lineChartData = data.annualHomeAppreciation.value.results.flatMap(
    yearData => [
      {
        series: "raw_appreciation_med", // make this match the dataSeriesLabels
        value: yearData.raw_appreciation_med, // make this match the dataSeriesLabels
        sale_year: yearData.sale_year
      },
      {
        series: "adj_appreciation_25th",
        value: yearData.adj_appreciation_25th,
        sale_year: yearData.sale_year
      },
      {
        series: "adj_appreciation_75th",
        value: yearData.adj_appreciation_75th,
        sale_year: yearData.sale_year
      }
    ]
  );
  );
  const barChartData = data.homeownershipByRace.value.results.map(el => ({
    ...el,
    label: RACE_LABEL_MAP[el.race]
  }));

  // Map Data
  const polygonFieldName = "appreciation_estimates";
  const homeInflationFeatures = data.homeInflationData.value.results.features;
  const minMax = extent(homeInflationFeatures, f =>
    parseFloat(f.properties[polygonFieldName])
  );
  const colorScale = scaleQuantize()
    .domain(minMax)
    .range(VisualizationColors.sequential.ocean);

  return (
    <span>
      <HorizontalBarChart
        data={barChartData}
        dataValue="home_ownership_rate"
        dataLabel="label"
        title="Home Ownership By Race In Multhomah County (1990)"
        xLabel="Home Ownership Rate"
        yLabel="Race"
        dataValueFormatter={x => civicFormat.percentage(x)}
        protect
      />
      <strong style={{ color: "crimson" }}>
        LineChart Visualization TODO:
        <ul>
          <li>
            Make the confidence interval lines dashed & all lines the same color
            (see note on lineChartData)
          </li>
        </ul>
      </strong>
      <LineChart
        data={lineChartData}
        dataSeriesLabel={dataSeriesLabels}
        dataKey="sale_year"
        dataValue="value"
        dataSeries="series"
        title="Per-House Appreciation For Houses Last Sold Between 1987 and 1993"
        subtitle="Median inflation adjusted appreciation ($) with 25th and 75th percentile ranges"
        xLabel="Sale Year"
        yLabel="Appreciation ($)"
        xNumberFormatter={x => civicFormat.year(x)}
        yNumberFormatter={y => civicFormat.dollars(y)}
        protect
      />
      protect
      <strong style={{ color: "crimson" }}>
        Map Visualization TODO:
        <ul>
          <li>Figure out what is wrong with this map... </li>
        </ul>
      </strong>
      <ChartContainer
        title="Per-House Appreciation For Houses Last Sold Between 1987 and 1993"
        subtitle="Median inflation adjusted sale price ($) for sold between 1987-1993 and again 2015-2016"
      >
        <BaseMap initialZoom={9.9} maxZoom={13} minZoom={6} updateViewport>
          <MapOverlay
            data={homeInflationFeatures}
            getFillColor={f => colorScale(f.properties[polygonFieldName])}
            stroked={false}
            opacity={0.25}
          >
            <MapTooltip
              primaryName={polygonFieldName}
              primaryField={polygonFieldName}
            />
          </MapOverlay>
        </BaseMap>
      </ChartContainer>
    </span>
  );
};

HomeAppreciationVisualization.propTypes = {
  data: PropTypes.shape({ annualHomeAppreciation: resourceShape })
};

export default HomeAppreciationVisualization;
