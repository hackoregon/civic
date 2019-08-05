---
to: packages/<%=package%>/src/state/<%=slug%>-data/selectors.js
---
import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const get<%=StoryCardName%>Request = createSelector(
  rootState,
  ({ <%=storyCardName%>Data }) => <%=storyCardName%>Data
);

export const get<%=StoryCardName%>Data = createSelector(
  get<%=StoryCardName%>Request,
  ({ data }) => data && data.<%=StoryCardName%>Data
);

export const is<%=StoryCardName%>DataPending = createSelector(
  get<%=StoryCardName%>Request,
  ({ pending }) => !!pending
);
