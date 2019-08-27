import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import {
  CivicStoryCard,
  BaseMap,
  ScatterPlotMap
} from "@hackoregon/component-library";

import {
  fetchPortlandFarmersMarkets,
  setFarmersMarket
} from "../../state/portland-farmers-markets/actions";
import {
  isPortlandFarmersMarketsPending,
  getPortlandFarmersMarketsData,
  getActiveFarmersMarket
} from "../../state/portland-farmers-markets/selectors";

const cardLoading = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #eee;
`;

const cardError = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #fdd;
  border: 1px solid #c99;
`;

class PortlandFarmersMarkets extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const {
      isLoading,
      portlandFarmersMarkets,
      selectFarmersMarket,
      activeMarket
    } = this.props;

    if (isLoading) {
      return <div css={cardLoading}>Loading...</div>;
    }

    if (!portlandFarmersMarkets) {
      return (
        <div css={cardError}>Could not render Farmers Markets Over Time</div>
      );
    }

    return (
      <CivicStoryCard
        title="Where are Portland's Farmers' Markets?"
        slug="portland-farmers-markets"
      >
        <BaseMap>
          <ScatterPlotMap
            data={portlandFarmersMarkets.features}
            autoHighlight={false}
            getColor={() => [109, 222, 69]}
            getRadius={() => 550}
            onLayerClick={event => selectFarmersMarket(event.object)}
          />
        </BaseMap>
        {activeMarket && (
          <div>
            <h3>
              {activeMarket.Market} ({activeMarket.status})
            </h3>
            <dl>
              <dt>When to visit</dt>
              <dd>
                {activeMarket.Day}, {activeMarket.Open_Times}
              </dd>
              <dt>Address</dt>
              <dd>{activeMarket.Location}</dd>
              <dt>Time of the year</dt>
              <dd>{activeMarket.Open_Dates}</dd>
              <dt>Payment options</dt>
              <dd>{activeMarket.Accepts}</dd>
              <dt>Website</dt>
              <dd>
                <a href={activeMarket.Website}>{activeMarket.Website}</a>
              </dd>
            </dl>
          </div>
        )}
        <h3>Neighborhood Friendly</h3>
        <p>
          Portland has many farmers&apos; markets and they are well-distributed
          throughout the inner-city, extending through the westside as well as
          St. Johns.
        </p>
        <p>
          East of I-205 is a notable Farmers&apos; Market desert. What could be
          the explanation for this?
        </p>
      </CivicStoryCard>
    );
  }
}

PortlandFarmersMarkets.displayName = "PortlandFarmersMarkets";
PortlandFarmersMarkets.propTypes = {
  init: PropTypes.func,
  selectFarmersMarket: PropTypes.func,
  isLoading: PropTypes.bool,
  portlandFarmersMarkets: PropTypes.shape({}),
  activeMarket: PropTypes.shape({})
};

export default connect(
  state => ({
    isLoading: isPortlandFarmersMarketsPending(state),
    portlandFarmersMarkets: getPortlandFarmersMarketsData(state),
    activeMarket: getActiveFarmersMarket(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchPortlandFarmersMarkets());
    },
    selectFarmersMarket(market) {
      dispatch(setFarmersMarket(market));
    }
  })
)(PortlandFarmersMarkets);
