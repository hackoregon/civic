---
to: packages/2018/src/App.js
inject: true
# Regex = // hygen route injection (do not remove or modify this line)
before: //\s+hygen\s+route\s+injection\s+\(do\s+not\s+remove\s+or\s+modify\s+this\s+line\)
---
        {
          path: "<%=packageTitle%>",
          component: <%=pascalTitle%><%=year%>App,
          childRoutes: <%=pascalTitle%><%=year%>Routes(store)
        },