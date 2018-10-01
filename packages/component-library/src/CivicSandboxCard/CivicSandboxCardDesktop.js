import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import BaseMap from '../BaseMap/BaseMap';
import CivicSandboxMap from '../CivicSandboxMap/CivicSandboxMap';
import CivicSandboxDashboard from '../CivicSandboxDashboard/CivicSandboxDashboard';

const mapContainer = css``;

const dashboardContainer = css`
  position: absolute;
  top: 2%;
  left: 2%;
  width: 100%;
  height: 0;
  @media (max-width: 640px) {
    position: relative;
    left: 0;
    height: 100%;
  }
`;

const CivicSandboxCardDesktop = ({ children, mapLayers, dashboardData, title }) => (
  <div>
    <div className={mapContainer}>
      <BaseMap
        initialZoom={10.5}
        initialLatitude={45.5445}
        initialLongitude={-122.725}
        height={650}
        navigationOptions={{ position: 'right' }}
      >
        <CivicSandboxMap mapLayers={mapLayers} />
      </BaseMap>
    </div>
    <div className={dashboardContainer}>
      <CivicSandboxDashboard data={dashboardData}>
        {title ? <h2>{title}</h2> : null}
        {children}
      </CivicSandboxDashboard>
    </div>
  </div>
);

CivicSandboxCardDesktop.propTypes = {
  children: PropTypes.node,
  mapLayers: PropTypes.node,
  dashboardData: PropTypes.node,
  title: PropTypes.string,
};

export default CivicSandboxCardDesktop;
