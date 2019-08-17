---
to: packages/<%=package%>/src/index.js
inject: true
after: \[
skip_if: <%=slug%>
---
  {
    slug: "<%=slug%>",
    component: <%=StoryCardName%>
  },