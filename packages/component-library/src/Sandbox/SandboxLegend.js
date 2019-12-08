/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
import { bool, arrayOf, shape } from "prop-types";
import SandboxMapLegend from "./SandboxMapLegend";

const SandboxLegend = props => {
  const {
    foundationData,
    allSlides,
    foundationMapProps,
    areSlidesLoading,
    errors
  } = props;

  const loader = <div />;

  return (
    <div>
      {!areSlidesLoading && allSlides
        ? allSlides.map(slide => {
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
              <div>
                <h3
                  css={css`
                    text-align: center;
                  `}
                >
                  {slide.label}
                </h3>
                <SandboxMapLegend
                  data={foundationData[dataIndex].data}
                  mapProps={foundationMapProps[dataIndex]}
                />
              </div>
            );

            return (
              <div
                key={shortid.generate()}
                css={css(`
                  position: absolute;
                  bottom: ${30 + dataIndex * 150}px;
                  width: 500px;
                  left: 0px;
                  background-color: rgba(255,255,255,0.9);
                  @media (max-width: 500px) {
                    width: 100%
                  }
                `)}
              >
                {mapLegend}
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
  );
};

export default SandboxLegend;

SandboxLegend.propTypes = {
  foundationData: arrayOf(shape({})),
  allSlides: arrayOf(shape({})),
  foundationMapProps: arrayOf(shape({})),
  areSlidesLoading: bool,
  errors: bool
};
