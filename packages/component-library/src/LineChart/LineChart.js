import PropTypes from "prop-types";
import React from "react";
import { groupBy } from "lodash";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryScatter,
  VictoryTooltip,
  VictoryLine
} from "victory";

import ChartContainer from "../ChartContainer";
import SimpleLegend from "../SimpleLegend";
import civicFormat from "../utils/civicFormat";
import {
  chartEvents,
  getDefaultDomain,
  getDefaultDataSeriesLabels,
  getDefaultFillStyle,
  getDefaultLineStyle
} from "../utils/chartHelpers";
import CivicVictoryTheme from "../VictoryTheme/VictoryThemeIndex";

const LineChart = ({
  data,
  dataKey,
  dataKeyLabel,
  dataValue,
  dataValueLabel,
  dataSeries,
  dataSeriesLabel,
  domain,
  size,
  style,
  subtitle,
  title,
  xLabel,
  yLabel,
  xNumberFormatter,
  yNumberFormatter,
  legendComponent
}) => {
  const chartDomain = domain || getDefaultDomain(data, dataKey, dataValue);

  const dataSeriesLabels = dataSeries
    ? dataSeriesLabel || getDefaultDataSeriesLabels(data, dataSeries)
    : null;

  const scatterPlotStyle = style || getDefaultFillStyle(dataSeriesLabels);

  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  const lineData = dataSeries ? groupBy(data, dataSeries) : { category: data };

  const lines = lineData
    ? Object.keys(lineData).map((category, index) => (
        <VictoryLine
          key={category}
          data={lineData[category].map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            series: d[dataSeries]
          }))}
          x="dataKey"
          y="dataValue"
          style={getDefaultLineStyle(index)}
          standalone={false}
          // TODO: This is a workaround for a Victory bug that results in incomplete
          // line animations when the animate properties are derived from the VictoryChart
          // wrapping component. Remove this direct animate after the bug is fixed.
          // https://github.com/FormidableLabs/victory/issues/1282
          animate={100}
        />
      ))
    : null;

  return (
    <ChartContainer title={title} subtitle={subtitle}>
      {legendData &&
        (legendComponent ? (
          legendComponent(legendData)
        ) : (
          <SimpleLegend className="legend" legendData={legendData} />
        ))}

      <VictoryChart
        domain={chartDomain}
        padding={{ left: 75, right: 50, bottom: 50, top: 50 }}
        theme={CivicVictoryTheme.civic}
      >
        <VictoryAxis
          style={{ grid: { stroke: "none" } }}
          tickFormat={x => xNumberFormatter(x)}
          title="X Axis"
        />
        <VictoryAxis
          dependentAxis
          tickFormat={y => yNumberFormatter(y)}
          title="Y Axis"
        />
        <VictoryPortal>
          <VictoryLabel
            style={{ ...CivicVictoryTheme.civic.axisLabel.style }}
            text={yLabel}
            textAnchor="middle"
            title="Y Axis Label"
            verticalAnchor="end"
            x={75}
            y={45}
          />
        </VictoryPortal>
        <VictoryPortal>
          <VictoryLabel
            style={{ ...CivicVictoryTheme.civic.axisLabel.style }}
            text={xLabel}
            textAnchor="end"
            title="X Axis Label"
            verticalAnchor="end"
            x={600}
            y={295}
          />
        </VictoryPortal>
        {lines}
        <VictoryScatter
          //        categories={{ x: categoryData }}
          data={data.map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            label: `${dataKeyLabel || xLabel}: ${xNumberFormatter(
              d[dataKey]
            )} • ${dataValueLabel || yLabel}: ${yNumberFormatter(
              d[dataValue]
            )}`,
            series: d[dataSeries],
            size: size ? d[size.key] || size.value : 3
          }))}
          events={chartEvents}
          labelComponent={
            <VictoryTooltip
              x={325}
              y={0}
              orientation="bottom"
              pointerLength={0}
              cornerRadius={0}
              theme={CivicVictoryTheme.civic}
            />
          }
          size={d => d.size}
          style={scatterPlotStyle}
          title="Scatter Plot"
          x="dataKey"
          y="dataValue"
        />
      </VictoryChart>
    </ChartContainer>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
  ),
  dataKey: PropTypes.string,
  dataKeyLabel: PropTypes.string,
  dataValue: PropTypes.string,
  dataValueLabel: PropTypes.string,
  dataSeries: PropTypes.string,
  dataSeriesLabel: PropTypes.arrayOf(
    PropTypes.shape({ category: PropTypes.string, label: PropTypes.string })
  ),
  domain: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  size: PropTypes.shape({ key: PropTypes.string, value: PropTypes.string }),
  style: PropTypes.arrayOf(PropTypes.shape({})),
  subtitle: PropTypes.string,
  title: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  xNumberFormatter: PropTypes.func,
  yNumberFormatter: PropTypes.func,
  legendComponent: PropTypes.func
};

LineChart.defaultProps = {
  data: null,
  dataKey: "x",
  dataKeyLabel: null,
  dataValue: "y",
  dataValueLabel: null,
  dataSeries: null,
  dataSeriesLabel: null,
  domain: null,
  size: null,
  style: null,
  subtitle: null,
  title: null,
  xLabel: "X",
  yLabel: "Y",
  xNumberFormatter: civicFormat.numeric,
  yNumberFormatter: civicFormat.numeric,
  legendComponent: null
};

export default LineChart;
