---
to: packages/<%=package%>/src/registry.js
inject: true
before: '\nexport default \['
---
<%StoryCardName = h.changeCase.pascal(card)%>
import <%=StoryCardName%> from "./components/<%=StoryCardName%>";