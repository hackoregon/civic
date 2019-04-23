import PropTypes from "prop-types";
import React from "react";
import { css } from "emotion";

import BaseMap from "../BaseMap/BaseMap";
import CivicSandboxMap from "../CivicSandboxMap/CivicSandboxMap";
import CivicSandboxTooltip from "../CivicSandboxMap/CivicSandboxTooltip";
import SandboxDrawer from "./SandboxDrawer";

const baseMapWrapper = css(`
  height: 80vh;
  min-height: 700px;
  @media (max-width: 850px) {
    height: 65vh;
    min-height: 600px;
  }
`);

const Sandbox = ({
  data,
  layerData,
  defaultFoundation,
  defaultSlides,
  selectedPackage,
  selectedFoundation,
  selectedSlide,
  foundationData,
  slideData,
  updatePackage,
  updateFoundation,
  updateSlide,
  fetchSlideDataByDate,
  drawerVisible,
  toggleDrawer,
  mapboxStyle,
  styles,
  onFoundationClick,
  onSlideHover,
  tooltipInfo,
  allSlides,
  foundationMapProps
}) => {
  return (
    <div className={styles}>
      <div
        className={css(`
          position: absolute;
          top: 0;
          right: 0;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 80vh;
          min-height: 600px;
          @media (max-width: 850px) {
            height: 65vh;
            min-height: 500px;
          }
      `)}
      >
        <SandboxDrawer
          data={data}
          selectedSlide={selectedSlide}
          onChange={updateSlide}
          selectedPackage={selectedPackage}
          toggleDrawer={toggleDrawer}
          drawerVisible={drawerVisible}
          defaultSlides={defaultSlides}
          slideData={slideData}
          fetchSlideByDate={fetchSlideDataByDate}
          selectedFoundation={selectedFoundation}
          foundationData={foundationData}
          defaultFoundation={defaultFoundation}
          allSlides={allSlides}
          updatePackage={updatePackage}
          updateFoundation={updateFoundation}
          foundationMapProps={foundationMapProps}
        />
      </div>
      <div className={baseMapWrapper}>
        <BaseMap
          mapboxStyle={"mapbox://styles/mapbox/dark-v9"}
          initialZoom={10.5}
          initialLatitude={45.5431}
          initialLongitude={-122.5765}
          useContainerHeight
        >
          <CivicSandboxMap
            mapLayers={layerData}
            onClick={onFoundationClick}
            onHoverSlide={onSlideHover}
          >
            {tooltipInfo && <CivicSandboxTooltip tooltipData={tooltipInfo} />}
          </CivicSandboxMap>
        </BaseMap>
      </div>
    </div>
  );
};

Sandbox.propTypes = {
  data: PropTypes.object.isRequired,
  layerData: PropTypes.array.isRequired,
  defaultFoundation: PropTypes.object.isRequired,
  defaultSlides: PropTypes.array.isRequired,
  selectedPackage: PropTypes.string.isRequired,
  selectedFoundation: PropTypes.string.isRequired,
  selectedSlide: PropTypes.array.isRequired,
  foundationData: PropTypes.object.isRequired,
  slideData: PropTypes.array.isRequired,
  updatePackage: PropTypes.func.isRequired,
  updateFoundation: PropTypes.func.isRequired,
  updateSlide: PropTypes.func.isRequired,
  fetchSlideDataByDate: PropTypes.func.isRequired,
  drawerVisible: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  mapboxStyle: PropTypes.string,
  styles: PropTypes.string,
  onFoundationClick: PropTypes.func,
  onSlideHover: PropTypes.func,
  tooltipInfo: PropTypes.object,
  allSlides: PropTypes.array.isRequired,
  foundationMapProps: PropTypes.object.isRequired
};

export default Sandbox;
