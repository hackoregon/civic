import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import BaseMap from '../BaseMap/BaseMap';
import CivicSandboxMap from '../CivicSandboxMap/CivicSandboxMap';
import CivicSandboxDashboard from '../CivicSandboxDashboard/CivicSandboxDashboard';

const titleClass = css`
  margin: 0;
  text-align: left;
  font-size: 2.5em;
  line-height:1.2;
  margin-bottom:1em;

  @media (max-width: 640px) {
    font-size: 2em;
  }
`;

class CivicSandboxCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      mapLayers,
      dashboardData,
      title,
    } = this.props;

    return (
      <div>
        <div style={{ margin: '0 4%'}}>
          <BaseMap
            initialZoom={10.5}
            initialLatitude={45.5445}
            initialLongitude={-122.7250}
            height={650}
            navigationOptions={{ position: 'right'}}
          >
            <CivicSandboxMap mapLayers={mapLayers} />
          </BaseMap>
        </div>
        <div
          className={css(`
            position: absolute;
            top: 2%;
            left: 7.5%;
            width: 92.5%;
            height: 0;
            @media(max-width: 900px) {
              position: relative;
              left: 0;
              height: 100%;
            };
          `)}
        >
          <CivicSandboxDashboard data={dashboardData}>
            { title ? <h2>{title}</h2> : null}
            { children }
          </CivicSandboxDashboard>
        </div>
      </div>
    );
  }
}

CivicSandboxCard.propTypes = {
  children: PropTypes.node,
  mapLayers: PropTypes.node,
  dashboardData: PropTypes.node,
  title: PropTypes.string,
};

export default CivicSandboxCard;
