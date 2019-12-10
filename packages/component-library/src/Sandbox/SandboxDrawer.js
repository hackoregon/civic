/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { string, bool, func, arrayOf, shape } from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import TimelineIcon from "@material-ui/icons/Timeline";
import LayersIcon from "@material-ui/icons/Layers";
import BookIcon from "@material-ui/icons/Book";
import SandboxDrawerLayerSelector from "./SandboxDrawerLayerSelector";
import SandboxDrawerVisualization from "./SandboxDrawerVisualization";
import SandboxDrawerExplore from "./SandboxDrawerExplore";
import Logo from "../Logo/Logo";

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
    toggleContributeDialog,
    toggleDrawer,
    toggleVisualization,
    toggleLayerSelector,
    toggleExplore,
    drawerVisible,
    drawerVisualization,
    drawerLayerSelector,
    drawerExplore,
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
    color: #F3F2F3;
    height: 40px;
    opacity: 0.6;
    display: flex;
  `);

  const buttonIcon = css(`
    margin: auto;
  `);

  const on = css(`
    opacity: 1;
  `);

  const active = css(`
    opacity: 1;
    @media (min-width: 500px) {
      border-left: 4px solid #201024;
    }
    @media (max-width: 500px) {
      border-bottom: 4px solid #201024;
      box-sizing: border-box;
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
              grid-template-columns: repeat(4, auto);
            }
          `)}
        >
          <div
            onClick={toggleDrawer}
            onKeyPress={toggleDrawer}
            role="button"
            tabIndex={0}
            css={[buttonStyle, on]}
          >
            <MenuIcon css={buttonIcon} />
          </div>
          <div
            onClick={toggleVisualization}
            onKeyPress={toggleVisualization}
            role="button"
            tabIndex={0}
            css={[buttonStyle, drawerVisible && drawerVisualization && active]}
          >
            <TimelineIcon css={buttonIcon} />
          </div>
          <div
            onClick={toggleLayerSelector}
            onKeyPress={toggleLayerSelector}
            role="button"
            tabIndex={0}
            css={[buttonStyle, drawerVisible && drawerLayerSelector && active]}
          >
            <LayersIcon css={buttonIcon} />
          </div>
          <div
            onClick={toggleExplore}
            onKeyPress={toggleExplore}
            role="button"
            tabIndex={0}
            css={[buttonStyle, drawerVisible && drawerExplore && active]}
          >
            <BookIcon css={buttonIcon} />
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
              display: flex;
              background-color: #201024;
              color: white;
              height: 50px;
              text-align: center;
              cursor: pointer;
              position: sticky;
              top: 0;
              z-index: 999;
          `)}
          >
            <div css={css(`margin: auto; padding-top: 5px;`)}>
              <Logo type="sandboxLogoInverted" />
            </div>
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
          {drawerExplore && (
            <SandboxDrawerExplore
              data={data}
              selectedPackage={selectedPackage}
              updatePackage={updatePackage}
              errors={errors}
              toggleLayerSelector={toggleLayerSelector}
              toggleContributeDialog={toggleContributeDialog}
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
  toggleContributeDialog: func,
  toggleVisualization: func,
  toggleLayerSelector: func,
  toggleExplore: func,
  drawerVisible: bool,
  drawerVisualization: bool,
  drawerLayerSelector: bool,
  drawerExplore: bool,
  foundationData: arrayOf(shape({})),
  allSlides: arrayOf(shape({})),
  updatePackage: func,
  foundationMapProps: arrayOf(shape({})),
  areSlidesLoading: bool,
  errors: bool,
  updateSlideKey: func,
  selectedFoundationDatum: shape({})
};
