import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import templateCardMeta from "./templateCardMeta";
import { fetchTemplateData } from "../../state/template-data/actions";
import {
  isTemplateDataPending,
  getTemplateData
} from "../../state/template-data/selectors";

class TemplateCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={templateCardMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

TemplateCard.displayName = "TemplateCard";

TemplateCard.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.node
};

export default connect(
  state => ({
    isLoading: isTemplateDataPending(state),
    data: getTemplateData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchTemplateData());
    }
  })
)(TemplateCard);
