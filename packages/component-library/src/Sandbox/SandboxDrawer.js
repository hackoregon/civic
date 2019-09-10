/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
import { string, bool, func, arrayOf, shape } from "prop-types";
import Dropdown from "../Dropdown/Dropdown";
import SandboxMapLegend from "./SandboxMapLegend";
import Logo from "../Logo/Logo";
import Checkbox from "../Checkbox/Checkbox";
import SandboxBaseMapSelector from "./SandboxBaseMapSelector";

// import SandboxDateSelector from "./SandboxDateSelector";
// import SandboxToggleSwitch from "./SandboxToggleSwitch";

const menuOpen = css(`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  height: 75vh;
  width: 33%;
  z-index: 5;
  transition: 0.5s;
  @media (max-width: 850px) {
    width: 95%;
    height: 64vh;
    min-height: 550px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 64vh;
    min-height: 550px;
  }
`);

const menuClosed = css(`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  height: 75vh;
  width: 40px;
  z-index: 5;
  transition: 0.5s;

`);

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

const SandboxDrawer = props => {
  const {
    data,
    onChange,
    selectedPackage,
    toggleDrawer,
    drawerVisible,
    foundationData,
    allSlides,
    updatePackage,
    foundationMapProps,
    areSlidesLoading,
    errors,
    updateSlideKey,
    baseMapStyle,
    onBaseMapStyleChange
  } = props;

  const loader = (
    <div css={loadingContainer}>
      <div css={loading}>
        <Logo type="squareLogoAnimated" alt="Loading..." />
      </div>
    </div>
  );
  return (
    <div css={drawerVisible ? menuOpen : menuClosed}>
      <div>
        <div
          css={css(`
          text-transform: uppercase;
          font-size: 1rem;
          cursor: pointer;
          background: #EE495C;
          color: #F3F2F3;
          min-width: 40px;
          text-align: center;
        `)}
        >
          <div
            onClick={toggleDrawer}
            onKeyPress={toggleDrawer}
            role="button"
            tabIndex={0}
            css={css(`
            font-size: 1.4rem;
            color: #F3F2F3;
            line-height: 1.5;
            height: 35px;
            padding-left: 5px;
            @media (max-width: 850px) {
              font-size: 1.3rem;
            }
          `)}
          >
            {drawerVisible ? ">" : "<"}
          </div>
        </div>
      </div>
      {drawerVisible && (
        <div
          css={css(`
          background: rgba(243,242,243,0.9);
          overflow-y: auto;
          border: 1px solid #ddd;
          border-left: 0;
          border-radius: 2px;
          box-shadow: -10px 5px 15px -3px rgba(0, 0, 0, 0.2);
          flex-grow: 2;
        `)}
        >
          <div
            css={css(`
            margin: 0 0 10px 0;
            padding: 0;
            background-color: #201024;
            color: white;
            height: 35px;
            text-align: center;
          `)}
          >
            <h2
              css={css(`
              margin: 0;
            `)}
            >
              CIVIC Sandbox
            </h2>
          </div>
          <div
            css={css(`
            position: relative;
            z-index: 900;
          `)}
          >
            <h3
              css={css(`
              color: #555;
              text-transform: uppercase;
              margin: 0 10px;
            `)}
            >
              Data Collections
            </h3>
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
          <h3
            css={css(`
            color: #555;
            text-transform: uppercase;
            margin: 0 10px;
          `)}
          >
            Base Map Style
          </h3>
          {onBaseMapStyleChange && baseMapStyle && (
            <SandboxBaseMapSelector
              onBaseMapStyleChange={onBaseMapStyleChange}
              baseMapStyle={baseMapStyle}
            />
          )}
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

                const mapLegend = matchFound && (
                  <SandboxMapLegend
                    data={foundationData[dataIndex].data}
                    mapProps={foundationMapProps[dataIndex]}
                  />
                );

                const keyAllOptions = matchFound
                  ? Object.keys(
                      foundationData[dataIndex].data[0].properties
                    ).filter(c => {
                      const fieldName =
                        foundationData[dataIndex].fieldName.color;
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
                const censusChangeYears = [
                  "1990-2017",
                  "2000-2017",
                  "2010-2017"
                ];
                const keySelector = matchFound && (
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
                    {mapLegend}
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
        </div>
      )}
    </div>
  );
};

export default SandboxDrawer;

SandboxDrawer.propTypes = {
  data: shape({}),
  onChange: func,
  selectedPackage: string,
  toggleDrawer: func,
  drawerVisible: bool,
  foundationData: arrayOf(shape({})),
  allSlides: arrayOf(shape({})),
  updatePackage: func,
  foundationMapProps: arrayOf(shape({})),
  areSlidesLoading: bool,
  errors: bool,
  updateSlideKey: func,
  baseMapStyle: string,
  onBaseMapStyleChange: func
};
