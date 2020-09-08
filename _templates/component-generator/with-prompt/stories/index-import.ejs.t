---
to: packages/<%=package%>/stories/index.story.js
inject: true
# Regex = // DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
after: //\s+DO\s+NOT\s+REMOVE\s+OR\s+MODIFY\s+THIS\s+COMMENT\s+\-\s+hygen\s+component\s+generator\s+import\s+injection
---
import <%=camelComponent%>Story from "./<%=component%>.story"; // TODO: Move this to the appropriate location