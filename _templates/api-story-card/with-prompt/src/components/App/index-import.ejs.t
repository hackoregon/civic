---
to: packages/<%=package%>/src/components/App/index.js
inject: true
# This regex will inject this after the the last occurrence of a new line that begins with "import" (i.e. right after the other import statements)
after: \nimport(?![\s\S]*\nimport).*
skip_if: import <%=StoryCardName%>
---
import <%=StoryCardName%> from '../<%=StoryCardName%>'