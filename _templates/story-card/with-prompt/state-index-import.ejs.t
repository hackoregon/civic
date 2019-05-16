---
to: packages/<%=package%>/src/state/index.js
inject: true
after: 'import { routerReducer }'
---
<%storyCardName = h.changeCase.camel(card)%>
import <%=storyCardName%> from "./<%=slug%>";