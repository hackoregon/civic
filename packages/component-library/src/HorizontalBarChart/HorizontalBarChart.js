import React from "react";
import PropTypes from "prop-types";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryTooltip,
  VictoryStack
} from "victory";
import shortid from "shortid";
import SimpleLegend from "../SimpleLegend";
import ChartContainer from "../ChartContainer";
import civicFormat from "../utils/civicFormat";
import {
  chartEvents,
  categoricalColors,
  getDefaultDataSeriesLabels,
  transformDatato100
} from "../utils/chartHelpers";
import groupByKey from "../utils/groupByKey";
import DataChecker from "../utils/DataChecker";
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
  hundredPercentData,
  dataSeriesKey,
  dataSeriesLabel,
  legendComponent
}) => {
  const groupedDataIfStacked = () => {
    if (stacked) {
      if (hundredPercentData) {
        return transformDatato100(
          groupByKey(data, dataSeriesKey, dataLabel),
          dataLabel,
          dataValue
        );
      }
      return groupByKey(data, dataSeriesKey, dataLabel);
    }
    return data;
  };
  const groupedData = groupedDataIfStacked();
  const barData =
    sortOrder && sortOrder.length
      ? data
      : data.map((d, index) => {
          return { ...d, defaultSort: index + 1 };
        });
  const sortOrderKey =
    sortOrder && sortOrder.length ? sortOrder : "defaultSort";
  const padding = minimalist
    ? { left: 115, right: 50, bottom: 25, top: 40 }
    : { left: 115, right: 50, bottom: 50, top: 70 };
  const barHeight = VictoryTheme.bar.style.data.width;
  const spaceHeight = VictoryTheme.bar.style.data.padding * 2;
  const additionalHeight = padding.bottom + padding.top;
  const minValue = Math.min(0, ...data.map(d => d[dataValue]));

  const bars = stacked ? groupedData.length : data.length;
  const spaces = bars - 1;
  const dataHeight = bars * barHeight + spaces * spaceHeight;
  const dataSeriesLabels = dataSeriesKey
    ? dataSeriesLabel || getDefaultDataSeriesLabels(data, dataSeriesKey)
    : null;
  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  const NegativeAwareTickLabel = props => (
    <VictoryLabel
      dx={props.scale.y(minValue) - 20} // eslint-disable-line
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
    >
      <DataChecker dataAccessors={{ dataValue }} data={data}>
        {legendData &&
          (legendComponent ? (
            legendComponent(legendData)
          ) : (
            <SimpleLegend className="legend" legendData={legendData} />
          ))}
        <VictoryChart
          height={dataHeight + additionalHeight}
          domain={domain}
          domainPadding={{ x: 11, y: 20 }}
          padding={padding}
          theme={VictoryTheme}
        >
          <VictoryAxis
            style={{
              tickLabels: { fill: "none" },
              ticks: { stroke: "none" },
              grid: { stroke: "none" }
            }}
            title="Y Axis"
          />
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
                style={{ ...VictoryTheme.axisLabel.style }}
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
              style={{ ...VictoryTheme.axisLabel.style }}
              text={xLabel}
              textAnchor={minimalist ? "middle" : "end"}
              title="X Axis Label"
              verticalAnchor={minimalist ? "middle" : "end"}
              x={minimalist ? 325 : 600}
              y={minimalist ? 20 : 85}
            />
          </VictoryPortal>
          {!stacked && (
            <VictoryBar
              horizontal
              labelComponent={
                <NegativeAwareTickLabel
                  x={0}
                  orientation="left"
                  theme={VictoryTheme}
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
              events={chartEvents}
              animate
            />
          )}
          {!stacked && (
            <VictoryBar
              horizontal
              labelComponent={
                <VictoryTooltip
                  x={325}
                  y={0}
                  orientation="bottom"
                  pointerLength={0}
                  cornerRadius={0}
                  theme={VictoryTheme}
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
              events={chartEvents}
              animate
            />
          )}
          {stacked && (
            <VictoryStack colorScale={categoricalColors(groupedData.length)}>
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
                    events={chartEvents}
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
                        theme={VictoryTheme}
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
  hundredPercentData: PropTypes.bool,
  dataSeriesKey: PropTypes.string,
  dataSeriesLabel: PropTypes.shape({}),
  legendComponent: PropTypes.func
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
  hundredPercentData: false,
  dataSeriesKey: null,
  dataSeriesLabel: {},
  legendComponent: null
};

export default HorizontalBarChart;
