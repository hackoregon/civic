---
to: packages/<%=package%>/src/state/index.js
inject: true
after: 'routing: routerReducer'
---
<%storyCardName = h.changeCase.camel(card)%>
<%=storyCardName%>,