---
to: packages/<%=package%>/src/state/<%=slug%>-data/actions.js
---
import importAdapter from "../import-adapter";
import actionEmitter from "../import-adapter-action-emitter";

export const IMPORT_START = "<%=STORY_CARD_NAME%>_DATA/START";
export const IMPORT_SUCCESS = "<%=STORY_CARD_NAME%>_DATA/SUCCESS";

export const <%=StoryCardName%>DataStart = actionEmitter(IMPORT_START);
export const <%=StoryCardName%>DataSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import("../../assets/<%=slug%>-data.json");

export const fetch<%=StoryCardName%>Data = importAdapter(importPromise, {
  start: <%=StoryCardName%>DataStart,
  success: <%=StoryCardName%>DataSuccess
});
