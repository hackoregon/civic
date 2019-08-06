import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import educationCardMeta from "./educationCardMeta";
import { fetchEducationData } from "../../state/education-data/actions";
import {
  isEducationDataPending,
  getEducationData
} from "../../state/education-data/selectors";

class EducationCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={educationCardMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

EducationCard.displayName = "EducationCard";

EducationCard.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.node
};

export default connect(
  state => ({
    isLoading: isEducationDataPending(state),
    data: getEducationData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchEducationData());
    }
  })
)(EducationCard);
