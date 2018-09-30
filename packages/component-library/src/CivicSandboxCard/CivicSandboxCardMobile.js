import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import BaseMap from '../BaseMap/BaseMap';
import CivicSandboxMap from '../CivicSandboxMap/CivicSandboxMap';
import CivicSandboxDashboard from '../CivicSandboxDashboard/CivicSandboxDashboard';
import Placeholder from '../Placeholder/Placeholder';

const mapContainer = css``;

const dashboardContainer = css`
  position: absolute;
  top: 2%;
  left: 7.5%;
  width: 92.5%;
  height: 0;
  @media (max-width: 900px) {
    position: relative;
    left: 0;
    height: 100%;
  }
`;

const CivicSandboxCardMobile = ({ children, mapLayers, dashboardData, title }) => (
  <div>
    <div className={mapContainer}>
      <Placeholder />
    </div>
    <div className={dashboardContainer}>
      <CivicSandboxDashboard data={dashboardData}>
        {title ? <h2>{title}</h2> : null}
        {children}
      </CivicSandboxDashboard>
    </div>
  </div>
);

CivicSandboxCardMobile.propTypes = {
  children: PropTypes.node,
  mapLayers: PropTypes.node,
  dashboardData: PropTypes.node,
  title: PropTypes.string,
};

export default CivicSandboxCardMobile;
