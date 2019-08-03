import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import TemplateFileCardMeta from "./templateFileCardMeta";
import { fetchTemplateData } from "../../state/template-file-data/actions";
import {
  isTemplateDataPending,
  getTemplateData
} from "../../state/template-file-data/selectors";

class TemplateFileCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={TemplateFileCardMeta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

TemplateFileCard.displayName = "TemplateFileCard";

TemplateFileCard.propTypes = {
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
)(TemplateFileCard);
