import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import PortlandFarmersMarketsMeta from "./portlandFarmersMarketsMeta";
import { fetchPortlandFarmersMarketsData } from "../../state/portland-farmers-markets/actions";
import {
  isPortlandFarmersMarketsDataPending,
  getPortlandFarmersMarketsData
} from "../../state/portland-farmers-markets/selectors";

class PortlandFarmersMarkets extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={PortlandFarmersMarketsMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

PortlandFarmersMarkets.displayName = "PortlandFarmersMarkets";

PortlandFarmersMarkets.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    isLoading: isPortlandFarmersMarketsDataPending(state),
    data: getPortlandFarmersMarketsData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchPortlandFarmersMarketsData());
    }
  })
)(PortlandFarmersMarkets);
