import React from 'react';
import { css } from 'emotion';

import Dropdown from '../Dropdown/Dropdown';
import BaseMap from '../BaseMap/BaseMap';
import CivicSandboxMap from '../CivicSandboxMap/CivicSandboxMap';
import CivicSandboxTooltip from '../CivicSandboxMap/CivicSandboxTooltip';
import SandboxDrawer from './SandboxDrawer';


const drops = css(`
  flex-grow: 1;
  width: 40%;
`);

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
  onFoundationClick,
  onSlideHover,
  tooltipInfo,
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

          .Select-menu-outer {
            z-index: 100;
          }
          `)}
      >
        <div className={drops}>
          <span
            className={css(`
            color: #555;
            text-transform: uppercase;
            margin: 0 10px;
          `)}
          >Data Collection</span>
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
        <div className={drops}>
          <span
            className={css(`
            color: #555;
            text-transform: uppercase;
            margin: 0 10px;
          `)}
          >Base Map</span>
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
          initialLatitude={45.5431}
          initialLongitude={-122.7465}
          height={575}
        >
          <CivicSandboxMap
            mapLayers={layerData}
            onClick={onFoundationClick}
            onHoverSlide={onSlideHover}
          >
            { tooltipInfo && (
              <CivicSandboxTooltip tooltipData={tooltipInfo}/>
              )
            }
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
  onFoundationClick: React.PropTypes.func,
  defaultFoundation: React.PropTypes.object,
  foundationData: React.PropTypes.object,
};

export default Sandbox;
