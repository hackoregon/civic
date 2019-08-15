---
to: packages/2018/src/App.js
inject: true
# Regex = // hygen import injection (do not remove or modify this line)
before: //\s+hygen\s+import\s+injection\s+\(do\s+not\s+remove\s+or\s+modify\s+this\s+line\)
---
import {
  Routes as <%=pascalTitle%><%=year%>Routes,
  Reducers as <%=pascalTitle%><%=year%>Reducers,
  App as <%=pascalTitle%><%=year%>App
} from "@hackoregon/<%=year%>-<%=packageTitle%>";
