---
to: packages/2018/card-registry.js
inject: true
# This regex will inject this BEFORE the the last occurrence ".concat" (since the last ".concat" needs a semicolon)
before: \.concat(?![\s\S]*\.concat)
# Skip if the story card is already imported OR if the hygen:skip directive is found
skip_if: "(concat(<%=pascalTitle%><%=year%>|hygen:skip)"
---
  .concat(<%=pascalTitle%><%=year%>.map(decorate("@hackoregon/<%=year%>-<%=kababTitle%>")));
