import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import templateCardMeta from "./TemplateCard";
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
    const { isLoading, data, children /* cardMeta */ } = this.props;

    return children({ isLoading, data, cardMeta: templateCardMeta });
  }
}

TemplateCard.displayName = "TemplateCard";

TemplateCard.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  // cardMeta: PropTypes.shape({/* document shape */}),
  children: PropTypes.node
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
