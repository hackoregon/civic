import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, BaseMap, ScatterPlotMap } from '@hackoregon/component-library';

import {
  fetchPortlandFarmersMarkets,
  setFarmersMarket,
} from '../../state/portland-farmers-markets/actions';
import {
  isPortlandFarmersMarketsPending,
  getPortlandFarmersMarketsData,
  getActiveFarmersMarket,
} from '../../state/portland-farmers-markets/selectors';

const cardLoading = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #EEE;
`;

const cardError = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #FDD;
  border: 1px solid #C99;
`;

// Use Hack Oregon official mapbox token eventually
const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

export class PortlandFarmersMarkets extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      portlandFarmersMarkets,
      selectFarmersMarket,
      activeMarket,
    } = this.props;

    if (isLoading) {
      return <div className={cardLoading}>Loading...</div>;
    } else if (!portlandFarmersMarkets) {
      return <div className={cardError}>Could not render Farmers Markets Over Time</div>;
    }

    return (
      <CivicStoryCard title="Where are Portland's Farmers' Markets?">
        <BaseMap mapboxToken={mapboxToken} mapboxStyle="mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva">
          <ScatterPlotMap
            data={portlandFarmersMarkets.features}
            autoHighlight={false}
            getColor={() => [109, 222, 69]}
            getRadius={() => 350}
            onLayerClick={event => selectFarmersMarket(event.object)}
          />
        </BaseMap>
        {activeMarket && (
          <div>
            <h3>{activeMarket.Market} ({activeMarket.status})</h3>
            <dl>
              <dt>When to visit</dt>
              <dd>{activeMarket.Day}, {activeMarket.Open_Times}</dd>
              <dt>Address</dt>
              <dd>{activeMarket.Location}</dd>
              <dt>Time of the year</dt>
              <dd>{activeMarket.Open_Dates}</dd>
              <dt>Payment options</dt>
              <dd>{activeMarket.Accepts}</dd>
              <dt>Website</dt>
              <dd><a href={activeMarket.Website}>{activeMarket.Website}</a></dd>
            </dl>
          </div>
        )}
      </CivicStoryCard>
    );
  }
}

PortlandFarmersMarkets.displayName = 'PortlandFarmersMarkets';
PortlandFarmersMarkets.propTypes = {
  init: PropTypes.func,
  selectFarmersMarket: PropTypes.func,
  isLoading: PropTypes.bool,
  portlandFarmersMarkets: PropTypes.object,
  activeMarket: PropTypes.object,
};

export default connect(
  state => ({
    isLoading: isPortlandFarmersMarketsPending(state),
    portlandFarmersMarkets: getPortlandFarmersMarketsData(state),
    activeMarket: getActiveFarmersMarket(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchPortlandFarmersMarkets());
    },
    selectFarmersMarket(market) {
      dispatch(setFarmersMarket(market));
    },
  })
)(PortlandFarmersMarkets);
