import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import demoCardMeta from "./DemoCard";
import { fetchDemoData } from "../../state/demo-data/actions";
import {
  isDemoDataPending,
  getDemoData
} from "../../state/demo-data/selectors";

class DemoCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, children /* cardMeta */ } = this.props;

    return children({ isLoading, data, cardMeta: demoCardMeta });
  }
}

DemoCard.displayName = "DemoCard";

DemoCard.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  // cardMeta: PropTypes.shape({/* document shape */}),
  children: PropTypes.node
};

export default connect(
  state => ({
    isLoading: isDemoDataPending(state),
    data: getDemoData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchDemoData());
    }
  })
)(DemoCard);
