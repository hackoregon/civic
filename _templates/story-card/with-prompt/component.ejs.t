---
to: packages/<%=package%>/src/components/<%=h.changeCase.pascal(card)%>/index.js
---
<%StoryCardName = h.changeCase.pascal(card)%>
<%storyCardName = h.changeCase.camel(card)%>
<%slug = h.changeCase.param(card)%>
<%title = h.changeCase.title(card)%>
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CivicStoryCard } from "@hackoregon/component-library";

import { fetch<%=StoryCardName%> } from "../../state/<%=slug%>/actions";
import {
  is<%=StoryCardName%>Pending,
  catch<%=StoryCardName%>Errors,
  get<%=StoryCardName%>Data
} from "../../state/<%=slug%>/selectors";

export class <%=StoryCardName%> extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { loading, error, <%=storyCardName%> } = this.props;

    return (
      <CivicStoryCard
        title="<%=title%>"
        slug="<%=slug%>"
        loading={loading}
        error={error}
      >
        <p>
          Story card
        </p>
        {<%=storyCardName%> && (
          <p>Data loaded!</p>
        )}
      </CivicStoryCard>
    );
  }
}
<%=StoryCardName%>.displayName = "<%=StoryCardName%>";
<%=StoryCardName%>.propTypes = {
  init: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  <%=storyCardName%>: PropTypes.arrayOf(PropTypes.shape({}))  
};

export default connect(
  state => ({
    loading: is<%=StoryCardName%>Pending(state),
    error: catch<%=StoryCardName%>Errors(state),
    <%=storyCardName%>: get<%=StoryCardName%>Data(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetch<%=StoryCardName%>());
    }
  })
)(<%=StoryCardName%>);
