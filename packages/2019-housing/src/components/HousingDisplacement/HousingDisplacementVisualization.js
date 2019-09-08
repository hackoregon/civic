import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { css, jsx } from "@emotion/core";
/** @jsx jsx */
import { LineChart, Slider } from "@hackoregon/component-library";

const HousingDisplacementVisualization = ({ isLoading, data }) => {
  const [threshold, setThreshold] = useState(40);

  if (isLoading) return <div>Data Loading...</div>;

  const dataSeries = "series";
  const xKey = "x";
  const xLabel = "Year";
  const yKey = "y";
  const yLabel = "Population";

  return (
    <Fragment>
      <strong style={{ color: "crimson" }}>
        Visualization TODO:
        <ul>
          <li>Are these too small side by side?</li>
          <li>Add more context about what the slider is doing</li>
          <li>Add a real loading indicator</li>
        </ul>
      </strong>
      <div
        css={css`
          display: block;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1rem;
          `}
        >
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
              1990 Black Population Threshold
            </h5>
            <Slider.SliderWithTooltip
              min={20}
              max={60}
              defaultValue={threshold}
              step={20}
              tipFormatter={value => `${value}%`}
              onChange={value => setThreshold(value)}
              value={threshold}
            />
          </div>
        </div>
      </div>
      <br />
      <div
        css={css`
          display: flex;
          flex-direction: "row";
          @media screen and (max-width: 640px) {
            flex-direction: column;
          }
        `}
      >
        <div style={{ width: "50%" }}>
          <LineChart
            data={data.homeownershipByRace.value}
            dataKey={xKey}
            dataValue={yKey}
            dataSeries={dataSeries}
            title="All of Portland"
            xLabel={xLabel}
            yLabel={yLabel}
            xNumberFormatter={tick => tick.toString()}
            protect
          />
        </div>
        <div style={{ width: "50%" }}>
          <LineChart
            data={data[`homeownershipHistoricallyBlack${threshold}`].value}
            dataKey={xKey}
            dataValue={yKey}
            dataSeries={dataSeries}
            title="Historically Black Areas"
            xLabel={xLabel}
            yLabel={yLabel}
            xNumberFormatter={tick => tick.toString()}
            protect
          />
        </div>
      </div>
    </Fragment>
  );
};

HousingDisplacementVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    homeownershipByRace: resourceShape,
    homeownershipHistoricallyBlack20: resourceShape,
    homeownershipHistoricallyBlack40: resourceShape,
    homeownershipHistoricallyBlack60: resourceShape
  })
};

export default HousingDisplacementVisualization;
