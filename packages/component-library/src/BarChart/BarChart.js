import React from "react";
import PropTypes from "prop-types";

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryTooltip,
  VictoryGroup,
  VictoryLine
} from "victory";

import { ThemeProvider } from "emotion-theming";
import { VictoryTheme } from "../_Themes/index";

import ChartContainer from "../ChartContainer";
import SimpleLegend from "../SimpleLegend";
import DataChecker from "../utils/DataChecker";
import civicFormat from "../utils/civicFormat";
import protectData from "../utils/protectData";
import {
  chartEvents,
  getDefaultDomain,
  getDefaultDataSeriesLabels
} from "../utils/chartHelpers";

const BarChart = ({
  data,
  dataKey,
  dataValue,
  dataSeries,
  dataSeriesLabel,
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
  theme,
  legendComponent,
  protect,
  annotations
}) => {
  const safeData = data && data.length ? data : [{}];
  const chartDomain = domain || getDefaultDomain(safeData, dataKey, dataValue);
  const categories = dataSeries && [
    ...new Set(safeData.map(d => d[dataSeries]))
  ];

  const safeDataSeriesLabel =
    // eslint-disable-next-line no-nested-ternary
    dataSeriesLabel && dataSeriesLabel.length
      ? protect
        ? protectData(dataSeriesLabel, { x: "category", y: "label" })
        : dataSeriesLabel
      : null;

  const dataSeriesLabels = dataSeries
    ? safeDataSeriesLabel || getDefaultDataSeriesLabels(safeData, dataSeries)
    : null;

  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  return (
    <ThemeProvider theme={theme}>
      <ChartContainer
        title={title}
        subtitle={subtitle}
        loading={loading}
        error={error}
      >
        {legendData &&
          (legendComponent ? (
            legendComponent(legendData, theme)
          ) : (
            <SimpleLegend
              className="legend"
              legendData={legendData}
              theme={theme}
            />
          ))}
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
            {annotations && (
              <VictoryLine
                style={{
                  data: { stroke: "red", strokeWidth: 2 },
                  labels: { angle: -90, fill: "red", fontSize: 20 }
                }}
                labels={["Important"]}
                labelComponent={<VictoryLabel y={100} />}
                x={() => 5000}
              />
            )}
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
                offset={(barWidth || theme.bar.style.data.width) * 1.2}
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
  dataSeriesLabel: PropTypes.arrayOf(
    PropTypes.shape({ category: PropTypes.string, label: PropTypes.string })
  ),
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
  theme: PropTypes.shape({}),
  legendComponent: PropTypes.node,
  protect: PropTypes.bool,
  annotations: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  )
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
  theme: VictoryTheme,
  legendComponent: null,
  protect: false,
  annotations: null
};

export default BarChart;
