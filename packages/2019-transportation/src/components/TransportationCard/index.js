import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import transportationCardMeta from "./transportationCardMeta";
import { fetchTransportationData } from "../../state/transportation-data/actions";
import {
  isTransportationDataPending,
  getTransportationData
} from "../../state/transportation-data/selectors";

class TransportationCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={transportationCardMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

TransportationCard.displayName = "TransportationCard";

TransportationCard.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.node
};

export default connect(
  state => ({
    isLoading: isTransportationDataPending(state),
    data: getTransportationData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchTransportationData());
    }
  })
)(TransportationCard);
