import React from "react";
import PropTypes from "prop-types";

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryTooltip,
  VictoryGroup
} from "victory";

import { ThemeProvider } from "emotion-theming";
import { VictoryTheme } from "../_Themes/index";

import ChartContainer from "../ChartContainer";
import DataChecker from "../utils/DataChecker";
import civicFormat from "../utils/civicFormat";
import { chartEvents, getDefaultDomain } from "../utils/chartHelpers";

const BarChart = ({
  data,
  dataKey,
  dataValue,
  dataSeries,
  domain,
  title,
  subtitle,
  xLabel,
  yLabel,
  xNumberFormatter,
  yNumberFormatter,
  barWidth,
  loading,
  error,
  theme
}) => {
  const safeData = data && data.length ? data : [{}];
  const chartDomain = domain || getDefaultDomain(safeData, dataKey, dataValue);
  const categories = dataSeries && [
    ...new Set(safeData.map(d => d[dataSeries]))
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChartContainer
        title={title}
        subtitle={subtitle}
        loading={loading}
        error={error}
      >
        <DataChecker dataAccessors={{ dataKey, dataValue }} data={safeData}>
          <VictoryChart
            padding={{ left: 90, right: 50, bottom: 50, top: 50 }}
            domainPadding={{ x: [40, 40], y: [0, 0] }}
            domain={chartDomain}
            theme={theme}
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
                style={{ ...theme.axisLabel.style }}
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
                style={{ ...theme.axisLabel.style }}
                text={xLabel}
                textAnchor="end"
                title="X Axis Label"
                verticalAnchor="end"
                x={600}
                y={295}
              />
            </VictoryPortal>
            {!dataSeries && (
              <VictoryBar
                alignment="middle"
                labelComponent={
                  <VictoryTooltip
                    x={325}
                    y={0}
                    orientation="bottom"
                    pointerLength={0}
                    cornerRadius={0}
                    theme={theme}
                  />
                }
                data={safeData.map(d => ({
                  dataKey: d[dataKey],
                  dataValue: d[dataValue],
                  label: `${xLabel}: ${xNumberFormatter(
                    d[dataKey]
                  )} • ${yLabel}: ${yNumberFormatter(d[dataValue])}`
                }))}
                events={chartEvents(theme)}
                x="dataKey"
                y="dataValue"
                title="Bar Chart"
                style={{ data: { width: barWidth } }}
                animate
              />
            )}
            {dataSeries && (
              <VictoryGroup
                offset={(barWidth || theme.bar.style.data.width) * 1.5}
                colorScale={theme.group.colorScale}
              >
                {categories.map(category => (
                  <VictoryBar
                    alignment="middle"
                    labelComponent={
                      <VictoryTooltip
                        x={325}
                        y={0}
                        orientation="bottom"
                        pointerLength={0}
                        cornerRadius={0}
                        theme={theme}
                      />
                    }
                    data={safeData
                      .filter(d => d[dataSeries] === category)
                      .map(d => ({
                        dataKey: d[dataKey],
                        dataValue: d[dataValue],
                        label: `${xLabel}: ${xNumberFormatter(
                          d[dataKey]
                        )} • ${yLabel}: ${yNumberFormatter(d[dataValue])}`
                      }))}
                    events={chartEvents(theme)}
                    x="dataKey"
                    y="dataValue"
                    title="Bar Chart"
                    style={{
                      data: { width: barWidth || theme.bar.style.data.width }
                    }}
                    animate
                  />
                ))}
              </VictoryGroup>
            )}
          </VictoryChart>
        </DataChecker>
      </ChartContainer>
    </ThemeProvider>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  error: PropTypes.string,
  dataKey: PropTypes.string,
  dataValue: PropTypes.string,
  dataSeries: PropTypes.string,
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
  barWidth: PropTypes.number,
  theme: PropTypes.shape({})
};

BarChart.defaultProps = {
  data: null,
  dataKey: "x",
  dataValue: "y",
  dataSeries: null,
  domain: null,
  title: null,
  subtitle: null,
  xLabel: "X",
  yLabel: "Y",
  xNumberFormatter: civicFormat.year,
  yNumberFormatter: civicFormat.numeric,
  barWidth: null,
  theme: VictoryTheme
};

export default BarChart;
