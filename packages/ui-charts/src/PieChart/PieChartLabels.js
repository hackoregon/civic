import React from "react";
import PropTypes from "prop-types";
import { VictoryLabel, VictoryTooltip } from "victory";
import civicFormat from "../utils/civicFormat";

const PieChartLabel = props => {
  const { dataLabel, dataValue, totalValue, useLegend, tooltip, theme } = props;

  return (
    <g>
      {tooltip ? (
        <VictoryTooltip
          {...props}
          pointerLength={0}
          cornerRadius={0}
          theme={theme}
          labelComponent={
            <VictoryLabel
              text={datum =>
                `${datum[dataLabel]}: ${civicFormat.decimalToPercent(
                  datum[dataValue] / totalValue
                )}`
              }
            />
          }
        />
      ) : null}
      {!useLegend ? (
        <VictoryLabel {...props} style={{ ...theme.pieLabel.style }} />
      ) : null}
    </g>
  );
};

PieChartLabel.defaultEvents = VictoryTooltip.defaultEvents;

PieChartLabel.propTypes = {
  dataLabel: PropTypes.string,
  dataValue: PropTypes.string,
  totalValue: PropTypes.number,
  useLegend: PropTypes.bool,
  tooltip: PropTypes.bool,
  theme: PropTypes.shape({})
};

export default PieChartLabel;
