---
to: packages/<%=package%>/src/components/App/index.js
inject: true
# This regex will inject this after the the hackoregon import
after: \}\s+from\s+"@hackoregon/component\-library";
skip_if: import <%=StoryCardName%>
---
import <%=StoryCardName%> from '../<%=StoryCardName%>'