/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
import { string, bool, func, arrayOf, shape } from "prop-types";
import { Fragment } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Logo from "../Logo/Logo";
import Checkbox from "../Checkbox/Checkbox";

const SandboxDrawerLayerSelector = props => {
  const {
    data,
    onChange,
    selectedPackage,
    foundationData,
    allSlides,
    updatePackage,
    areSlidesLoading,
    errors,
    updateSlideKey
  } = props;

  const loadingContainer = css`
    display: flex;
    height: 250px;
    width: 100%;
    margin: auto;
  `;
  const loading = css`
    font-size: 2rem;
    margin: auto;
    text-align: center;
    font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
  `;

  const loader = (
    <div css={loadingContainer}>
      <div css={loading}>
        <Logo type="squareLogoAnimated" alt="Loading..." />
      </div>
    </div>
  );

  return (
    <Fragment>
      <div
        css={css(`
            position: relative;
            z-index: 900;
          `)}
      >
        <div css={css(`margin: 0 10px;`)}>
          <h2>
            <span role="img" aria-label="Map Layers">
              🥞
            </span>{" "}
            Map Layers
          </h2>
          <h3
            css={css(`
              color: #555;
              text-transform: uppercase;
            `)}
          >
            Collection
          </h3>
        </div>
        <Dropdown
          value={selectedPackage}
          options={data.packages.map(p => ({
            value: p.displayName,
            label: p.displayName
          }))}
          onChange={name => {
            updatePackage({ displayName: name });
          }}
          simpleValue
        />
      </div>
      <div
        css={css(`
            position: relative;
            z-index: 200;
          `)}
      >
        <h3
          css={css(`
              color: #555;
              text-transform: uppercase;
              margin: 0 10px;
            `)}
        >
          Layers
        </h3>
      </div>

      {!areSlidesLoading && allSlides
        ? allSlides.map((slide, index) => {
            const dataIndex = foundationData.findIndex(d => {
              const scatterplot =
                d.mapType === "ScatterPlotMap" &&
                d.layerInfo.displayName === slide.label;
              const choropleth =
                d.mapType === "ChoroplethMap" &&
                d.layerInfo.displayName === slide.label;
              return choropleth || scatterplot;
            });

            const matchFound =
              dataIndex > -1 && foundationData[dataIndex].data.length > 0;

            const keyAllOptions = matchFound
              ? Object.keys(
                  foundationData[dataIndex].data[0].properties
                ).filter(c => {
                  const fieldName = foundationData[dataIndex].fieldName.color;
                  const a = c.match(/^[a-zA-Z]+/);
                  const b = fieldName.match(/^[a-zA-Z]+/);
                  return a[0] === b[0];
                })
              : [];

            const keyOptions =
              keyAllOptions.length > 3
                ? keyAllOptions.slice(0, 4)
                : keyAllOptions;

            const censusYears = ["1990", "2000", "2010", "2017"];
            const censusChangeYears = ["1990-2017", "2000-2017", "2010-2017"];
            const notYear =
              keyAllOptions[0] && keyAllOptions[0].search(/[0-9]/) > -1;
            const keySelector = matchFound && notYear && (
              <Dropdown
                value={foundationData[dataIndex].fieldName.color}
                options={
                  keyOptions.length === 3
                    ? keyOptions.map((k, i) => ({
                        value: k,
                        label: censusChangeYears[i]
                      }))
                    : keyOptions.map((k, i) => ({
                        value: k,
                        label: censusYears[i]
                      }))
                }
                onChange={name => {
                  updateSlideKey({ [slide.label]: name });
                }}
                simpleValue
              />
            );

            return (
              <div key={shortid.generate()}>
                <div
                  css={css(`
                    padding: 0.5rem 0 0 1rem;
                  `)}
                >
                  <Checkbox
                    name={slide.label}
                    value={slide.checked}
                    onChange={onChange}
                    label={slide.label}
                  />
                </div>
                <div
                  css={css(`
                    padding: .5rem 0 .5rem 0;
                    font-size: .75rem;
                    color: #333;
                    position: relative;
                    z-index: ${10 - index};
                  `)}
                >
                  {keySelector}
                </div>
              </div>
            );
          })
        : loader}
      {errors ? (
        <div
          css={css(`
                margin: auto;
                width: 80%;
              `)}
        >
          <p>There was an error fetching the data.</p>
        </div>
      ) : null}
    </Fragment>
  );
};

export default SandboxDrawerLayerSelector;

SandboxDrawerLayerSelector.propTypes = {
  data: shape({}),
  onChange: func,
  selectedPackage: string,
  foundationData: arrayOf(shape({})),
  allSlides: arrayOf(shape({})),
  updatePackage: func,
  areSlidesLoading: bool,
  errors: bool,
  updateSlideKey: func
};
