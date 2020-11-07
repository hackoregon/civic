---
to: packages/<%=package%>/src/index.js
inject: true
# Regex = // DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator src injection
after: //\s+DO\s+NOT\s+REMOVE\s+OR\s+MODIFY\s+THIS\s+COMMENT\s+\-\s+hygen\s+component\s+generator\s+src\s+injection
---
export { <%=component%> } from "./<%=component%>/<%=component%>"; // TODO: Move to correct location