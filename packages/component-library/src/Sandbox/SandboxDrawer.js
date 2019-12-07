/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { string, bool, func, arrayOf, shape } from "prop-types";
import SandboxDrawerLayerSelector from "./SandboxDrawerLayerSelector";
import SandboxDrawerVisualization from "./SandboxDrawerVisualization";

const menuOpen = css(`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  height: 78vh;
  min-height: 640px;
  width: 33%;
  z-index: 5;
  transition: 0.5s;
  @media (max-width: 850px) {
    width: 95%;
    height: 78vh;
    min-height: 590px;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 390px;
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
  @media (max-width: 500px) {
    flex-direction: column;
    width: 100%;
    height: 40px;
  }
`);

const SandboxDrawer = props => {
  const {
    data,
    onChange,
    selectedPackage,
    selectedPackageDescription,
    toggleDialog,
    toggleDrawer,
    toggleVisualization,
    toggleLayerSelector,
    drawerVisible,
    drawerVisualization,
    drawerLayerSelector,
    foundationData,
    allSlides,
    updatePackage,
    foundationMapProps,
    areSlidesLoading,
    errors,
    updateSlideKey,
    selectedFoundationDatum
  } = props;

  const buttonStyle = css(`
    font-size: 1.4rem;
    color: #F3F2F3;
    line-height: 1.5;
    height: 35px;
    padding-left: 5px;
    opacity: 0.6;
    @media (max-width: 850px) {
      font-size: 1.3rem;
    }
  `);

  const on = css(`
    opacity: 1;
  `);

  const active = css(`
    opacity: 1;
    box-shadow: inset 0px 0px 3px 2px rgba(255, 255, 255, 1);
  `);

  const rotate = css(`
    @media (max-width: 500px) {
      transform: rotate(-90deg);
    }
  `);

  return (
    <div css={drawerVisible ? menuOpen : menuClosed}>
      <div>
        <div
          css={css(`
            text-transform: uppercase;
            font-size: 1rem;
            cursor: pointer;
            background: #1E62BD;
            color: #F3F2F3;
            min-width: 40px;
            text-align: center;
            @media (max-width: 500px) {
              display: grid;
              grid-template-columns: repeat(3, auto);
            }
          `)}
        >
          <div
            onClick={toggleDrawer}
            onKeyPress={toggleDrawer}
            role="button"
            tabIndex={0}
            css={[buttonStyle, on, rotate]}
          >
            {drawerVisible ? ">" : "<"}
          </div>
          <div
            onClick={toggleVisualization}
            onKeyPress={toggleVisualization}
            role="button"
            tabIndex={0}
            css={[buttonStyle, drawerVisible && drawerVisualization && active]}
          >
            <span role="img" aria-label="Charts">
              📉
            </span>
          </div>
          <div
            onClick={toggleLayerSelector}
            onKeyPress={toggleLayerSelector}
            role="button"
            tabIndex={0}
            css={[buttonStyle, drawerVisible && drawerLayerSelector && active]}
          >
            <span role="img" aria-label="Map Layers">
              🥞
            </span>
          </div>
        </div>
      </div>
      {drawerVisible && (
        <div
          css={css(`
          background: rgba(255,255,255,0.9);
          overflow-y: auto;
            box-shadow: -10px 5px 15px -3px rgba(0, 0, 0, 0.2);
            flex-grow: 2;
        `)}
        >
          <div
            onClick={toggleDialog}
            onKeyPress={toggleDialog}
            role="button"
            tabIndex={0}
            css={css(`
              margin: 0 0 10px 0;
              padding: 0;
              background-color: #201024;
              color: white;
              height: 35px;
              text-align: center;
              cursor: pointer;
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
          {drawerVisualization && (
            <SandboxDrawerVisualization
              selectedPackage={selectedPackage}
              selectedPackageDescription={selectedPackageDescription}
              selectedFoundationDatum={selectedFoundationDatum}
            />
          )}
          {drawerLayerSelector && (
            <SandboxDrawerLayerSelector
              data={data}
              onChange={onChange}
              selectedPackage={selectedPackage}
              foundationData={foundationData}
              allSlides={allSlides}
              updatePackage={updatePackage}
              foundationMapProps={foundationMapProps}
              areSlidesLoading={areSlidesLoading}
              errors={errors}
              updateSlideKey={updateSlideKey}
            />
          )}
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
  selectedPackageDescription: string,
  toggleDialog: func,
  toggleDrawer: func,
  toggleVisualization: func,
  toggleLayerSelector: func,
  drawerVisible: bool,
  drawerVisualization: bool,
  drawerLayerSelector: bool,
  foundationData: arrayOf(shape({})),
  allSlides: arrayOf(shape({})),
  updatePackage: func,
  foundationMapProps: arrayOf(shape({})),
  areSlidesLoading: bool,
  errors: bool,
  updateSlideKey: func,
  selectedFoundationDatum: shape({})
};
