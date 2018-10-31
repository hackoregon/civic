import React from 'react';
import PropTypes from 'prop-types';
import CivicSandboxCardDesktop from './CivicSandboxCardDesktop';
import CivicSandboxCardMobile from './CivicSandboxCardMobile';

// TODO: implement check for desktop browsers
// const desktop = true;

const CivicSandboxCard = ({ children, mapLayers, dashboardData, title, desktop }) =>
  desktop ? (
    <CivicSandboxCardDesktop
      mapLayers={mapLayers}
      dashboardData={dashboardData}
      title={title}
    >
      {children}
    </CivicSandboxCardDesktop>
  ) : (
    <CivicSandboxCardMobile
      mapLayers={mapLayers}
      dashboardData={dashboardData}
      title={title}
    >
      {children}
    </CivicSandboxCardMobile>
  );

CivicSandboxCard.propTypes = {
  children: PropTypes.node,
  mapLayers: PropTypes.node,
  dashboardData: PropTypes.node,
  title: PropTypes.string,
  desktop: PropTypes.bool,
};

export default CivicSandboxCard;
