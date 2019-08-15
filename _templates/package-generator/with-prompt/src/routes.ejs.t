---
to: packages/<%=package%>/src/routes.js
---
import App from "./components/App";

const routes = () => [
  {
    path: "<%=package%>",
    name: "<%=package%>",
    component: App
  }
];

export default routes;
