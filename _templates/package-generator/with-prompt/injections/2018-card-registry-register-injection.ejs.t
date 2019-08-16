---
to: packages/2018/src/card-registry.js
inject: true
after: allEntries\s\=\s\[\]
# Skip if the package is already registered OR if the hygen:skip directive is found
skip_if: "(<%=pascalTitle%><%=year%>.map|hygen:skip)"
---
  .concat(<%=pascalTitle%><%=year%>.map(decorate("@hackoregon/<%=year%>-<%=packageTitle%>")))