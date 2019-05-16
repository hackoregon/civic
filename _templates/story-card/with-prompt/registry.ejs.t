---
to: packages/<%=package%>/src/registry.js
inject: true
after: 'export default \['
---
  {
    slug: "<%=slug%>",
    component: <%=StoryCardName%>
  },