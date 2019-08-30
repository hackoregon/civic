---
to: packages/<%=package%>/src/registry.js
inject: true
after: \[
# Skip if the slug is found OR if the hygen:skip directive is found
skip_if: "(<%=slug%>|hygen:skip)"
---
  {
    slug: "<%=slug%>",
    component: <%=StoryCardName%>
  },