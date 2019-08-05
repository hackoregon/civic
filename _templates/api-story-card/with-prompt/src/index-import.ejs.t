---
to: packages/<%=package%>/src/index.js
inject: true
after: \nimport(?![\s\S]*\nimport).*
skip_if: import <%=StoryCardName%> from
---
import <%=StoryCardName%> from './components/<%=StoryCardName%>'