import React from "react";
import PropTypes from "prop-types";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryTooltip,
  VictoryStack,
  VictoryGroup,
  VictoryLine
} from "victory";
import shortid from "shortid";
import SimpleLegend from "../SimpleLegend";
import ChartContainer from "../ChartContainer";
import civicFormat from "../utils/civicFormat";
import {
  chartEvents,
  getDefaultDataSeriesLabels,
  transformDatato100
} from "../utils/chartHelpers";
import groupByKey from "../utils/groupByKey";
import DataChecker from "../utils/DataChecker";
import protectData from "../utils/protectData";
import { VictoryTheme } from "../_Themes/index";

const HorizontalBarChart = ({
  data,
  sortOrder,
  dataValue,
  dataLabel,
  domain,
  title,
  loading,
  error,
  subtitle,
  xLabel,
  yLabel,
  dataValueFormatter,
  dataLabelFormatter,
  minimalist,
  stacked,
  grouped,
  hundredPercentData,
  dataSeriesKey,
  dataSeriesLabel,
  legendComponent,
  theme,
  protect,
  annotations
}) => {
  const safeData =
    // eslint-disable-next-line no-nested-ternary
    data && data.length
      ? protect
        ? protectData(data, { dataLabel, dataSeriesKey })
        : data
      : [{}];

  const groupedDataIfStackedOrGrouped = () => {
    if (stacked || grouped) {
      if (hundredPercentData) {
        return transformDatato100(
          groupByKey(safeData, dataSeriesKey, dataLabel),
          dataLabel,
          dataValue
        );
      }
      return groupByKey(safeData, dataSeriesKey, dataLabel);
    }
    return safeData;
  };
  const groupedData = groupedDataIfStackedOrGrouped();
  const barData =
    sortOrder && sortOrder.length
      ? safeData
      : safeData.map((d, index) => {
          return { ...d, defaultSort: index + 1 };
        });
  const sortOrderKey =
    sortOrder && sortOrder.length ? sortOrder : "defaultSort";
  const padding = minimalist
    ? { left: 115, right: 50, bottom: 25, top: 40 }
    : { left: 115, right: 50, bottom: 50, top: 70 };
  const barHeight = theme.bar.style.data.width;
  const spaceHeight = theme.bar.style.data.padding * 2;
  const groupPadding = grouped ? barHeight * 1.2 : 0;
  const additionalHeight = padding.bottom + padding.top + groupPadding * 2;
  const minValue = Math.min(0, ...safeData.map(d => d[dataValue]));

  const bars = stacked ? groupedData.length : safeData.length;
  const spaces = bars - 1;
  const dataHeight = bars * barHeight + spaces * spaceHeight;
  const dataSeriesLabels = dataSeriesKey
    ? dataSeriesLabel || getDefaultDataSeriesLabels(safeData, dataSeriesKey)
    : null;
  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  const NegativeAwareTickLabel = props => (
    <VictoryLabel
      dx={props.scale.y(minValue) - 10} // eslint-disable-line
      {...props}
      textAnchor="end"
    />
  );

  return (
    <ChartContainer
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
      aspectRatio={650 / (dataHeight + additionalHeight)}
    >
      <DataChecker dataAccessors={{ dataValue }} data={safeData}>
        {legendData &&
          (legendComponent ? (
            legendComponent(legendData)
          ) : (
            <SimpleLegend
              className="legend"
              legendData={legendData}
              theme={theme}
            />
          ))}
        <VictoryChart
          height={dataHeight + additionalHeight}
          domain={domain}
          domainPadding={{ x: 11 + groupPadding * 1.2, y: 20 }}
          padding={padding}
          theme={theme}
        >
          <VictoryAxis
            style={{
              tickLabels: { fill: "none" },
              ticks: { stroke: "none" },
              grid: { stroke: "none" }
            }}
            title="Y Axis"
          />
          {annotations &&
            annotations.length &&
            annotations.map(annotation => (
              <VictoryLine
                style={{ data: { strokeDasharray: "10,5" } }}
                labels={[annotation.label]}
                labelComponent={<VictoryLabel y={annotation.y} />}
                y={() => annotation.x}
              />
            ))}
          {!minimalist && (
            <VictoryAxis
              dependentAxis
              orientation="top"
              tickFormat={dataValueFormatter}
              title="X Axis"
              offsetY={padding.top}
            />
          )}
          {!minimalist && (
            <VictoryPortal>
              <VictoryLabel
                style={{ ...theme.axisLabel.style }}
                text={yLabel}
                textAnchor="middle"
                title="Y Axis Label"
                verticalAnchor="end"
                x={50}
                y={65}
              />
            </VictoryPortal>
          )}
          <VictoryPortal>
            <VictoryLabel
              style={{ ...theme.axisLabel.style }}
              text={xLabel}
              textAnchor={minimalist ? "middle" : "end"}
              title="X Axis Label"
              verticalAnchor={minimalist ? "middle" : "end"}
              x={minimalist ? 325 : 600}
              y={minimalist ? 20 : 85}
            />
          </VictoryPortal>
          {!stacked && !grouped && (
            <VictoryBar
              horizontal
              labelComponent={
                <NegativeAwareTickLabel
                  x={0}
                  orientation="left"
                  theme={theme}
                />
              }
              domainPadding={0}
              data={barData.map(d => ({
                sortOrder: d[sortOrderKey],
                dataValue: d[dataValue],
                label: dataLabelFormatter(d[dataLabel])
              }))}
              x="sortOrder"
              y="dataValue"
              events={chartEvents(theme)}
              animate
            />
          )}
          {!stacked && !grouped && (
            <VictoryBar
              horizontal
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
              domainPadding={0}
              data={barData.map(d => ({
                sortOrder: d[sortOrderKey],
                dataValue: d[dataValue],
                label: `${dataLabelFormatter(
                  d[dataLabel]
                )}: ${dataValueFormatter(d[dataValue])}`
              }))}
              style={{
                data: { fill: "none" }
              }}
              title="Horizontal Bar Chart"
              x="sortOrder"
              y="dataValue"
              events={chartEvents(theme)}
              animate
            />
          )}
          {stacked && (
            <VictoryStack colorScale={theme.stack.colorScale}>
              {groupedData.map(arr => {
                return (
                  <VictoryBar
                    title="Horizontal Bar Chart"
                    domainPadding={0}
                    data={arr.map(d => ({
                      dataKey: d[dataLabel],
                      dataValue: d[dataValue],
                      series: d[dataSeriesKey]
                    }))}
                    x="dataKey"
                    y="dataValue"
                    events={chartEvents(theme)}
                    key={shortid.generate()}
                    labels={arr.map(
                      d => `${d[dataSeriesKey]}: ${d[dataValue]}`
                    )}
                    horizontal
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
                    animate
                  />
                );
              })}
            </VictoryStack>
          )}
          {stacked &&
            groupedData.map((arr, i) => {
              return (
                <VictoryAxis
                  style={{
                    tickFormat: arr[i][dataLabel],
                    ticks: { stroke: "none" },
                    grid: { stroke: "none" }
                  }}
                  key={shortid.generate()}
                />
              );
            })}
          {grouped && (
            <VictoryGroup
              colorScale={theme.group.colorScale}
              offset={barHeight * 1.2}
            >
              {groupedData.map(arr => {
                return (
                  <VictoryBar
                    title="Horizontal Bar Chart"
                    barWidth={barHeight}
                    domainPadding={0}
                    data={arr.map(d => ({
                      dataKey: d[dataLabel],
                      dataValue: d[dataValue],
                      series: d[dataSeriesKey]
                    }))}
                    x="dataKey"
                    y="dataValue"
                    events={chartEvents(theme)}
                    key={shortid.generate()}
                    labels={arr.map(
                      d => `${d[dataSeriesKey]}: ${d[dataValue]}`
                    )}
                    horizontal
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
                    animate
                  />
                );
              })}
            </VictoryGroup>
          )}
          {grouped &&
            groupedData.map((arr, i) => {
              return (
                <VictoryAxis
                  style={{
                    tickFormat: arr[i][dataLabel],
                    ticks: { stroke: "none" },
                    grid: { stroke: "none" }
                  }}
                  key={shortid.generate()}
                />
              );
            })}
        </VictoryChart>
      </DataChecker>
    </ChartContainer>
  );
};

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  sortOrder: PropTypes.string,
  dataValue: PropTypes.string,
  dataLabel: PropTypes.string,
  domain: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  dataValueFormatter: PropTypes.func,
  dataLabelFormatter: PropTypes.func,
  minimalist: PropTypes.bool,
  stacked: PropTypes.bool,
  grouped: PropTypes.bool,
  hundredPercentData: PropTypes.bool,
  dataSeriesKey: PropTypes.string,
  dataSeriesLabel: PropTypes.shape({}),
  legendComponent: PropTypes.func,
  theme: PropTypes.shape({}),
  protect: PropTypes.bool,
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      label: PropTypes.string
    })
  )
};

HorizontalBarChart.defaultProps = {
  data: null,
  sortOrder: null,
  dataValue: "x",
  dataLabel: "y",
  domain: null,
  title: null,
  subtitle: null,
  xLabel: "X",
  yLabel: "Y",
  dataValueFormatter: civicFormat.numeric,
  dataLabelFormatter: civicFormat.unformatted,
  minimalist: false,
  stacked: false,
  grouped: false,
  hundredPercentData: false,
  dataSeriesKey: null,
  dataSeriesLabel: {},
  legendComponent: null,
  theme: VictoryTheme,
  protect: false
};

export default HorizontalBarChart;
