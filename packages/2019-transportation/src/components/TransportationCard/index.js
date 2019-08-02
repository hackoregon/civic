import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";

import transportationCardMeta from "./transportationCardMeta";
import api from "../../state/before-after-delay-maps/api";

class TransportationCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={transportationCardMeta}
        isLoading={!isLoaded(data.disturbanceStops)}
        data={data}
        Layout={Layout}
      />
    );
  }
}

TransportationCard.displayName = "TransportationCard";

TransportationCard.propTypes = {
  init: PropTypes.func,
  data: resourceShape,
  Layout: PropTypes.node
};

export default connect(
  state => ({
    data: {
      disturbanceStops: api.selectors.getDisturbanceStops(
        state.transportation2019 || state
      )
    }
    // state.packageName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getDisturbanceStops());
    }
  })
)(TransportationCard);
