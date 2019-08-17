---
to: packages/2018/src/App.js
inject: true
# Regex = // hygen store injection (do not remove or modify this line)
before: //\s+hygen\s+store\s+injection\s+\(do\s+not\s+remove\s+or\s+modify\s+this\s+line\)
---
      package<%=year%><%=pascalTitle%>: <%=pascalTitle%><%=year%>Reducers(),