---
to: packages/<%=package%>/src/state/index.js
inject: true
after: \nimport(?![\s\S]*\nimport).*
skip_if: import <%=storyCardName%>Data from
---
import <%=storyCardName%>Data from "./<%=slug%>-data";