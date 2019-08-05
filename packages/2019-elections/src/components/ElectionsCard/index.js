import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import electionsCardMeta from "./electionsCardMeta";
import { fetchElectionsData } from "../../state/elections-data/actions";
import {
  isElectionsDataPending,
  getElectionsData
} from "../../state/elections-data/selectors";

class ElectionsCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={electionsCardMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

ElectionsCard.displayName = "ElectionsCard";

ElectionsCard.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.node
};

export default connect(
  state => ({
    isLoading: isElectionsDataPending(state),
    data: getElectionsData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchElectionsData());
    }
  })
)(ElectionsCard);
