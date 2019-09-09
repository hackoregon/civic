import { useState } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { scaleQuantize } from "d3";
import { css, jsx } from "@emotion/core";
/** @jsx jsx */

import {
  BaseMap,
  ChartContainer,
  civicFormat,
  HorizontalBarChart,
  LineChart,
  MapOverlay,
  MapTooltip,
  Slider,
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
  const [threshold, setThreshold] = useState(200000);

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
  // Binary color scale for above or below the threshold
  const colorScale = scaleQuantize()
    .domain([threshold - 0.1, threshold])
    .range([
      [114, 99, 113, 100], // Brand Plum Light
      VisualizationColors.categorical.pink.mapFormatRGBA
    ]);

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
      <div
        css={css`
          width: fit-content;
        `}
      >
        <h5
          css={css`
            margin-bottom: 0.75rem;
          `}
        >
          {`Per-House Appreciation Threshold`}
        </h5>
        <Slider.SliderWithTooltip
          min={0}
          max={1000000}
          defaultValue={threshold}
          step={100000}
          tipFormatter={value => civicFormat.dollars(value)}
          onChange={value => setThreshold(value)}
          value={threshold}
        />
      </div>
      <ChartContainer
        title={`Areas with >${civicFormat.dollars(
          threshold
        )} Appreciation Per-House Between ~1990 and ~2015`}
        subtitle="Median inflation adjusted sale price for houses sold between 1987-1993 and again 2015-2016 (Use the slider above to adjust the threshold)"
      >
        <BaseMap initialZoom={9.9} maxZoom={13} minZoom={6} updateViewport>
          <MapOverlay
            data={homeInflationFeatures}
            getFillColor={f => colorScale(f.properties[polygonFieldName])}
            stroked={false}
            opacity={0.25}
          >
            <MapTooltip
              tooltipDataArray={[
                {
                  name: "Median Appreciation Per-House",
                  field: polygonFieldName,
                  formatField: f => civicFormat.dollars(f)
                }
              ]}
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
