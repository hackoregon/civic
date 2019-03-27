import React from 'react';
import { css } from 'emotion';

import BaseMap from '../BaseMap/BaseMap';
import CivicSandboxMap from '../CivicSandboxMap/CivicSandboxMap';
import CivicSandboxTooltip from '../CivicSandboxMap/CivicSandboxTooltip';
import SandboxDrawer from './SandboxDrawer';

const baseMapWrapper = css(`
  height: 80vh;
  min-height: 650px;
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
  updateSlideCheckbox,
  fetchSlideDataByDate,
  drawerVisible,
  toggleDrawer,
  mapboxStyle,
  styles,
  onFoundationClick,
  onSlideHover,
  tooltipInfo,
  allSlides
}) => {
  return (
    <div className={styles}>
      <div
        className={css(`
          display:flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;

          .Select-menu-outer {
            z-index: 100;
          }
          `)}
      >
        <SandboxDrawer
          data={data}
          selectedSlide={selectedSlide}
          onChangeCheckbox={updateSlideCheckbox}
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
  data: React.PropTypes.object.isRequired,
  layerData: React.PropTypes.array.isRequired,
  defaultFoundation: React.PropTypes.object.isRequired,
  defaultSlides: React.PropTypes.array.isRequired,
  selectedPackage: React.PropTypes.string.isRequired,
  selectedFoundation: React.PropTypes.string.isRequired,
  selectedSlide: React.PropTypes.array.isRequired,
  foundationData: React.PropTypes.object.isRequired,
  slideData: React.PropTypes.array.isRequired,
  updatePackage: React.PropTypes.func.isRequired,
  updateFoundation: React.PropTypes.func.isRequired,
  updateSlideCheckbox: React.PropTypes.func.isRequired,
  fetchSlideDataByDate: React.PropTypes.func.isRequired,
  drawerVisible: React.PropTypes.bool.isRequired,
  toggleDrawer: React.PropTypes.func.isRequired,
  mapboxStyle: React.PropTypes.string,
  styles: React.PropTypes.string,
  onFoundationClick: React.PropTypes.func,
  onSlideHover: React.PropTypes.func,
  tooltipInfo: React.PropTypes.array,
  allSlides: React.PropTypes.array.isRequired,
};

export default Sandbox;
