import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import FarmersMarketsOverTimeNewMeta from "./farmersMarketsOverTimeNewMeta";
import { fetchFarmersMarketsOverTimeNewData } from "../../state/farmers-markets-over-time-new/actions";
import {
  isFarmersMarketsOverTimeNewDataPending,
  getFarmersMarketsOverTimeNewData
} from "../../state/farmers-markets-over-time-new/selectors";

class FarmersMarketsOverTimeNew extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={FarmersMarketsOverTimeNewMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

FarmersMarketsOverTimeNew.displayName = "FarmersMarketsOverTimeNew";

FarmersMarketsOverTimeNew.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    isLoading: isFarmersMarketsOverTimeNewDataPending(state),
    data: getFarmersMarketsOverTimeNewData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchFarmersMarketsOverTimeNewData());
    }
  })
)(FarmersMarketsOverTimeNew);
