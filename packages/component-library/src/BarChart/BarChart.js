import React from "react";
import PropTypes from "prop-types";

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryTooltip
} from "victory";

import ChartContainer from "../ChartContainer";
import DataChecker from "../utils/DataChecker";
import civicFormat from "../utils/civicFormat";
import { chartEvents, getDefaultDomain } from "../utils/chartHelpers";
import CivicVictoryTheme from "../VictoryTheme/VictoryThemeIndex";

const BarChart = ({
  data,
  dataKey,
  dataValue,
  domain,
  title,
  subtitle,
  xLabel,
  yLabel,
  xNumberFormatter,
  yNumberFormatter,
  barWidth,
  loading,
  error
}) => {
  const chartDomain = domain || getDefaultDomain(data, dataKey, dataValue);

  return (
    <ChartContainer
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
    >
      <DataChecker dataAccessors={{ dataKey, dataValue }} data={data}>
        <VictoryChart
          padding={{ left: 90, right: 50, bottom: 50, top: 50 }}
          domainPadding={{ x: [40, 40], y: [0, 0] }}
          theme={CivicVictoryTheme.civic}
          domain={chartDomain}
        >
          <VictoryAxis
            tickFormat={xNumberFormatter}
            style={{ grid: { stroke: "none" } }}
            title="X Axis"
          />
          <VictoryAxis
            dependentAxis
            tickFormat={yNumberFormatter}
            title="Y Axis"
          />
          <VictoryPortal>
            <VictoryLabel
              style={{ ...CivicVictoryTheme.civic.axisLabel.style }}
              text={yLabel}
              textAnchor="middle"
              title="Y Axis Label"
              verticalAnchor="end"
              x={85}
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
          <VictoryBar
            alignment="middle"
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
            data={data.map(d => ({
              dataKey: d[dataKey],
              dataValue: d[dataValue],
              label: `${xLabel}: ${xNumberFormatter(
                d[dataKey]
              )} • ${yLabel}: ${yNumberFormatter(d[dataValue])}`
            }))}
            events={chartEvents}
            x="dataKey"
            y="dataValue"
            title="Bar Chart"
            style={{ data: { width: barWidth } }}
          />
        </VictoryChart>
      </DataChecker>
    </ChartContainer>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  dataKey: PropTypes.string,
  dataValue: PropTypes.string,
  domain: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  xNumberFormatter: PropTypes.func,
  yNumberFormatter: PropTypes.func,
  barWidth: PropTypes.number
};

BarChart.defaultProps = {
  data: null,
  dataKey: "x",
  dataValue: "y",
  domain: null,
  title: null,
  subtitle: null,
  xLabel: "X",
  yLabel: "Y",
  xNumberFormatter: civicFormat.year,
  yNumberFormatter: civicFormat.numeric,
  barWidth: null
};

export default BarChart;
