---
to: packages/<%=package%>/src/components/App/index.js
inject: true
before: '\nconst App'
---
<%StoryCardName = h.changeCase.pascal(card)%>
import <%=StoryCardName%> from "../<%=StoryCardName%>";