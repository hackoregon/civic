---
to: packages/<%=package%>/src/components/App/index.js
inject: true
before: '</PageLayout>'
---
<%StoryCardName = h.changeCase.pascal(card)%>
<<%=StoryCardName%> />