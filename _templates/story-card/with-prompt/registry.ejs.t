---
to: packages/<%=package%>/src/registry.js
inject: true
after: '\nexport default \['
---
<%StoryCardName = h.changeCase.pascal(card)%>
<%slug = h.changeCase.param(card)%>
  {
    slug: "<%=slug%>",
    component: <%=StoryCardName%>
  },