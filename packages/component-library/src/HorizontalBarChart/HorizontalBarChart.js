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
import civicFormat from "../utils/civicFormat";
import { chartEvents } from "../utils/chartHelpers";
import CivicVictoryTheme from "../VictoryTheme/VictoryThemeIndex";
import DataChecker from "../utils/DataChecker";

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
  minimalist
}) => {
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
  const bars = data.length;
  const spaces = bars - 1;
  const barHeight = CivicVictoryTheme.civic.bar.style.data.width;
  const spaceHeight = CivicVictoryTheme.civic.bar.style.data.padding * 2;
  const dataHeight = bars * barHeight + spaces * spaceHeight;
  const additionalHeight = padding.bottom + padding.top;

  const minValue = Math.min(0, ...data.map(d => d[dataValue]));

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
        <VictoryChart
          height={dataHeight + additionalHeight}
          domain={domain}
          domainPadding={{ x: 11, y: 20 }}
          padding={padding}
          theme={CivicVictoryTheme.civic}
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
                style={{ ...CivicVictoryTheme.civic.axisLabel.style }}
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
              style={{ ...CivicVictoryTheme.civic.axisLabel.style }}
              text={xLabel}
              textAnchor={minimalist ? "middle" : "end"}
              title="X Axis Label"
              verticalAnchor={minimalist ? "middle" : "end"}
              x={minimalist ? 325 : 600}
              y={minimalist ? 20 : 85}
            />
          </VictoryPortal>
          <VictoryBar
            horizontal
            labelComponent={
              <NegativeAwareTickLabel
                x={0}
                orientation="left"
                theme={CivicVictoryTheme.civic}
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
          />
          <VictoryBar
            horizontal
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
            domainPadding={0}
            data={barData.map(d => ({
              sortOrder: d[sortOrderKey],
              dataValue: d[dataValue],
              label: `${dataLabelFormatter(d[dataLabel])}: ${dataValueFormatter(
                d[dataValue]
              )}`
            }))}
            style={{
              data: { fill: "none" }
            }}
            title="Horizontal Bar Chart"
            x="sortOrder"
            y="dataValue"
            events={chartEvents}
          />
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
  minimalist: PropTypes.bool
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
  minimalist: false
};

export default HorizontalBarChart;
