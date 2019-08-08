---
to: packages/<%=package%>/src/components/<%=StoryCardName%>/index.js
---
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import <%=StoryCardName%>Meta from "./<%=storyCardName%>Meta";
import { fetch<%=StoryCardName%>Data } from "../../state/<%=slug%>/actions";
import {
  is<%=StoryCardName%>DataPending,
  get<%=StoryCardName%>Data
} from "../../state/<%=slug%>/selectors";

class <%=StoryCardName%> extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, data, Layout } = this.props;

    return (
      <CivicCard
        cardMeta={<%=StoryCardName%>Meta}
        isLoading={isLoading}
        data={data}
        Layout={Layout}
      />
    );
  }
}

<%=StoryCardName%>.displayName = "<%=StoryCardName%>";

<%=StoryCardName%>.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  Layout: PropTypes.node
};

export default connect(
  state => ({
    isLoading: is<%=StoryCardName%>DataPending(state),
    data: get<%=StoryCardName%>Data(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetch<%=StoryCardName%>Data());
    }
  })
)(<%=StoryCardName%>);
