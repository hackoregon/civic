---
to: packages/<%=package%>/src/state/<%=h.changeCase.param(card)%>/selectors.js
---
<%StoryCardName = h.changeCase.pascal(card)%>
<%storyCardName = h.changeCase.camel(card)%>
import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const get<%=StoryCardName%> = createSelector(
  rootState,
  ({ storyCardName }) => storyCardName
);

export const get<%=StoryCardName%>Data = createSelector(
  get<%=StoryCardName%>,
  ({ data }) => data
);

export const is<%=StoryCardName%>Pending = createSelector(
  get<%=StoryCardName%>,
  ({ pending }) => !!pending
);

export const catch<%=StoryCardName%>Errors = createSelector(
  get<%=StoryCardName%>,
  ({ error }) => error || error
);

