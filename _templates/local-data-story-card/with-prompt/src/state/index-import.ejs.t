---
to: packages/<%=package%>/src/state/index.js
inject: true
# This regex will inject this after the the last occurrence of a new line that begins with "import" (i.e. right after the other import statements)
after: \nimport(?![\s\S]*\nimport).*
skip_if: import <%=storyCardName%>Data from
---
import <%=storyCardName%>Data from "./<%=slug%>-data";