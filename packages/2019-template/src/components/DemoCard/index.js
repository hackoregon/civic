import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import demoCardMeta from "./demoCardMeta";
import { fetchDemoData } from "../../state/demo-data/actions";
import {
  isDemoDataPending,
  getDemoData,
  getMidGentrificationRidershipData,
  getLateGentrificationRidershipData
} from "../../state/demo-data/selectors";

class DemoCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={demoCardMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

DemoCard.displayName = "DemoCard";

DemoCard.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.node
};

export default connect(
  state => ({
    isLoading: isDemoDataPending(state),
    data: {
      demoData: getDemoData(state),
      midData: getMidGentrificationRidershipData(state),
      lateData: getLateGentrificationRidershipData(state)
    }
  }),
  dispatch => ({
    init() {
      dispatch(fetchDemoData());
    }
  })
)(DemoCard);
