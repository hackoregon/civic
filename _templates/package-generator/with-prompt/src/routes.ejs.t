---
to: packages/<%=year%>-<%=packageTitle%>/src/routes.js
---
import App from "./components/App";

const routes = () => [
  {
    path: "<%=year%>-<%=packageTitle%>",
    name: "<%=year%>-<%=packageTitle%>",
    component: App
  }
];

export default routes;
