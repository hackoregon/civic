import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { scaleQuantize } from "d3";
import { css, jsx } from "@emotion/core";
/** @jsx jsx */
import {
  BaseMap,
  ChartContainer,
  civicFormat,
  LineChart,
  MapOverlay,
  MapTooltip,
  Slider
} from "@hackoregon/component-library";
import TempLoader from "../TempLoader/TempLoader";

const HousingDisplacementVisualization = ({ isLoading, data }) => {
  const [threshold, setThreshold] = useState(30);

  if (isLoading) return <TempLoader />;

  // Line Chart Props
  const dataSeries = "series";
  const xKey = "x";
  const xLabel = "Year";
  const yKey = "y";
  const yLabel = "Population";

  // Map Props
  const polygonFieldName = "blackshare";
  const housingData1990 = data.ncdbYearly1990.value.results.features;
  // Binary color scale for above or below the threshold
  const colorScale = scaleQuantize()
    .domain([threshold - 0.1, threshold])
    .range([[0, 0, 0, 0], [25, 183, 170]]);

  return (
    <Fragment>
      <div
        css={css`
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-direction: "row";
          @media screen and (max-width: 640px) {
            flex-direction: column;
          }
        `}
      >
        <div
          css={css`
            width: 50%;
            @media screen and (max-width: 640px) {
              width: 100%;
            }
          `}
        >
          <LineChart
            data={data.homeownershipByRace.value}
            dataKey={xKey}
            dataValue={yKey}
            dataSeries={dataSeries}
            title="Population Changes In All Of Portland"
            xLabel={xLabel}
            yLabel={yLabel}
            xNumberFormatter={tick => tick.toString()}
            protect
          />
        </div>
        <div
          css={css`
            display: block;
            margin-left: 35px;
          `}
        >
          <div
            css={css`
              display: flex;
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
                {`Census Tract Black Population Threshold`}
              </h5>
              <Slider.SliderWithTooltip
                min={10}
                max={60}
                defaultValue={threshold}
                step={10}
                tipFormatter={value => `${value}%`}
                onChange={value => setThreshold(value)}
                value={threshold}
              />
            </div>
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
        <LineChart
          data={data[`homeownershipHistoricallyBlack${threshold}`].value}
          dataKey={xKey}
          dataValue={yKey}
          dataSeries={dataSeries}
          title={`Population Changes In Areas >${threshold}% Black In 1990`}
          xLabel={xLabel}
          yLabel={yLabel}
          xNumberFormatter={tick => tick.toString()}
          protect
        />
        <div
          css={css`
            width: 50%;
            @media screen and (max-width: 640px) {
              width: 100%;
            }
          `}
        >
          <ChartContainer
            title={`Areas with >${threshold}% Black Residents In 1990`}
            subtitle="(Set threshold using the slider above)"
          >
            <BaseMap
              civicMapStyle="light"
              initialZoom={10}
              height={275}
              initialLongitude={-122.666237}
              initialLatitude={45.562383}
            >
              <MapOverlay
                data={housingData1990}
                getFillColor={f => colorScale(f.properties[polygonFieldName])}
                onLayerClick={() => {}}
                opacity={0.5}
              >
                <MapTooltip
                  primaryName="Year"
                  primaryField="year"
                  secondaryName="Black Polulation Share"
                  secondaryField={polygonFieldName}
                  formatSecondaryField={f =>
                    civicFormat.decimalToPercent(f / 100)
                  }
                />
              </MapOverlay>
            </BaseMap>
          </ChartContainer>
        </div>
      </div>
    </Fragment>
  );
};

HousingDisplacementVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    homeownershipByRace: resourceShape,
    homeownershipHistoricallyBlack10: resourceShape,
    homeownershipHistoricallyBlack20: resourceShape,
    homeownershipHistoricallyBlack30: resourceShape,
    homeownershipHistoricallyBlack40: resourceShape,
    homeownershipHistoricallyBlack50: resourceShape,
    homeownershipHistoricallyBlack60: resourceShape
  })
};

export default HousingDisplacementVisualization;
