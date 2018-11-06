import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import CivicSandboxCardDesktop from './CivicSandboxCardDesktop';
import CivicSandboxCardMobile from './CivicSandboxCardMobile';

const desktop = css`
  display: block;

  @media (max-width: 640px) {
    display: none;
  }
`;

const mobile = css`
  display: none;

  @media (max-width: 640px) {
    display: block;
  }
`;

const spacing = css`
  margin: 80px auto;
`;

const CivicSandboxCard = ({
  children,
  mapLayers,
  dashboardData,
  title,
}) => (
  <section className={spacing}>
    <CivicSandboxCardDesktop
      mapLayers={mapLayers}
      dashboardData={dashboardData}
      title={title}
      style={desktop}
    >
      {children}
    </CivicSandboxCardDesktop>
    <CivicSandboxCardMobile title={title} style={mobile} />
  </section>
);

CivicSandboxCard.propTypes = {
  children: PropTypes.node,
  mapLayers: PropTypes.node,
  dashboardData: PropTypes.node,
  title: PropTypes.string,
};

export default CivicSandboxCard;
