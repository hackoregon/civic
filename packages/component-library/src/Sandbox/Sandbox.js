import React from 'react';
import { css } from 'emotion';

import Dropdown from '../Dropdown/Dropdown';
import BaseMap from '../BaseMap/BaseMap';
import CivicSandboxMap from '../CivicSandboxMap/CivicSandboxMap';
import CivicSandboxTooltip from '../CivicSandboxMap/CivicSandboxTooltip';
import SandboxDrawer from './SandboxDrawer';

const Sandbox = ({
  data,
  defaultSlides,
  drawerVisible,
  fetchSlideDataByDate,
  layerData,
  mapboxStyle,
  mapboxToken,
  selectedFoundation,
  foundationData,
  selectedPackage,
  selectedSlide,
  slideData,
  styles,
  toggleDrawer,
  updateFoundation,
  updatePackage,
  updateSlide,
  defaultFoundation,
}) => {
  return (
    <div
      className={styles}
    >
      <div
        className={css(`
          display:flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          `)}
      >
        <div style={{ flexGrow: 1 }}>
          <Dropdown
            value={selectedPackage}
            options={Object.keys(data.packages).map(p => ({
              value: p,
              label: p,
            }))}
            onChange={updatePackage}
            simpleValue
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Dropdown
            value={selectedFoundation}
            options={data.packages[selectedPackage].foundations.map(foundation => ({
              value: foundation,
              label: data.foundations[foundation].name,
            }))}
            onChange={updateFoundation}
            simpleValue
          />
        </div>
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
        />

      </div>
      <div>
        <BaseMap
          mapboxToken={mapboxToken}
          mapboxStyle={mapboxStyle}
          initialZoom={10.5}
        >
          <CivicSandboxMap
            mapLayers={layerData}
          >
            <CivicSandboxTooltip />
          </CivicSandboxMap>
        </BaseMap>
      </div>
    </div>
  );
};

Sandbox.propTypes = {
  data: React.PropTypes.object,
  defaultSlides: React.PropTypes.array,
  drawerVisible: React.PropTypes.bool,
  fetchSlideDataByDate: React.PropTypes.func,
  layerData: React.PropTypes.array,
  mapboxStyle: React.PropTypes.string,
  mapboxToken: React.PropTypes.string,
  selectedFoundation: React.PropTypes.string,
  selectedPackage: React.PropTypes.string,
  selectedSlide: React.PropTypes.array,
  slideData: React.PropTypes.array,
  styles: React.PropTypes.string,
  toggleDrawer: React.PropTypes.func,
  updateFoundation: React.PropTypes.func,
  updatePackage: React.PropTypes.func,
  updateSlide: React.PropTypes.func,
  defaultFoundation: React.PropTypes.object,
  foundationData: React.PropTypes.object,
};

export default Sandbox;
