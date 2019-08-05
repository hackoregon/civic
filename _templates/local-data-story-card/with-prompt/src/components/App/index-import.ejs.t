---
to: packages/<%=package%>/src/components/App/index.js
inject: true
after: \nimport(?![\s\S]*\nimport).*
skip_if: import <%=StoryCardName%>
---
import <%=StoryCardName%> from '../<%=StoryCardName%>'