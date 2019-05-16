---
to: packages/<%=package%>/src/state/<%=h.changeCase.param(card)%>/actions.js
---
<%STORY_CARD_NAME = h.changeCase.constant(card)%>
<%StoryCardName = h.changeCase.pascal(card)%>
<%storyCardName = h.changeCase.camel(card)%>
import apiAdapter from "../api-adapter";
import actionEmitter from "../api-adapter-action-emitter";

export const API_START = "<%=STORY_CARD_NAME%>_OVER_TIME/START";
export const API_SUCCESS = "<%=STORY_CARD_NAME%>_OVER_TIME/SUCCESS";
export const API_ERROR = "<%=STORY_CARD_NAME%>_OVER_TIME/ERROR";

export const <%=storyCardName%>Start = actionEmitter(API_START);
export const <%=storyCardName%>Success = actionEmitter(API_SUCCESS);
export const <%=storyCardName%>Error = actionEmitter(API_ERROR);

const <%=STORY_CARD_NAME%>_API =
  "https://service.civicpdx.org/transportation-systems/passenger-census/system/annual/averages/?format=json";

export const fetch<%=StoryCardName%> = apiAdapter(<%=STORY_CARD_NAME%>_API, {
  start: <%=storyCardName%>Start,
  success: <%=storyCardName%>Success,
  error: <%=storyCardName%>Error
});
