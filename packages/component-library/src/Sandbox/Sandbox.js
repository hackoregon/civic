import PropTypes from 'prop-types';
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
        <div className={drops}>
          <span
            className={css(`
            color: #555;
            text-transform: uppercase;
            margin: 0 10px;
          `)}
          >
            Data Collection
          </span>
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
          >
            Base Map
          </span>
          <Dropdown
            value={selectedFoundation}
            options={data.packages[selectedPackage].foundations.map(
              foundation => ({
                value: foundation,
                label: data.foundations[foundation].name,
              })
            )}
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
            {tooltipInfo && <CivicSandboxTooltip tooltipData={tooltipInfo} />}
          </CivicSandboxMap>
        </BaseMap>
      </div>
    </div>
  );
};

Sandbox.propTypes = {
  data: PropTypes.object.isRequired,
  defaultSlides: PropTypes.array.isRequired,
  drawerVisible: PropTypes.bool,
  fetchSlideDataByDate: PropTypes.func,
  layerData: PropTypes.array.isRequired,
  mapboxStyle: PropTypes.string,
  selectedFoundation: PropTypes.string,
  selectedPackage: PropTypes.string,
  selectedSlide: PropTypes.array,
  slideData: PropTypes.array.isRequired,
  styles: PropTypes.string,
  toggleDrawer: PropTypes.func.isRequired,
  updateFoundation: PropTypes.func.isRequired,
  updatePackage: PropTypes.func.isRequired,
  updateSlide: PropTypes.func.isRequired,
  onFoundationClick: PropTypes.func,
  defaultFoundation: PropTypes.object.isRequired,
  foundationData: PropTypes.object.isRequired,
};

export default Sandbox;
