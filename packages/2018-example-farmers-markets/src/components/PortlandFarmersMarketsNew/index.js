import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import PortlandFarmersMarketsNewMeta from "./portlandFarmersMarketsNewMeta";
import { fetchPortlandFarmersMarketsNewData } from "../../state/portland-farmers-markets-new/actions";
import {
  isPortlandFarmersMarketsNewDataPending,
  getPortlandFarmersMarketsNewData
} from "../../state/portland-farmers-markets-new/selectors";

class PortlandFarmersMarketsNew extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={PortlandFarmersMarketsNewMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

PortlandFarmersMarketsNew.displayName = "PortlandFarmersMarketsNew";

PortlandFarmersMarketsNew.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    isLoading: isPortlandFarmersMarketsNewDataPending(state),
    data: getPortlandFarmersMarketsNewData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchPortlandFarmersMarketsNewData());
    }
  })
)(PortlandFarmersMarketsNew);
