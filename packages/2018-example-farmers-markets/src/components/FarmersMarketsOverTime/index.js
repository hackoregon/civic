import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import FarmersMarketsOverTimeMeta from "./farmersMarketsOverTimeMeta";
import { fetchFarmersMarketsOverTimeData } from "../../state/farmers-markets-over-time/actions";
import {
  isFarmersMarketsOverTimeDataPending,
  getFarmersMarketsOverTimeData
} from "../../state/farmers-markets-over-time/selectors";

class FarmersMarketsOverTime extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={FarmersMarketsOverTimeMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

FarmersMarketsOverTime.displayName = "FarmersMarketsOverTime";

FarmersMarketsOverTime.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    isLoading: isFarmersMarketsOverTimeDataPending(state),
    data: getFarmersMarketsOverTimeData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchFarmersMarketsOverTimeData());
    }
  })
)(FarmersMarketsOverTime);
