---
to: packages/<%=package%>/src/components/<%=StoryCardName%>/index.js
---
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import <%=StoryCardName%>Meta from "./<%=storyCardName%>Meta";
import api from "../../state/<%=slug%>/api";

const <%=StoryCardName%> = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, [
    /*
    https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

    Add second argument to prevent useEffect running init() again
    */
  ]);

  // FIXME: mockRidershipOverTime should be a variable
  const loading = !isLoaded(data.mockRidershipOverTime);

  return (
    <CivicCard
      cardMeta={<%=StoryCardName%>Meta}
      isLoading={loading}
      data={data}
      Layout={Layout}
    />
  );
};

<%=StoryCardName%>.displayName = "<%=StoryCardName%>";

<%=StoryCardName%>.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ mockRidershipOverTime: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      // FIXME: mockRidershipOverTime should be a variable
      mockRidershipOverTime: api.selectors.getMockRidershipData(
        state.package<%= h.changeCase.pascalCase(package)%> || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      // FIXME: mockRidershipOverTime should be a variable
      dispatch(api.actionCreators.getMockRidershipData());
    }
  })
)(<%=StoryCardName%>);
