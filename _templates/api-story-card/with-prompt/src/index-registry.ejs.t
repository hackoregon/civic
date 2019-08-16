---
to: packages/<%=package%>/src/index.js
inject: true
after: \[
# Skip if the slug is found OR if the hygen:skip directive is found
skip_if: "(<%=slug%>|hygen:skip)"
---
  {
    slug: "<%=slug%>-card",
    component: <%=StoryCardName%>
  },