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
  link,
}) => (
  <section className={spacing}>
    <CivicSandboxCardDesktop
      mapLayers={mapLayers}
      dashboardData={dashboardData}
      title={title}
      style={desktop}
      link={link}
    >
      {children}
    </CivicSandboxCardDesktop>
    <CivicSandboxCardMobile title={title} style={mobile} link={link} />
  </section>
);

CivicSandboxCard.propTypes = {
  children: PropTypes.node,
  mapLayers: PropTypes.node,
  dashboardData: PropTypes.node,
  title: PropTypes.string,
  link: PropTypes.string,
};


CivicSandboxCard.defaultProps = {
  link: '/sandbox',
};

export default CivicSandboxCard;
