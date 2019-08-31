---
to: packages/<%=package%>/src/components/<%=StoryCardName%>/index.js
---
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import <%=storyCardName%>Meta from "./<%=storyCardName%>Meta";

const <%=StoryCardName%> = ({ Layout }) => (
  <CivicCard
    cardMeta={<%=storyCardName%>Meta}
    Layout={Layout}
  />
);

<%=StoryCardName%>.displayName = "<%=StoryCardName%>";

<%=StoryCardName%>.propTypes = {
  Layout: PropTypes.func
};

export default <%=StoryCardName%>
